import { motion } from 'framer-motion'
import { Search, Layers, Code2, Rocket } from 'lucide-react'
import DuotoneParallaxImage from '../ui/DuotoneParallaxImage'
import FeatureCard from '../ui/FeatureCard'

// PLACEHOLDER — reemplaza con una foto real de tu espacio de trabajo.
const WORKSPACE_IMAGE = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop'

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

        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
        >
          Cómo <span className="gradient-text">trabajo.</span>
        </motion.h2>

        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-slate-400 text-lg mb-14 max-w-xl"
        >
          Un proceso claro y transparente desde la primera conversación hasta el deploy en producción.
        </motion.p>

        <DuotoneParallaxImage
          src={WORKSPACE_IMAGE}
          alt="Espacio de trabajo"
          className="h-56 md:h-72 mb-14"
        />

        {/* Grid de 4 pasos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step, i) => (
            <FeatureCard key={step.title} {...step} index={i} />
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
          <p className="text-slate-400 text-sm mb-5">
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
