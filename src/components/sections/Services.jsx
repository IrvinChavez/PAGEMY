import { motion } from 'framer-motion'
import { Globe, Server, Brain, FileSearch, Plug, Zap } from 'lucide-react'

const SERVICES = [
  {
    icon: Globe,
    title: 'Desarrollo Web',
    desc: 'Sitios web y aplicaciones de alto rendimiento construidos con React y herramientas modernas. Optimizados para velocidad, SEO y conversión.',
    color: '#00D4FF',
    tag: 'React · Vite · TailwindCSS',
  },
  {
    icon: Server,
    title: 'Sistemas Backend',
    desc: 'APIs REST robustas, capas de autenticación y lógica de negocio con Node.js o Python. Limpio, seguro y escalable.',
    color: '#A855F7',
    tag: 'Node.js · FastAPI · Express',
  },
  {
    icon: Brain,
    title: 'Integración de IA',
    desc: 'Agrega inteligencia a tu producto — asistentes IA, clasificación inteligente, análisis de documentos y motores de decisión.',
    color: '#6366F1',
    tag: 'Gemini · Claude · Python',
  },
  {
    icon: FileSearch,
    title: 'Sistemas OCR',
    desc: 'Automatiza la extracción de datos de tickets, facturas y documentos. Elimina la captura manual y acelera tus procesos.',
    color: '#10B981',
    tag: 'Gemini Vision · Visión por Computadora',
  },
  {
    icon: Plug,
    title: 'Desarrollo de APIs',
    desc: 'APIs limpias y documentadas para integraciones web, móvil y con terceros. Construidas con seguridad y experiencia de desarrollador en mente.',
    color: '#F59E0B',
    tag: 'REST · Auth · Swagger',
  },
  {
    icon: Zap,
    title: 'Optimización de Rendimiento',
    desc: 'Audita y optimiza sistemas existentes para velocidad, confiabilidad y costo. Mejoras reales medidas con métricas reales.',
    color: '#FF6B6B',
    tag: 'Auditoría · Refactor · Escala',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function ServiceCard({ icon: Icon, title, desc, color, tag, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative glass-card rounded-2xl p-7 overflow-hidden cursor-default
        hover:border-white/15 transition-all duration-400"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 0% 0%, ${color}12 0%, transparent 60%)` }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={22} style={{ color }} />
      </div>

      <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>

      <span
        className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md"
        style={{ background: `${color}14`, color }}
      >
        {tag}
      </span>

      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[#050816] relative overflow-hidden">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
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
            Servicios
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
            Lo que <span className="gradient-text">construyo.</span>
          </motion.h2>

          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-slate-500 max-w-sm text-sm leading-relaxed md:text-right"
          >
            Soluciones de software de extremo a extremo, del concepto a producción, adaptadas a tus objetivos de negocio.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
