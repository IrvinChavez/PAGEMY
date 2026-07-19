import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ExternalLink } from 'lucide-react'

// ── CAMBIO 6: ParticleCanvas optimizado para móvil ───────────────────────────
// Desktop → hasta 90 partículas, CONNECT_DIST 130
// Mobile  → máx 22 partículas, CONNECT_DIST 70, sin repulsión de ratón
function ParticleCanvas() {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const mouseRef  = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    // Detectar móvil una sola vez al montar
    const isMobile = window.innerWidth < 768

    const onResize = () => resize()
    const onMouse  = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }

    window.addEventListener('resize', onResize, { passive: true })
    // El evento mousemove solo es útil en desktop
    if (!isMobile) window.addEventListener('mousemove', onMouse, { passive: true })

    // Cantidad de partículas según dispositivo
    const rawCount  = Math.floor((canvas.width * canvas.height) / (isMobile ? 15000 : 11000))
    const count     = Math.min(rawCount, isMobile ? 22 : 90)

    // Distancias reducidas en móvil → menos líneas → menos cómputo O(n²)
    const CONNECT_DIST = isMobile ? 70  : 130
    const REPEL_DIST   = isMobile ? 0   : 110   // 0 = repulsión deshabilitada

    const particles = Array.from({ length: count }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.6 + 0.4,
      a:  Math.random() * 0.45 + 0.15,
    }))

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Repulsión del cursor (solo desktop, REPEL_DIST > 0)
        if (REPEL_DIST > 0) {
          const dx   = p.x - mx
          const dy   = p.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_DIST && dist > 0) {
            const f = ((REPEL_DIST - dist) / REPEL_DIST) * 0.7
            p.vx += (dx / dist) * f
            p.vy += (dy / dist) * f
          }
        }

        p.vx *= 0.985
        p.vy *= 0.985
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 1.8) { p.vx = (p.vx / spd) * 1.8; p.vy = (p.vy / spd) * 1.8 }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0)             p.x = canvas.width
        if (p.x > canvas.width)  p.x = 0
        if (p.y < 0)             p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${p.a})`
        ctx.fill()

        // Conexiones entre partículas cercanas
        for (let j = i + 1; j < particles.length; j++) {
          const q   = particles[j]
          const cdx = p.x - q.x
          const cdy = p.y - q.y
          const cd  = Math.sqrt(cdx * cdx + cdy * cdy)
          if (cd < CONNECT_DIST) {
            const alpha = (1 - cd / CONNECT_DIST) * 0.22
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(0,212,255,${alpha})`
            ctx.lineWidth   = 0.6
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      if (!isMobile) window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  )
}

// ── Animaciones ───────────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816]">
      <ParticleCanvas />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb-1 absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 65%)' }}
        />
        <div
          className="orb-2 absolute -bottom-60 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 65%)' }}
        />
        <div
          className="orb-3 absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)' }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 25%, #050816 100%)' }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase
            bg-[#00D4FF]/10 border border-[#00D4FF]/25 text-[#00D4FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            Disponible para proyectos
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.92] tracking-tight mb-6"
        >
          Transformando ideas
          <br />
          en{' '}
          <span className="gradient-text">software inteligente.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed mb-10"
        >
          Construyo sitios web modernos, soluciones con IA, sistemas de automatización y
          productos digitales que hacen crecer a los negocios.
        </motion.p>

        <motion.div variants={fadeUp} className="mb-12">
          <p className="text-xl sm:text-2xl font-bold text-white mb-1">Irvin Chavez</p>
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-slate-500">
            Desarrollador de Software &nbsp;·&nbsp; Constructor de IA &nbsp;·&nbsp; Freelancer
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-9 py-4 text-[15px] font-semibold text-[#050816] bg-[#00D4FF] rounded-full
              hover:shadow-[0_0_50px_rgba(0,212,255,0.55)] hover:scale-[1.04] transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Contratarme</span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2.5 px-9 py-4 text-[15px] font-semibold text-white rounded-full
              border border-white/15 hover:border-[#00D4FF]/40 hover:bg-white/[0.04] transition-all duration-300"
          >
            Ver proyectos
            <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
