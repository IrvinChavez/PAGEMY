import { motion } from 'framer-motion'
import { Globe, Server, Brain, FileSearch, Plug, Zap } from 'lucide-react'
import DuotoneParallaxImage from '../ui/DuotoneParallaxImage'
import FeatureCard from '../ui/FeatureCard'

// PLACEHOLDER — reemplaza con una imagen abstracta/tech de tu elección.
const TECH_BG_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop'

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

export default function Services() {
  return (
    <section id="services" className="py-32 bg-[#050816] relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DuotoneParallaxImage
          src={TECH_BG_IMAGE}
          alt=""
          variant="background"
          rounded="rounded-none"
          className="w-full h-full"
        />
      </div>
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

        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
        >
          Lo que <span className="gradient-text">construyo.</span>
        </motion.h2>

        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-slate-400 text-lg mb-14 max-w-xl"
        >
          Soluciones de software de extremo a extremo, del concepto a producción, adaptadas a tus objetivos de negocio.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <FeatureCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
