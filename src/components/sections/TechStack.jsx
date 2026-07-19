import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIES = ['Frontend', 'Backend', 'Base de datos', 'IA & Automatización', 'Herramientas']

const TECH = {
  Frontend: [
    { name: 'HTML5', color: '#E44D26', abbr: 'HT' },
    { name: 'CSS3', color: '#264DE4', abbr: 'CS' },
    { name: 'JavaScript', color: '#F7DF1E', abbr: 'JS', dark: true },
    { name: 'React', color: '#61DAFB', abbr: 'Re', dark: true },
    { name: 'Vite', color: '#646CFF', abbr: 'Vi' },
    { name: 'TailwindCSS', color: '#06B6D4', abbr: 'Tw' },
    { name: 'Diseño Responsivo', color: '#00D4FF', abbr: 'RD' },
    { name: 'UI / UX', color: '#A855F7', abbr: 'UX' },
  ],
  Backend: [
    { name: 'Node.js', color: '#339933', abbr: 'No' },
    { name: 'Express.js', color: '#ebebeb', abbr: 'Ex', dark: true },
    { name: 'REST APIs', color: '#FF6B6B', abbr: 'RE' },
    { name: 'Python', color: '#3776AB', abbr: 'Py' },
    { name: 'FastAPI', color: '#009688', abbr: 'FA' },
    { name: 'Autenticación', color: '#00D4FF', abbr: 'Au' },
    { name: 'Serverless', color: '#F59E0B', abbr: 'SF' },
  ],
  'Base de datos': [
    { name: 'Firebase', color: '#FFCA28', abbr: 'FB', dark: true },
    { name: 'Firestore', color: '#FF9800', abbr: 'FS', dark: true },
    { name: 'Supabase', color: '#3ECF8E', abbr: 'Sb', dark: true },
    { name: 'SQL', color: '#336791', abbr: 'SQ' },
    { name: 'Arquitectura DB', color: '#A855F7', abbr: 'DA' },
  ],
  'IA & Automatización': [
    { name: 'Gemini API', color: '#4285F4', abbr: 'Gm' },
    { name: 'Claude API', color: '#CC785C', abbr: 'Cl' },
    { name: 'Sistemas OCR', color: '#A855F7', abbr: 'OC' },
    { name: 'Asistentes IA', color: '#00D4FF', abbr: 'AI' },
    { name: 'Automatización', color: '#10B981', abbr: 'Au' },
    { name: 'Análisis de datos', color: '#F59E0B', abbr: 'DA' },
    { name: 'Clasificación', color: '#6366F1', abbr: 'CL' },
  ],
  Herramientas: [
    { name: 'Git', color: '#F05032', abbr: 'Gt' },
    { name: 'GitHub', color: '#e0e0e0', abbr: 'GH', dark: true },
    { name: 'Linux', color: '#FCC624', abbr: 'Lx', dark: true },
    { name: 'Docker', color: '#2496ED', abbr: 'Dk' },
    { name: 'VS Code', color: '#007ACC', abbr: 'VS' },
    { name: 'Debugging', color: '#FF6B6B', abbr: 'Db' },
    { name: 'Optimización', color: '#00D4FF', abbr: 'Op' },
  ],
}

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function TechCard({ name, color, abbr, dark, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="glass-card rounded-xl p-4 flex flex-col items-center gap-3 group cursor-default
        hover:border-white/15 transition-all duration-300 relative overflow-hidden"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-black tracking-tight flex-shrink-0"
        style={{
          background: `${color}22`,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 16px ${color}18`,
        }}
      >
        <span style={{ color: dark ? '#111' : color }}>{abbr}</span>
      </div>
      <p className="text-[11px] font-semibold text-slate-400 text-center leading-tight group-hover:text-white transition-colors duration-200">
        {name}
      </p>
      <span
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px group-hover:w-3/4 transition-all duration-300 rounded-full"
        style={{ background: color }}
      />
    </motion.div>
  )
}

export default function TechStack() {
  const [active, setActive] = useState('Frontend')

  return (
    <section id="stack" className="py-32 bg-[#0B1120] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
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
            Stack Tecnológico
          </span>
        </motion.div>

        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
        >
          Mi <span className="gradient-text">arsenal.</span>
        </motion.h2>

        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-slate-500 text-lg mb-12 max-w-xl"
        >
          Las tecnologías que uso para construir software rápido, escalable e inteligente.
        </motion.p>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                active === cat
                  ? 'text-[#050816] bg-[#00D4FF] shadow-[0_0_24px_rgba(0,212,255,0.4)]'
                  : 'text-slate-400 bg-white/[0.04] border border-white/[0.07] hover:text-white hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-3"
          >
            {TECH[active].map((tech, i) => (
              <TechCard key={tech.name} {...tech} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
