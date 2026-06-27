import { motion } from 'framer-motion'
import { Search, Layers, Code2, Rocket } from 'lucide-react'

// ── CAMBIO 5: Sección "Cómo trabajo" ─────────────────────────────────────────
const STEPS = [
  {
    number: '01',
    icon:   Search,
    title:  'Descubrimiento',
    desc:   'Entiendo tu problema, objetivos y contexto de negocio antes de escribir una sola línea de código.',
    color:  '#00D4FF',
  },
  {
    number: '02',
    icon:   Layers,
    title:  'Diseño',
    desc:   'Planificamos juntos la arquitectura técnica y la experiencia de usuario. Sin sorpresas en el camino.',
    color:  '#A855F7',
  },
  {
    number: '03',
    icon:   Code2,
    title:  'Desarrollo',
    desc:   'Construyo la solución con código limpio, escalable y documentado. Con actualizaciones constantes.',
    color:  '#6366F1',
  },
  {
    number: '04',
    icon:   Rocket,
    title:  'Deploy',
    desc:   'Publicación, pruebas, optimización de rendimiento y entrega final. Listo para producción desde el día uno.',
    color:  '#10B981',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function StepCard({ number, icon: Icon, title, desc, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative glass-card rounded-2xl p-7 overflow-hidden cursor-default
        hover:border-white/15 transition-all duration-300"
    >
      {/* Glow de fondo al hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 0% 0%, ${color}12 0%, transparent 65%)` }}
      />

      {/* Número grande decorativo */}
      <span
        className="absolute top-5 right-5 text-5xl font-black leading-none select-none"
        style={{ color: `${color}12` }}
      >
        {number}
      </span>

      {/* Ícono */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10
          group-hover:scale-110 transition-transform duration-300"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={22} style={{ color }} />
      </div>

      {/* Texto */}
      <h3 className="text-lg font-bold text-white mb-3 relative z-10">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed relative z-10">{desc}</p>

      {/* Línea inferior animada al hover */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function Process() {
  return (
    <section id="process" className="py-32 bg-[#050816] relative overflow-hidden">
      {/* Orbe decorativo */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }}
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
            Mi proceso
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black tracking-tight"
          >
            Cómo <span className="gradient-text">trabajo.</span>
          </motion.h2>

          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-slate-500 max-w-sm text-sm leading-relaxed md:text-right"
          >
            Un proceso claro y transparente desde la primera conversación hasta el deploy en producción.
          </motion.p>
        </div>

        {/* Grid de 4 pasos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <StepCard key={step.title} {...step} index={i} />
          ))}
        </div>

        {/* CTA inferior */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-slate-500 text-sm mb-5">
            ¿Listo para empezar? El paso 01 comienza con una llamada sin compromiso.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#050816]
              bg-[#00D4FF] rounded-full hover:shadow-[0_0_30px_rgba(0,212,255,0.45)]
              hover:scale-105 transition-all duration-300"
          >
            Iniciar proyecto →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
