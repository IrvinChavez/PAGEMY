import { motion } from 'framer-motion'
import { Clock, ExternalLink, ShoppingBag } from 'lucide-react'

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

function VagosMockup() {
  const products = [
    { name: 'Oversized Tee', price: '$349', color: '#1a1a2e' },
    { name: 'Cargo Pants', price: '$590', color: '#16213e' },
    { name: 'Hoodie', price: '$720', color: '#0f3460' },
    { name: 'Shorts', price: '$280', color: '#1a1a2e' },
  ]
  return (
    <div className="relative">
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-25"
        style={{ background: 'linear-gradient(135deg, #E34F26, #3ECF8E)' }}
      />
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        style={{ background: '#0D1117' }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07]"
          style={{ background: '#090D13' }}
        >
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
          <div className="ml-3 flex-1 bg-white/[0.05] rounded-md px-3 py-1 text-[10px] text-slate-600 font-mono">
            vagosclothes.netlify.app
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={12} className="text-[#3ECF8E]" />
              <span className="text-[11px] font-bold text-white tracking-widest uppercase">Vagos Clothes</span>
            </div>
            <span className="text-[9px] text-slate-600 uppercase tracking-wider">Colección 2025</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {products.map((p) => (
              <div
                key={p.name}
                className="rounded-lg overflow-hidden"
                style={{ background: p.color, border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="h-16 flex items-center justify-center opacity-30">
                  <ShoppingBag size={22} className="text-white" />
                </div>
                <div className="px-2 pb-2">
                  <p className="text-[9px] text-slate-400 font-medium">{p.name}</p>
                  <p className="text-[10px] text-[#3ECF8E] font-bold">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="flex items-center justify-between rounded-lg px-3 py-2"
            style={{ background: 'rgba(62,207,142,0.08)', border: '1px solid rgba(62,207,142,0.15)' }}
          >
            <span className="text-[10px] text-slate-400">Envío gratis en pedidos +$800</span>
            <span className="text-[10px] font-bold text-[#3ECF8E]">Ver más →</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-[#0B1120] relative overflow-hidden">
      <div
        className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
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
            Proyectos
          </span>
        </motion.div>

        <motion.h2
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-12"
        >
          Lo que he <span className="gradient-text">construido.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Vagos Clothes */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-3xl p-7 flex flex-col relative overflow-hidden group"
            style={{ background: '#0F1729', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 0%, rgba(62,207,142,0.05) 0%, transparent 70%)' }}
            />

            <div className="mb-6 relative z-10">
              <VagosMockup />
            </div>

            <div className="flex-1 relative z-10">
              <h3 className="text-2xl font-black text-white mb-1 tracking-tight">Vagos Clothes</h3>
              <p className="text-slate-500 text-xs font-medium tracking-wide mb-4">Tienda de ropa urbana</p>
              <p className="text-slate-400 text-[14px] leading-relaxed mb-6">
                E-commerce de moda urbana con catálogo de productos, integración con Supabase y despliegue en
                Netlify. Diseño responsivo con cabeceras de seguridad HTTP optimizadas.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {[
                  { label: 'HTML', color: '#E34F26' },
                  { label: 'CSS', color: '#1572B6' },
                  { label: 'JavaScript', color: '#F7DF1E' },
                  { label: 'Supabase', color: '#3ECF8E' },
                  { label: 'Netlify', color: '#00C7B7' },
                ].map(({ label, color }) => (
                  <span
                    key={label}
                    className="text-[10px] font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${color}14`, color, border: `1px solid ${color}30` }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="https://vagosclothes.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full
                text-[#050816] bg-[#3ECF8E] hover:shadow-[0_0_24px_rgba(62,207,142,0.45)]
                hover:scale-105 transition-all duration-300 w-fit"
            >
              <ExternalLink size={14} />
              Ver sitio
            </a>
          </motion.div>

          {/* Próximamente */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="rounded-3xl p-7 flex flex-col items-center justify-center relative overflow-hidden group min-h-[400px]"
            style={{ background: '#0F1729', border: '1px dashed rgba(255,255,255,0.1)' }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
            />

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.12)' }}
            >
              <Clock size={24} className="text-[#00D4FF] opacity-60" />
            </div>

            <h3 className="text-xl font-bold text-white/50 mb-2 tracking-tight">Próximamente</h3>
            <p className="text-slate-600 text-[13px] text-center leading-relaxed max-w-[220px] mb-6">
              Algo nuevo está siendo construido. Si tienes una idea en mente, hablemos.
            </p>

            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative z-10 text-[12px] font-semibold text-[#00D4FF]/50 hover:text-[#00D4FF]
                border border-[#00D4FF]/20 hover:border-[#00D4FF]/50 px-4 py-2 rounded-full
                transition-all duration-200"
            >
              Contáctame →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
