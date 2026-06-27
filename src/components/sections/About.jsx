import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Zap, Target } from 'lucide-react'

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

const STATS = [
  { value: 2, suffix: '+', label: 'Años construyendo' },
  { value: 12, suffix: '+', label: 'Proyectos entregados' },
  { value: 20, suffix: '+', label: 'Tecnologías' },
  { value: 100, suffix: '%', label: 'Enfoque en el cliente' },
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

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  return (
    <section id="about" className="py-32 bg-[#050816] relative overflow-hidden">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
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

        <div className="grid lg:grid-cols-2 gap-16 items-start">
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

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-5 text-slate-400 text-[16px] leading-relaxed"
            >
              <p>
                Soy <strong className="text-white font-semibold">Irvin Chavez</strong>, desarrollador de software
                y constructor de IA apasionado por crear productos digitales que resuelven problemas reales de negocio.
                Empecé con curiosidad y lo convertí en oficio — construyendo desde landing pages hasta aplicaciones
                full-stack potenciadas con inteligencia artificial.
              </p>
              <p>
                Me especializo en la intersección del{' '}
                <strong className="text-white font-semibold">desarrollo web moderno</strong>{' '}
                y la <strong className="text-white font-semibold">automatización inteligente</strong>. Ya sea una
                API REST escalable, un frontend pixel-perfect o un sistema OCR que lee tickets — construyo cosas
                que funcionan en producción.
              </p>
              <p>
                Mi objetivo es simple: crear tecnología que genere valor real. Cada proyecto que tomo lo trato
                como si fuera mi propio negocio — con cuidado en la arquitectura, el rendimiento y la
                mantenibilidad a largo plazo.
              </p>
            </motion.div>

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

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
            className="lg:pt-14"
          >
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, suffix, label }) => (
                <motion.div
                  key={label}
                  variants={reveal}
                  className="glass-card rounded-2xl p-7 hover:border-[#00D4FF]/20 transition-all duration-300"
                >
                  <p className="text-4xl font-black gradient-text mb-2">
                    <Counter to={value} suffix={suffix} />
                  </p>
                  <p className="text-sm text-slate-500 font-medium">{label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={reveal}
              className="mt-4 glass-card rounded-2xl p-7 border-l-2 border-[#00D4FF]/50"
            >
              <p className="text-slate-300 text-[15px] leading-relaxed italic">
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
