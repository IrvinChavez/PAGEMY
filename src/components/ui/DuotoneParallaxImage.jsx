import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useCompactStory } from '../../hooks/useCompactStory'

// Imagen reutilizable con tratamiento duotono (navy + blue→purple, el mismo
// trío de color del sitio) para que cualquier foto de stock se sienta parte
// del mismo sistema visual en vez de "pegada" encima. Ligera a propósito:
// sin position:sticky ni contenedor de scroll gigante — un parallax simple
// ligado a scroll + un tilt al mouse, seguro dentro de secciones con
// overflow-hidden (a diferencia de sticky, un transform normal no rompe con
// ancestros overflow-hidden).
export default function DuotoneParallaxImage({
  src,
  alt = '',
  className = '',
  rounded = 'rounded-3xl',
  variant = 'card', // 'card' — foto interactiva en primer plano | 'background' — capa atmosférica de fondo
  imageOpacity, // opcional: fuerza la opacidad final de la foto (útil en 'background')
}) {
  const reduceInteraction = useCompactStory() // cubre mobile (sin mouse) y prefers-reduced-motion
  const isBackground = variant === 'background'
  const containerRef = useRef(null)
  const sheenRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const parallaxRange = reduceInteraction ? [0, 0] : isBackground ? [-16, 16] : [-28, 28]
  const parallaxY = useTransform(scrollYProgress, [0, 1], parallaxRange)

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 15 })
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 15 })

  function handleMouseMove(e) {
    if (reduceInteraction || isBackground) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rawRotateY.set((px - 0.5) * 10)
    rawRotateX.set(-(py - 0.5) * 10)
    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.16), transparent 55%)`
    }
  }

  function handleMouseLeave() {
    rawRotateX.set(0)
    rawRotateY.set(0)
    if (sheenRef.current) sheenRef.current.style.background = 'transparent'
  }

  const defaultImageOpacity = isBackground ? 0.4 : 1

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={isBackground ? false : { opacity: 0, y: 32, scale: 0.96 }}
      whileInView={isBackground ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={isBackground ? undefined : { once: true }}
      transition={isBackground ? undefined : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: isBackground ? undefined : 1000, opacity: isBackground ? 1 : undefined }}
      className={`relative ${rounded} overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y: parallaxY, rotateX: isBackground ? 0 : rotateX, rotateY: isBackground ? 0 : rotateY, top: -32, bottom: -32, left: -8, right: -8 }}
        className="absolute"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover grayscale contrast-125 brightness-90"
          style={{ opacity: imageOpacity ?? defaultImageOpacity }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #00D4FF 0%, #A855F7 100%)',
            mixBlendMode: 'color',
            opacity: isBackground ? 0.8 : 0.6,
          }}
        />
        <div className="absolute inset-0 bg-[#050816]" style={{ mixBlendMode: 'multiply', opacity: isBackground ? 0.4 : 0.35 }} />
        {!isBackground && (
          <div ref={sheenRef} className="absolute inset-0 transition-[background] duration-300" />
        )}
      </motion.div>
      {!isBackground && (
        <div className="absolute inset-0 ring-1 ring-white/10 rounded-[inherit] pointer-events-none" />
      )}
    </motion.div>
  )
}
