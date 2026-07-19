import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion'
import { Clock, ExternalLink, Github } from 'lucide-react'
import { useCompactStory } from '../../hooks/useCompactStory'

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const EASE = [0.22, 1, 0.36, 1]

// ── Corredor auto-scroll que recrea la página real de Vagos Clothes ───────────
// iframe no es posible (X-Frame-Options: DENY en su netlify.toml),
// por lo que recreamos el diseño como JSX y lo animamos con CSS scroll infinito.
const PRODUCTS = [
  { name: 'Oversized Tee', price: '$349' },
  { name: 'Cargo Pants',   price: '$590' },
  { name: 'Hoodie',        price: '$720' },
  { name: 'Shorts',        price: '$280' },
  { name: 'Bucket Hat',    price: '$180' },
  { name: 'Wide Leg',      price: '$650' },
]

const STACK = [
  { label: 'HTML',       color: '#E34F26' },
  { label: 'CSS',        color: '#1572B6' },
  { label: 'JavaScript', color: '#F7DF1E' },
  { label: 'Supabase',   color: '#3ECF8E' },
  { label: 'Netlify',    color: '#00C7B7' },
]

function VagosPageSlice() {
  return (
    <div style={{ userSelect: 'none', pointerEvents: 'none', background: '#080808' }}>

      {/* ── Navbar ── */}
      <div style={{
        background: '#080808',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '9px 14px',
        gap: 8,
      }}>
        <span style={{ fontSize: 9, fontWeight: 900, color: '#fff', letterSpacing: '0.06em', whiteSpace: 'nowrap', flexShrink: 0 }}>
          VAGOS <span style={{ color: '#CC0000' }}>·</span> CLOTHES
        </span>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {['INICIO','TIENDA','ENTREGAS','CONTACTO'].map(l => (
            <span key={l} style={{ fontSize: 6, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{l}</span>
          ))}
        </div>
        <span style={{
          fontSize: 6, fontWeight: 700, color: '#CC0000',
          border: '1px solid #CC0000', padding: '2px 6px', borderRadius: 2,
          letterSpacing: '0.05em', whiteSpace: 'nowrap', flexShrink: 0,
        }}>UNIRSE – 15% OFF</span>
      </div>

      {/* ── Hero (split: negro izquierda / crimson derecha) ── */}
      <div style={{ display: 'flex', minHeight: 200 }}>
        {/* Lado izquierdo */}
        <div style={{
          flex: '0 0 56%', background: '#080808', overflow: 'hidden',
          padding: '16px 14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {/* Location label — separado del navbar con padding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
            <div style={{ width: 14, height: 1, background: '#CC0000', flexShrink: 0 }} />
            <span style={{ fontSize: 5, color: '#CC0000', fontWeight: 700, letterSpacing: '0.2em', whiteSpace: 'nowrap' }}>CHIHUAHUA, MEXICO</span>
          </div>

          {/* Hero text — 34px para que "REGLAS" no desborde */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
              <span style={{ fontSize: 34, fontWeight: 900, color: '#fff', letterSpacing: '-0.01em', display: 'block', lineHeight: 1 }}>SIN</span>
              <div style={{
                position: 'absolute', top: '52%', left: 0, width: '65%', height: 2.5,
                background: 'rgba(0,220,255,0.6)', borderRadius: 1,
              }} />
            </div>
            <span style={{ fontSize: 34, fontWeight: 900, color: '#fff', letterSpacing: '-0.01em', display: 'block', lineHeight: 1 }}>REGLAS</span>
            <span style={{ fontSize: 34, fontWeight: 900, color: '#CC0000', letterSpacing: '-0.01em', display: 'block', lineHeight: 1 }}>SIN</span>
            <span style={{
              fontSize: 34, fontWeight: 900, color: 'transparent', letterSpacing: '-0.01em', display: 'block', lineHeight: 1,
              WebkitTextStroke: '1.5px #fff',
            }}>LÍMITES</span>
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: 6.5, color: 'rgba(255,255,255,0.38)', lineHeight: 1.55,
            borderLeft: '2px solid rgba(255,255,255,0.12)', paddingLeft: 7,
            maxWidth: 170, marginBottom: 10,
          }}>
            No somos una marca. Somos una actitud.<br />
            Ropa streetwear para los que no le piden permiso a nadie.
          </p>

          {/* Botones */}
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 6.5, fontWeight: 700, color: '#fff',
              background: '#CC0000', padding: '4px 10px', borderRadius: 2, letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
            }}>Comprar ahora</span>
            <span style={{
              fontSize: 6.5, fontWeight: 700, color: '#fff',
              border: '1px solid rgba(62,207,142,0.5)', padding: '4px 10px', borderRadius: 2,
              letterSpacing: '0.03em', whiteSpace: 'nowrap',
            }}>❤ Regístrate – 15% OFF</span>
          </div>
        </div>

        {/* Lado derecho: degradado crimson */}
        <div style={{
          flex: 1,
          background: 'radial-gradient(ellipse at 40% 40%, #3d0000 0%, #1c0000 45%, #0a0000 100%)',
        }} />
      </div>

      {/* ── Tienda (grid de productos) ── */}
      <div style={{ background: '#0d0d0d', padding: '14px 14px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em', fontWeight: 700, marginBottom: 10 }}>
          — TIENDA —
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {PRODUCTS.map(p => (
            <div key={p.name} style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 4, padding: '12px 8px 7px',
              aspectRatio: '1',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
              <div style={{ fontSize: 7.5, color: '#CC0000', fontWeight: 700 }}>{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Separador limpio entre iteraciones del loop */}
      <div style={{ background: '#080808', borderTop: '1px solid rgba(204,0,0,0.12)', height: 20 }} />
    </div>
  )
}

function VagosScrollDemo() {
  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      border: '1px solid rgba(204,0,0,0.25)',
      boxShadow: '0 0 30px rgba(204,0,0,0.08), 0 8px 32px rgba(0,0,0,0.5)',
      background: '#090D13',
    }}>
      {/* Browser chrome */}
      <div style={{
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 12px',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41', display: 'inline-block' }} />
        <div style={{
          flex: 1, marginLeft: 8,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 4, padding: '2px 8px',
          fontSize: 9, color: '#4b5563', fontFamily: 'monospace',
        }}>
          vagosclothes.netlify.app
        </div>
        <span style={{ fontSize: 8, color: '#CC0000', fontWeight: 700, border: '1px solid rgba(204,0,0,0.3)', padding: '1px 6px', borderRadius: 10 }}>
          LIVE
        </span>
      </div>

      {/* Ventana de scroll */}
      <div style={{ height: 300, overflow: 'hidden', position: 'relative' }}>
        <div className="vagos-scroll-track">
          <VagosPageSlice />
          <VagosPageSlice />
        </div>

        {/* Fade top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 24,
          background: 'linear-gradient(to bottom, #090D13, transparent)',
          pointerEvents: 'none', zIndex: 2,
        }} />
        {/* Fade bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 50,
          background: 'linear-gradient(to bottom, transparent, #090D13)',
          pointerEvents: 'none', zIndex: 2,
        }} />
      </div>
    </div>
  )
}

// ── CTAs compartidos por ambos modos (cinematográfico y compacto) ─────────────
function ProjectCTAs() {
  return (
    <div className="flex gap-3">
      <a
        href="https://vagosclothes.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full
          text-[#050816] bg-[#3ECF8E] hover:shadow-[0_0_24px_rgba(62,207,142,0.45)]
          hover:scale-105 transition-all duration-300
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E]
          focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
      >
        <ExternalLink size={14} />
        Ver sitio
      </a>
      <a
        href="https://github.com/IrvinChavez"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full
          border border-white/15 text-slate-300 hover:text-white hover:border-white/30
          hover:bg-white/[0.04] transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
          focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
      >
        <Github size={14} />
        GitHub
      </a>
    </div>
  )
}

function StackPills({ className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {STACK.map(({ label, color }) => (
        <span
          key={label}
          className="text-[10px] font-semibold px-3 py-1 rounded-full"
          style={{ background: `${color}14`, color, border: `1px solid ${color}30` }}
        >
          {label}
        </span>
      ))}
    </div>
  )
}

// ── Modo compacto: mobile y prefers-reduced-motion ─────────────────────────────
// Mismo contenido y mismo orden narrativo que la versión cinematográfica, pero
// como un stack normal con whileInView — sin pin ni scroll-linked transforms.
function CompactStory() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#00D4FF] mb-3">
          Caso de estudio
        </p>
        <h3 className="text-2xl font-black text-white tracking-tight">Vagos Clothes</h3>
        <p className="text-slate-500 text-xs font-medium tracking-wide mt-1">E-commerce · Moda Urbana</p>
      </motion.div>

      <motion.div
        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="grid grid-cols-2 gap-2.5"
      >
        <div className="rounded-lg px-3 py-2.5" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
          <p className="text-[9px] text-red-400/60 uppercase tracking-wider mb-1 font-semibold">Problema</p>
          <p className="text-[11px] text-slate-300 font-medium leading-tight">Tienda sin presencia digital</p>
        </div>
        <div className="rounded-lg px-3 py-2.5" style={{ background: 'rgba(62,207,142,0.06)', border: '1px solid rgba(62,207,142,0.12)' }}>
          <p className="text-[9px] text-[#3ECF8E]/60 uppercase tracking-wider mb-1 font-semibold">Solución</p>
          <p className="text-[11px] text-slate-300 font-medium leading-tight">E-commerce con catálogo online</p>
        </div>
      </motion.div>

      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <VagosScrollDemo />
      </motion.div>

      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <StackPills className="mb-2" />
      </motion.div>

      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <ProjectCTAs />
      </motion.div>

      <motion.div
        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="rounded-3xl p-7 flex flex-col items-center text-center"
        style={{ background: '#0F1729', border: '1px dashed rgba(255,255,255,0.1)' }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.12)' }}
        >
          <Clock size={24} className="text-[#00D4FF] opacity-60" />
        </div>
        <h3 className="text-xl font-bold text-white/50 mb-2 tracking-tight">Próximo capítulo</h3>
        <p className="text-slate-600 text-[13px] leading-relaxed max-w-[260px] mb-6">
          Algo nuevo está siendo construido. Si tienes una idea en mente, hablemos.
        </p>
        <button
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-[12px] font-semibold text-[#00D4FF]/50 hover:text-[#00D4FF]
            border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 px-4 py-2 rounded-full
            transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]/60
            focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
        >
          Contáctame →
        </button>
      </motion.div>
    </div>
  )
}

// ── Modo cinematográfico: desktop, sin prefers-reduced-motion ─────────────────
const CHAPTER_BOUNDS = [0, 0.15, 0.30, 0.45, 0.75, 1] // 5 capítulos
const CHAPTER_LABELS = ['Intro', 'El problema', 'La solución', 'El producto', 'El resultado']

function CinematicStory() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [chapterIndex, setChapterIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    let idx = 0
    for (let i = 0; i < CHAPTER_BOUNDS.length - 1; i++) {
      if (v >= CHAPTER_BOUNDS[i]) idx = i
    }
    setChapterIndex((prev) => (prev === idx ? prev : idx))
  })

  // Capas de fondo (solo opacity — nunca se anima background-color directamente)
  const redGlow = useTransform(scrollYProgress, [0.13, 0.20, 0.30], [0, 0.35, 0])
  const greenGlow = useTransform(scrollYProgress, [0.28, 0.38, 0.50], [0, 0.35, 0.15])

  // Capítulo 1 — Intro
  const introOpacity = useTransform(scrollYProgress, [0, 0.11, 0.15], [1, 1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.15], [0, -20])

  // Capítulo 2 — Problema
  const problemOpacity = useTransform(scrollYProgress, [0.13, 0.18, 0.28, 0.30], [0, 1, 1, 0])
  const problemY = useTransform(scrollYProgress, [0.13, 0.20], [16, 0])

  // Capítulo 3 — Solución
  const solutionOpacity = useTransform(scrollYProgress, [0.28, 0.33, 0.43, 0.45], [0, 1, 1, 0])
  const solutionY = useTransform(scrollYProgress, [0.28, 0.35], [16, 0])

  // Capítulo 4 — Producto (clímax), se sostiene hasta el final del pin
  const productOpacity = useTransform(scrollYProgress, [0.43, 0.49], [0, 1])
  const rawScale = useTransform(scrollYProgress, [0.43, 0.50], [0.85, 1])
  const productScale = useSpring(rawScale, { stiffness: 120, damping: 20 })
  const stackOpacity = useTransform(scrollYProgress, [0.58, 0.68], [0, 1])
  const stackY = useTransform(scrollYProgress, [0.58, 0.68], [12, 0])

  // Capítulo 5 — Resultado / CTAs
  const resultOpacity = useTransform(scrollYProgress, [0.75, 0.80], [0, 1])
  const resultY = useTransform(scrollYProgress, [0.75, 0.82], [24, 0])

  // Raíl de progreso
  const railTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const activeAt = (activeFrom, activeTo) => chapterIndex >= activeFrom && chapterIndex <= activeTo

  return (
    <div ref={containerRef} className="relative" style={{ height: '330vh' }}>
      {/* Salida rápida para usuarios de teclado que no quieran atravesar el pin */}
      <a
        href="#process"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50
          focus:bg-[#0B1120] focus:text-[#00D4FF] focus:px-4 focus:py-2 focus:rounded-full
          focus:border focus:border-[#00D4FF]/40"
      >
        Saltar historia interactiva
      </a>

      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Glows de fondo */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: redGlow, background: 'radial-gradient(circle at 30% 40%, rgba(239,68,68,0.5) 0%, transparent 65%)' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: greenGlow, background: 'radial-gradient(circle at 70% 60%, rgba(62,207,142,0.5) 0%, transparent 65%)' }}
        />

        {/* Raíl de progreso */}
        <div aria-hidden="true" className="absolute left-6 top-0 bottom-0 w-px bg-white/10 hidden lg:block">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00D4FF]"
            style={{ top: railTop }}
          />
        </div>
        <div aria-hidden="true" className="absolute left-6 bottom-8 text-[11px] font-semibold text-slate-500 tracking-wider hidden lg:block">
          0{chapterIndex + 1} / {CHAPTER_LABELS.length}
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative">

          {/* Capítulo 1 — Intro */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            {...(!activeAt(0, 0) ? { 'aria-hidden': true, inert: '' } : {})}
            className="absolute inset-x-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#00D4FF]" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#00D4FF]">
                Caso de estudio
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight max-w-2xl">
              Un proyecto. <span className="gradient-text">Contado como se construyó.</span>
            </h2>
          </motion.div>

          {/* Capítulo 2 — El problema */}
          <motion.div
            style={{ opacity: problemOpacity, y: problemY }}
            {...(!activeAt(1, 1) ? { 'aria-hidden': true, inert: '' } : {})}
            className="absolute inset-x-6"
          >
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-red-400/70 mb-6">
              El problema
            </p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-xl text-white">
              Una marca de streetwear real,{' '}
              <span className="text-red-400">sin ninguna presencia digital.</span>
            </h2>
          </motion.div>

          {/* Capítulo 3 — La solución */}
          <motion.div
            style={{ opacity: solutionOpacity, y: solutionY }}
            {...(!activeAt(2, 2) ? { 'aria-hidden': true, inert: '' } : {})}
            className="absolute inset-x-6"
          >
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#3ECF8E]/80 mb-6">
              La solución
            </p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight max-w-xl text-white">
              Diseñé y construí un{' '}
              <span className="text-[#3ECF8E]">e-commerce completo</span> desde cero.
            </h2>
          </motion.div>

          {/* Capítulos 4 y 5 — El producto en vivo (clímax) + resultado.
              El mockup queda siempre a la izquierda, sin cubrirse nunca; la
              columna lateral simplemente crece con más información conforme
              avanza el scroll (stack → resultado/CTAs), en vez de superponer
              una tarjeta flotante sobre el producto. */}
          <motion.div
            style={{ opacity: productOpacity }}
            {...(!activeAt(3, 4) ? { 'aria-hidden': true, inert: '' } : {})}
            className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center"
          >
            <motion.div style={{ scale: productScale }} className="max-w-xl mx-auto lg:mx-0 w-full">
              <VagosScrollDemo />
            </motion.div>

            <div className="lg:w-64 flex flex-col gap-8">
              <motion.div style={{ opacity: stackOpacity, y: stackY }}>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-400 mb-4">
                  Construido con
                </p>
                <StackPills />
              </motion.div>

              <motion.div style={{ opacity: resultOpacity, y: resultY }} className="pt-6 border-t border-white/10">
                <h3 className="text-xl font-black text-white tracking-tight mb-1">Vagos Clothes</h3>
                <p className="text-slate-500 text-xs font-medium mb-5">En producción, tráfico real.</p>
                <ProjectCTAs />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ── Epílogo — fuera del pin, scroll normal ─────────────────────────────────────
function NextChapterEpilogue() {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-6 mt-24"
    >
      <div
        className="rounded-3xl p-7 flex flex-col items-center text-center relative overflow-hidden group"
        style={{ background: '#0F1729', border: '1px dashed rgba(255,255,255,0.1)' }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
        />
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.12)' }}
        >
          <Clock size={24} className="text-[#00D4FF] opacity-60" />
        </div>
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#00D4FF]/50 mb-3">
          Próximo capítulo
        </p>
        <h3 className="text-xl font-bold text-white/70 mb-2 tracking-tight">Algo nuevo está siendo construido</h3>
        <p className="text-slate-600 text-[13px] leading-relaxed max-w-[280px] mb-6">
          Si tienes una idea en mente, hablemos.
        </p>
        <button
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-[12px] font-semibold text-[#00D4FF]/50 hover:text-[#00D4FF]
            border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 px-4 py-2 rounded-full
            transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]/60
            focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
        >
          Contáctame →
        </button>
      </div>
    </motion.div>
  )
}

// ── Sección de proyectos ──────────────────────────────────────────────────────
export default function Projects() {
  const compact = useCompactStory()

  return (
    <section id="projects" className="py-32 bg-[#0B1120] relative">
      <div
        className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-[#00D4FF]" />
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#00D4FF]">
            Proyectos
          </span>
        </motion.div>

        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-12"
        >
          Lo que he <span className="gradient-text">construido.</span>
        </motion.h2>
      </div>

      {compact ? (
        <div className="px-6">
          <CompactStory />
        </div>
      ) : (
        <>
          <CinematicStory />
          <NextChapterEpilogue />
        </>
      )}
    </section>
  )
}
