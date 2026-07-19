import { motion } from 'framer-motion'

// Tarjeta única reutilizada por Services, Process y WhyChooseMe — antes cada
// sección reimplementaba su propia versión (tamaños de ícono distintos,
// duraciones distintas, un glow vs. dos glows, con/sin línea inferior).
// Un solo componente = una sola sensación de "panel" en todo el sitio.
const EASE = [0.22, 1, 0.36, 1]
export const CARD_REVEAL_DURATION = 0.7
export const CARD_STAGGER = 0.08

export default function FeatureCard({ icon: Icon, title, desc, color, tag, number, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: CARD_REVEAL_DURATION, delay: index * CARD_STAGGER, ease: EASE }}
      whileHover={{ y: -6 }}
      className="group relative glass-card rounded-2xl p-7 overflow-hidden cursor-default
        hover:border-white/15 transition-all duration-300"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 0% 0%, ${color}12 0%, transparent 65%)` }}
      />

      {number && (
        <span
          className="absolute top-5 right-5 text-5xl font-black leading-none select-none"
          style={{ color: `${color}12` }}
        >
          {number}
        </span>
      )}

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 relative z-10
          group-hover:scale-110 transition-transform duration-300"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={22} style={{ color }} />
      </div>

      <h3 className="text-lg font-bold text-white mb-3 relative z-10">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed relative z-10">{desc}</p>

      {tag && (
        <span
          className="inline-block mt-5 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md relative z-10"
          style={{ background: `${color}14`, color }}
        >
          {tag}
        </span>
      )}

      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </motion.div>
  )
}
