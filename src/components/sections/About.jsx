import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Zap, Target } from 'lucide-react'

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = to / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>
}

// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 2,   suffix: '+', label: 'Años construyendo' },
  { value: 12,  suffix: '+', label: 'Proyectos' },
  { value: 20,  suffix: '+', label: 'Tecnologías' },
  { value: 100, suffix: '%', label: 'Enfoque cliente' },
]

const PILLARS = [
  {
    icon: Code2,
    title: 'Código limpio por defecto',
    desc: 'Cada proyecto está estructurado para ser legible, mantenible y listo para escalar.',
  },
  {
    icon: Zap,
    title: 'Mentalidad IA primero',
    desc: 'Evalúo cada solución buscando oportunidades de automatización inteligente.',
  },
  {
    icon: Target,
    title: 'Resultados orientados al negocio',
    desc: 'Construyo funcionalidades que mueven la aguja de tu negocio, no solo vitrinas técnicas.',
  },
]

// ── Animaciones ───────────────────────────────────────────────────────────────
const reveal = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

// ── CAMBIO 2: Foto de perfil con borde glow + glassmorphism ──────────────────
// Para usar foto real: reemplaza /profile-placeholder.svg con la ruta de tu imagen
// Ejemplo: src="/irvin.jpg" o src="/irvin.webp"
function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Glow border animado — reutiliza gradientShift de index.css */}
      <div
        className="absolute -inset-px rounded-2xl opacity-60"
        style={{
          background: 'linear-gradient(135deg, #00D4FF, #A855F7, #00D4FF)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 4s linear infinite',
        }}
      />

      {/* Card glassmorphism */}
      <motion.div
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(13,21,48,0.92)',
          boxShadow: '0 0 40px rgba(0,212,255,0.1), 0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* ── Cambia esta imagen cuando tengas tu foto ── */}
        <img
          src="/FP.jpeg"
          alt="Foto de Irvin Chavez"
          className="w-full object-cover"
          style={{ aspectRatio: '4 / 5' }}
        />

        {/* Overlay inferior con nombre + disponibilidad */}
        <div
          className="absolute bottom-0 inset-x-0 px-5 py-4"
          style={{ background: 'linear-gradient(0deg, rgba(5,8,22,0.97) 0%, transparent 100%)' }}
        >
          <p className="text-white font-bold text-sm tracking-wide">Irvin Chavez</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E] animate-pulse" />
            <p className="text-[11px] text-slate-400">Disponible · Chihuahua, México</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Sección ───────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="py-32 bg-[#050816] relative overflow-hidden">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Label */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-[#00D4FF]" />
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#00D4FF]">
            Sobre mí
          </span>
        </motion.div>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Columna izquierda: texto + pilares ── */}
          <div>
            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-8"
            >
              El desarrollador
              <br />
              <span className="gradient-text">detrás del código.</span>
            </motion.h2>

            {/* CAMBIO 1: Texto más humano y personal */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-5 text-slate-400 text-[16px] leading-relaxed"
            >
              <p>
                Soy <strong className="text-white font-semibold">Irvin</strong>, desarrollador de software
                de <strong className="text-white font-semibold">Chihuahua, México</strong>.
              </p>
              <p>
                Comencé programando por curiosidad y con el tiempo descubrí que me apasiona crear
                soluciones que ayuden a{' '}
                <strong className="text-white font-semibold">personas reales</strong> a resolver{' '}
                <strong className="text-white font-semibold">problemas reales</strong>.
              </p>
              <p>
                Me especializo en{' '}
                <strong className="text-white font-semibold">desarrollo web</strong>,{' '}
                <strong className="text-white font-semibold">automatización</strong> e{' '}
                <strong className="text-white font-semibold">inteligencia artificial</strong>.
                Disfruto construir productos modernos, rápidos y útiles que combinen diseño,
                tecnología y funcionalidad.
              </p>
            </motion.div>

            {/* Pilares de valor */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
              className="mt-10 space-y-4"
            >
              {PILLARS.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={reveal}
                  className="flex gap-4 p-4 rounded-xl glass-card hover:border-[#00D4FF]/20 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center">
                    <Icon size={17} className="text-[#00D4FF]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-0.5">{title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Columna derecha: foto + stats + quote ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            className="lg:pt-6 space-y-5"
          >
            {/* CAMBIO 2: Foto de perfil */}
            <ProfilePhoto />

            {/* Stats compactas 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map(({ value, suffix, label }) => (
                <motion.div
                  key={label}
                  variants={reveal}
                  className="glass-card rounded-xl p-5 hover:border-[#00D4FF]/20 transition-all duration-300"
                >
                  <p className="text-3xl font-black gradient-text mb-1">
                    <Counter to={value} suffix={suffix} />
                  </p>
                  <p className="text-xs text-slate-500 font-medium leading-snug">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              variants={reveal}
              className="glass-card rounded-xl p-6 border-l-2 border-[#00D4FF]/50"
            >
              <p className="text-slate-300 text-[14px] leading-relaxed italic">
                &ldquo;No solo escribo código. Construyo soluciones que hacen que los negocios funcionen de forma más inteligente.&rdquo;
              </p>
              <p className="mt-3 text-xs text-slate-600 font-semibold tracking-widest uppercase">
                — Irvin Chavez
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
