import { motion } from 'framer-motion'
import { Layers, Sparkles, TrendingUp, Users, Clock, ShieldCheck } from 'lucide-react'
import FeatureCard from '../ui/FeatureCard'

const REASONS = [
  {
    icon: Layers,
    title: 'Cobertura Full-Stack',
    desc: 'Desde el esquema de base de datos hasta la UI perfecta — un solo desarrollador que domina toda la pila. Sin overhead de handoff, sin huecos de comunicación.',
    color: '#00D4FF',
  },
  {
    icon: Sparkles,
    title: 'Soluciones Potenciadas con IA',
    desc: 'Evalúo cada proyecto buscando oportunidades de mejora con inteligencia artificial. Tu software se vuelve más inteligente donde realmente importa.',
    color: '#A855F7',
  },
  {
    icon: TrendingUp,
    title: 'Resultados Orientados al Negocio',
    desc: 'No construyo funcionalidades solo porque son técnicamente impresionantes. Cada decisión se conecta con un objetivo de negocio.',
    color: '#10B981',
  },
  {
    icon: ShieldCheck,
    title: 'Arquitectura Limpia',
    desc: 'Código que realmente puedes mantener seis meses después. Legible, modular y diseñado para escalar sin reescritura total.',
    color: '#F59E0B',
  },
  {
    icon: Clock,
    title: 'Entrega Rápida y Confiable',
    desc: 'Alcance claro, tiempos honestos, comunicación proactiva. Sin sorpresas — solo resultados entregados cuando se prometen.',
    color: '#6366F1',
  },
  {
    icon: Users,
    title: 'Stack Moderno y Actual',
    desc: 'Uso las tecnologías hacia donde se mueve la industria — no herramientas legacy que necesitarás reemplazar en dos años.',
    color: '#FF6B6B',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function WhyChooseMe() {
  return (
    <section className="py-32 bg-[#050816] relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)' }}
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
            Por qué yo
          </span>
        </motion.div>

        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
        >
          Por qué los clientes <span className="gradient-text">me eligen.</span>
        </motion.h2>

        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-slate-400 text-lg mb-14 max-w-xl"
        >
          La diferencia entre un desarrollador que entrega código y uno que resuelve problemas.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r, i) => (
            <FeatureCard key={r.title} {...r} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
