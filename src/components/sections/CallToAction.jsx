import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0B1120]" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.08) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.8) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div
        className="absolute -top-20 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: '#00D4FF' }}
      />
      <div
        className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: '#A855F7' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#00D4FF] mb-6">
            Trabajemos juntos
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Tu negocio merece
            <br />
            <span className="gradient-text">software que trabaje para ti.</span>
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            Ya sea que necesites un nuevo producto desde cero o mejorar un sistema existente —
            construyamos algo que marque una diferencia real.
          </p>

          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group inline-flex items-center gap-3 px-10 py-5 text-base font-bold text-[#050816] bg-[#00D4FF] rounded-full
              hover:shadow-[0_0_60px_rgba(0,212,255,0.6)] transition-shadow duration-300"
          >
            Construyamos algo grande
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>

          <p className="mt-6 text-xs text-slate-600">
            Sin compromisos. Solo una conversación.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
