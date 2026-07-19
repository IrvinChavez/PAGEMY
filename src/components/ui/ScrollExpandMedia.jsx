import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useCompactStory } from '../../hooks/useCompactStory'

function Media({ mediaType, mediaSrc, posterSrc, title, className }) {
  if (mediaType === 'video') {
    return (
      <video
        src={mediaSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={className}
      />
    )
  }
  return <img src={mediaSrc} alt={title || 'Media'} className={className} />
}

// Modo compacto: mobile y prefers-reduced-motion. Mismo contenido, sin pin
// ni transforms ligados a scroll — igual que el resto de secciones del sitio.
function CompactExpandMedia({ mediaType, mediaSrc, posterSrc, bgImageSrc, title, eyebrow, children }) {
  const firstWord = title ? title.split(' ')[0] : ''
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : ''

  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0">
        <img src={bgImageSrc} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#050816]/70" />
      </div>
      <div className="relative max-w-lg mx-auto text-center">
        {eyebrow && (
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#00D4FF] mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-black tracking-tight text-white mb-8">
          {firstWord} <span className="gradient-text">{restOfTitle}</span>
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)] mb-10">
          <Media mediaType={mediaType} mediaSrc={mediaSrc} posterSrc={posterSrc} title={title} className="w-full h-auto object-cover" />
        </div>
      </div>
      {children}
    </section>
  )
}

// Modo cinematográfico: desktop, sin prefers-reduced-motion. El medio crece
// conforme el usuario avanza el scroll real de la página (position: sticky +
// useScroll), sin secuestrar el scroll ni bloquear teclado/lectores de
// pantalla — a diferencia del patrón original de wheel/touch + preventDefault.
//
// Se monta como componente aparte (no condicionalmente dentro del mismo
// componente que decide compact/cinemático) a propósito: useCompactStory()
// arranca en `compact=true` por defecto hasta que su efecto resuelve el
// media query real, así que si useScroll(containerRef) se llama antes de
// que ese efecto corra, containerRef.current todavía es null en el primer
// render — y Framer Motion cae a trackear el scroll de todo el documento
// en vez del contenedor local. Montar este componente solo cuando ya se
// sabe compact===false evita esa carrera.
function CinematicExpandMedia({
  mediaType,
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  eyebrow,
  scrollToExpand,
  textBlend,
  children,
}) {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const mediaWidth = useTransform(scrollYProgress, [0, 1], [300, isMobile ? 620 : 1400])
  const mediaHeight = useTransform(scrollYProgress, [0, 1], [400, isMobile ? 560 : 760])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.15])
  const textShiftLeft = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -70 : -140])
  const textShiftRight = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 70 : 140])
  const contentOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.82, 1], [24, 0])

  const firstWord = title ? title.split(' ')[0] : ''
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : ''

  return (
    <>
      <div ref={containerRef} className="relative" style={{ height: '230vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
          <motion.div className="absolute inset-0" style={{ opacity: bgOpacity }}>
            <img src={bgImageSrc} alt="" className="w-full h-full object-cover" />
            <motion.div className="absolute inset-0 bg-[#050816]" style={{ opacity: overlayOpacity }} />
          </motion.div>

          <motion.div
            className="relative z-10 rounded-2xl overflow-hidden"
            style={{
              width: mediaWidth,
              height: mediaHeight,
              maxWidth: '95vw',
              maxHeight: '78vh',
              boxShadow: '0 0 60px rgba(0,0,0,0.45)',
            }}
          >
            <Media mediaType={mediaType} mediaSrc={mediaSrc} posterSrc={posterSrc} title={title} className="w-full h-full object-cover" />
          </motion.div>

          <div
            className={`relative z-10 flex flex-col items-center text-center gap-2 mt-8 ${textBlend ? 'mix-blend-difference' : ''}`}
          >
            {eyebrow && (
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#00D4FF]">
                {eyebrow}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.h2 style={{ x: textShiftLeft }} className="text-4xl md:text-6xl font-black tracking-tight text-white">
                {firstWord}
              </motion.h2>
              <motion.h2 style={{ x: textShiftRight }} className="text-4xl md:text-6xl font-black tracking-tight gradient-text">
                {restOfTitle}
              </motion.h2>
            </div>
            {scrollToExpand && (
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-4">{scrollToExpand}</p>
            )}
          </div>
        </div>
      </div>

      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-10">
        {children}
      </motion.div>
    </>
  )
}

export default function ScrollExpandMedia(props) {
  const compact = useCompactStory()
  const Component = compact ? CompactExpandMedia : CinematicExpandMedia
  return <Component {...props} />
}
