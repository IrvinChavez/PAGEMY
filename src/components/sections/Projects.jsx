import { motion } from 'framer-motion'
import { Clock, ExternalLink, Github } from 'lucide-react'

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

// ── Corredor auto-scroll que recrea la página real de Vagos Clothes ───────────
// iframe no es posible (X-Frame-Options: DENY en su netlify.toml),
// por lo que recreamos el diseño como JSX y lo animamos con CSS scroll infinito.
const PRODUCTS = [
  { name: 'Oversized Tee', price: '$349' },
  { name: 'Cargo Pants',   price: '$590' },
  { name: 'Hoodie',        price: '$720' },
  { name: 'Shorts',        price: '$280' },
  { name: 'Bucket Hat',    price: '$180' },
  { name: 'Wide Leg',      price: '$650' },
]

function VagosPageSlice() {
  return (
    <div style={{ userSelect: 'none', pointerEvents: 'none', background: '#080808' }}>

      {/* ── Navbar ── */}
      <div style={{
        background: '#080808',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '9px 14px',
        gap: 8,
      }}>
        <span style={{ fontSize: 9, fontWeight: 900, color: '#fff', letterSpacing: '0.06em', whiteSpace: 'nowrap', flexShrink: 0 }}>
          VAGOS <span style={{ color: '#CC0000' }}>·</span> CLOTHES
        </span>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {['INICIO','TIENDA','ENTREGAS','CONTACTO'].map(l => (
            <span key={l} style={{ fontSize: 6, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{l}</span>
          ))}
        </div>
        <span style={{
          fontSize: 6, fontWeight: 700, color: '#CC0000',
          border: '1px solid #CC0000', padding: '2px 6px', borderRadius: 2,
          letterSpacing: '0.05em', whiteSpace: 'nowrap', flexShrink: 0,
        }}>UNIRSE – 15% OFF</span>
      </div>

      {/* ── Hero (split: negro izquierda / crimson derecha) ── */}
      <div style={{ display: 'flex', minHeight: 200 }}>
        {/* Lado izquierdo */}
        <div style={{
          flex: '0 0 56%', background: '#080808', overflow: 'hidden',
          padding: '16px 14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {/* Location label — separado del navbar con padding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
            <div style={{ width: 14, height: 1, background: '#CC0000', flexShrink: 0 }} />
            <span style={{ fontSize: 5, color: '#CC0000', fontWeight: 700, letterSpacing: '0.2em', whiteSpace: 'nowrap' }}>CHIHUAHUA, MEXICO</span>
          </div>

          {/* Hero text — 34px para que "REGLAS" no desborde */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
              <span style={{ fontSize: 34, fontWeight: 900, color: '#fff', letterSpacing: '-0.01em', display: 'block', lineHeight: 1 }}>SIN</span>
              <div style={{
                position: 'absolute', top: '52%', left: 0, width: '65%', height: 2.5,
                background: 'rgba(0,220,255,0.6)', borderRadius: 1,
              }} />
            </div>
            <span style={{ fontSize: 34, fontWeight: 900, color: '#fff', letterSpacing: '-0.01em', display: 'block', lineHeight: 1 }}>REGLAS</span>
            <span style={{ fontSize: 34, fontWeight: 900, color: '#CC0000', letterSpacing: '-0.01em', display: 'block', lineHeight: 1 }}>SIN</span>
            <span style={{
              fontSize: 34, fontWeight: 900, color: 'transparent', letterSpacing: '-0.01em', display: 'block', lineHeight: 1,
              WebkitTextStroke: '1.5px #fff',
            }}>LÍMITES</span>
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: 6.5, color: 'rgba(255,255,255,0.38)', lineHeight: 1.55,
            borderLeft: '2px solid rgba(255,255,255,0.12)', paddingLeft: 7,
            maxWidth: 170, marginBottom: 10,
          }}>
            No somos una marca. Somos una actitud.<br />
            Ropa streetwear para los que no le piden permiso a nadie.
          </p>

          {/* Botones */}
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 6.5, fontWeight: 700, color: '#fff',
              background: '#CC0000', padding: '4px 10px', borderRadius: 2, letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
            }}>Comprar ahora</span>
            <span style={{
              fontSize: 6.5, fontWeight: 700, color: '#fff',
              border: '1px solid rgba(62,207,142,0.5)', padding: '4px 10px', borderRadius: 2,
              letterSpacing: '0.03em', whiteSpace: 'nowrap',
            }}>❤ Regístrate – 15% OFF</span>
          </div>
        </div>

        {/* Lado derecho: degradado crimson */}
        <div style={{
          flex: 1,
          background: 'radial-gradient(ellipse at 40% 40%, #3d0000 0%, #1c0000 45%, #0a0000 100%)',
        }} />
      </div>

      {/* ── Tienda (grid de productos) ── */}
      <div style={{ background: '#0d0d0d', padding: '14px 14px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em', fontWeight: 700, marginBottom: 10 }}>
          — TIENDA —
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {PRODUCTS.map(p => (
            <div key={p.name} style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 4, padding: '12px 8px 7px',
              aspectRatio: '1',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
              <div style={{ fontSize: 7.5, color: '#CC0000', fontWeight: 700 }}>{p.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Separador limpio entre iteraciones del loop */}
      <div style={{ background: '#080808', borderTop: '1px solid rgba(204,0,0,0.12)', height: 20 }} />
    </div>
  )
}

function VagosScrollDemo() {
  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      border: '1px solid rgba(204,0,0,0.25)',
      boxShadow: '0 0 30px rgba(204,0,0,0.08), 0 8px 32px rgba(0,0,0,0.5)',
      background: '#090D13',
    }}>
      {/* Browser chrome */}
      <div style={{
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 12px',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41', display: 'inline-block' }} />
        <div style={{
          flex: 1, marginLeft: 8,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 4, padding: '2px 8px',
          fontSize: 9, color: '#4b5563', fontFamily: 'monospace',
        }}>
          vagosclothes.netlify.app
        </div>
        <span style={{ fontSize: 8, color: '#CC0000', fontWeight: 700, border: '1px solid rgba(204,0,0,0.3)', padding: '1px 6px', borderRadius: 10 }}>
          LIVE
        </span>
      </div>

      {/* Ventana de scroll */}
      <div style={{ height: 300, overflow: 'hidden', position: 'relative' }}>
        <div className="vagos-scroll-track">
          <VagosPageSlice />
          <VagosPageSlice />
        </div>

        {/* Fade top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 24,
          background: 'linear-gradient(to bottom, #090D13, transparent)',
          pointerEvents: 'none', zIndex: 2,
        }} />
        {/* Fade bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 50,
          background: 'linear-gradient(to bottom, transparent, #090D13)',
          pointerEvents: 'none', zIndex: 2,
        }} />
      </div>
    </div>
  )
}

// ── Sección de proyectos ──────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-[#0B1120] relative overflow-hidden">
      <div
        className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
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

          {/* ── Tarjeta: Vagos Clothes ── */}
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

            {/* Header del proyecto */}
            <div className="relative z-10 mb-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-2xl font-black text-white tracking-tight">Vagos Clothes</h3>
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full mt-1"
                  style={{ background: 'rgba(62,207,142,0.1)', color: '#3ECF8E', border: '1px solid rgba(62,207,142,0.2)' }}
                >
                  Live
                </span>
              </div>
              <p className="text-slate-500 text-xs font-medium tracking-wide">E-commerce · Moda Urbana</p>
            </div>

            {/* Problema → Solución */}
            <div className="grid grid-cols-2 gap-2.5 mb-5 relative z-10">
              <div
                className="rounded-lg px-3 py-2.5"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}
              >
                <p className="text-[9px] text-red-400/60 uppercase tracking-wider mb-1 font-semibold">Problema</p>
                <p className="text-[11px] text-slate-300 font-medium leading-tight">Tienda sin presencia digital</p>
              </div>
              <div
                className="rounded-lg px-3 py-2.5"
                style={{ background: 'rgba(62,207,142,0.06)', border: '1px solid rgba(62,207,142,0.12)' }}
              >
                <p className="text-[9px] text-[#3ECF8E]/60 uppercase tracking-wider mb-1 font-semibold">Solución</p>
                <p className="text-[11px] text-slate-300 font-medium leading-tight">E-commerce con catálogo online</p>
              </div>
            </div>

            {/* Corredor auto-scroll de la página real */}
            <div className="mb-6 relative z-10">
              <VagosScrollDemo />
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
              {[
                { label: 'HTML',       color: '#E34F26' },
                { label: 'CSS',        color: '#1572B6' },
                { label: 'JavaScript', color: '#F7DF1E' },
                { label: 'Supabase',   color: '#3ECF8E' },
                { label: 'Netlify',    color: '#00C7B7' },
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

            {/* Botones */}
            <div className="flex gap-3 relative z-10 mt-auto">
              <a
                href="https://vagosclothes.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full
                  text-[#050816] bg-[#3ECF8E] hover:shadow-[0_0_24px_rgba(62,207,142,0.45)]
                  hover:scale-105 transition-all duration-300"
              >
                <ExternalLink size={14} />
                Ver sitio
              </a>
              <a
                href="https://github.com/IrvinChavez"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full
                  border border-white/15 text-slate-300 hover:text-white hover:border-white/30
                  hover:bg-white/[0.04] transition-all duration-200"
              >
                <Github size={14} />
                GitHub
              </a>
            </div>
          </motion.div>

          {/* ── Tarjeta: Próximamente ── */}
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
