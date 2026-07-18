import React, { useEffect, useRef, useState } from 'react'

export const LiquidBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const listener = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) {
      console.warn('WebGL not supported')
      return
    }

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i  = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x + 0.5);
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = v_texCoord;
        
        // Brand colors converted to vec3
        vec3 royalBlue = vec3(0.0, 0.137, 0.435); // #00236f
        vec3 lightBlue = vec3(0.0, 0.345, 0.745); // #0058be
        vec3 accentRed = vec3(0.361, 0.0, 0.051);  // #5c000d (accent red)
        vec3 bgWhite = vec3(0.969, 0.976, 0.984);   // #f7f9fb

        // Liquid motion logic
        float n1 = snoise(uv * 2.0 + u_time * 0.06);
        float n2 = snoise(uv * 3.0 - u_time * 0.09);
        
        vec3 color = mix(bgWhite, lightBlue, n1 * 0.15 + 0.15);
        color = mix(color, royalBlue, n2 * 0.1 + 0.1);
        
        // Soft red accent blob
        float dist = distance(uv, vec2(0.8, 0.2) + 0.1 * vec2(sin(u_time * 0.3), cos(u_time * 0.24)));
        float blob = smoothstep(0.4, 0.0, dist);
        color = mix(color, accentRed, blob * 0.06);

        gl_FragColor = vec4(color, 1.0);
      }
    `

    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    )

    const positionLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const uTimeLoc = gl.getUniformLocation(program, 'u_time')
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution')
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse')

    let animationFrameId: number
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width
        const ny = 1.0 - (event.clientY - rect.top) / rect.height
        mouse.x = nx * canvas.width
        mouse.y = ny * canvas.height
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width || canvas.clientWidth || 1280
        const h = entry.contentRect.height || canvas.clientHeight || 720
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
          gl.viewport(0, 0, w, h)
        }
      }
    })
    resizeObserver.observe(canvas)

    // Initial resize sync
    const initialW = canvas.clientWidth || 1280
    const initialH = canvas.clientHeight || 720
    canvas.width = initialW
    canvas.height = initialH
    gl.viewport(0, 0, initialW, initialH)

    const render = (time: number) => {
      if (uTimeLoc) {
        gl.uniform1f(uTimeLoc, reducedMotion ? 0.0 : time * 0.001)
      }
      if (uResolutionLoc) {
        gl.uniform2f(uResolutionLoc, canvas.width, canvas.height)
      }
      if (uMouseLoc) {
        gl.uniform2f(uMouseLoc, mouse.x, mouse.y)
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    // Start render
    render(0)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      resizeObserver.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(buffer)
    }
  }, [reducedMotion])

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Canvas layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full block z-0"
        style={{ pointerEvents: 'none' }}
      />
      {/* Content layer */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  )
}
