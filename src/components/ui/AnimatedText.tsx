import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  splitBy?: 'word' | 'char';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className, once = true, delay = 0, splitBy = 'word' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  // Split text into words or characters
  const elements = splitBy === 'word' ? text.split(" ") : text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: splitBy === 'word' ? 0.1 : 0.04, 
        delayChildren: delay * i 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      z: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 90,
      },
    },
    hidden: {
      opacity: 0,
      y: 50,
      z: -100,
      rotateX: -80,
      rotateY: 15,
      scale: 0.8,
      filter: "blur(12px)",
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 90,
      },
    },
  };

  return (
    <motion.div
      style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "center", 
        perspective: "1200px" 
      }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
      className={cn(splitBy === 'word' ? "gap-x-3 gap-y-1" : "gap-x-[1px]", className)}
    >
      {elements.map((el, index) => (
        <motion.span 
          variants={child} 
          key={index} 
          className="inline-block origin-bottom"
          style={{ 
             transformStyle: "preserve-3d",
             whiteSpace: el === " " ? "pre" : "normal"
          }}
        >
          {el}
        </motion.span>
      ))}
    </motion.div>
  );
};
