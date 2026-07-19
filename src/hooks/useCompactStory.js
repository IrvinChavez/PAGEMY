import { useEffect, useState } from 'react'

// Decide si la sección debe renderizarse en modo "pineado cinematográfico"
// o en modo compacto (stack normal, sin scroll-linked transforms).
// Compacto en: mobile/tablet (el pin + 100vh se rompe con la barra de
// direcciones y el momentum scroll) y en prefers-reduced-motion.
export function useCompactStory() {
  const [compact, setCompact] = useState(true)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const smallViewport = window.matchMedia('(max-width: 1023px)')

    const update = () => setCompact(reduceMotion.matches || smallViewport.matches)
    update()

    reduceMotion.addEventListener('change', update)
    smallViewport.addEventListener('change', update)
    return () => {
      reduceMotion.removeEventListener('change', update)
      smallViewport.removeEventListener('change', update)
    }
  }, [])

  return compact
}
