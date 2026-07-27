import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop — resets the window scroll position to the top on every route change.
 * Must be rendered inside <BrowserRouter>.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Small timeout to let layout paint first, then snap to top
    const id = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, 0)
    return () => clearTimeout(id)
  }, [pathname])

  return null
}

export default ScrollToTop
