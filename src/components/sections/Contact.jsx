import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Github, Send, CheckCircle2, AlertCircle } from 'lucide-react'

const BUDGET_OPTIONS = [
  'Menos de $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000+',
  'Lo platicamos',
]

const SOCIALS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ChavezIrvin942@gmail.com',
    href: 'mailto:ChavezIrvin942@gmail.com',
    color: '#00D4FF',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+52 6145524234',
    href: 'https://wa.me/526145524234',
    color: '#25D366',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/IrvinChavez',
    href: 'https://github.com/IrvinChavez',
    color: '#e0e0e0',
  },
]

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqevqnyp'

function InputField({ label, type = 'text', name, value, onChange, placeholder, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-400 tracking-wide">
        {label} {required && <span className="text-[#00D4FF]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600
          bg-white/[0.04] border border-white/[0.07] focus:border-[#00D4FF]/50 focus:bg-white/[0.06]
          outline-none transition-all duration-200 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
      />
    </div>
  )
}

// Validación simple en cliente
function validate(form) {
  if (!form.name.trim())    return 'El nombre es requerido.'
  if (!form.email.trim())   return 'El email es requerido.'
  if (!/\S+@\S+\.\S+/.test(form.email)) return 'Ingresa un email válido.'
  if (!form.message.trim()) return 'El mensaje no puede estar vacío.'
  return null
}

const INITIAL_FORM = { name: '', email: '', company: '', budget: '', message: '' }

export default function Contact() {
  const [form,       setForm]       = useState(INITIAL_FORM)
  const [status,     setStatus]     = useState('idle')   // idle | loading | success | error
  const [errorMsg,   setErrorMsg]   = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // CAMBIO 4: envío real vía Formspree (fetch + JSON)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validate(form)
    if (validationError) {
      setErrorMsg(validationError)
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          company: form.company || 'N/A',
          budget:  form.budget  || 'No especificado',
          message: form.message,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setForm(INITIAL_FORM)
      } else {
        // Formspree devuelve detalles de error en JSON
        const data = await res.json()
        setErrorMsg(data?.errors?.[0]?.message || 'Error al enviar. Intenta de nuevo.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Sin conexión. Contáctame directamente por email o WhatsApp.')
      setStatus('error')
    }
  }

  const reveal = {
    hidden: { opacity: 0, y: 32 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="contact" className="py-32 bg-[#0B1120] relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)' }}
      />
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
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
            Contacto
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Columna izquierda */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Hablemos<span className="gradient-text">.</span>
            </h2>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-12 max-w-sm">
              ¿Tienes un proyecto en mente? ¿Quieres platicar una idea? Normalmente respondo en menos de 24 horas.
            </p>

            <div className="space-y-4">
              {SOCIALS.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl glass-card
                    hover:border-white/15 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                      group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${color}18`, border: `1px solid ${color}28` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-medium mb-0.5">{label}</p>
                    <p className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Columna derecha: formulario */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {status === 'success' ? (
              /* ── Estado de éxito ── */
              <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-5 min-h-[400px]">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}
                >
                  <CheckCircle2 size={32} className="text-[#00D4FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white">¡Mensaje enviado!</h3>
                <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                  Recibí tu mensaje y te responderé en menos de 24 horas. ¡Gracias por escribir!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-[#00D4FF] hover:underline mt-2"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              /* ── Formulario ── */
              <form onSubmit={handleSubmit} noValidate className="glass-card rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField
                    label="Nombre completo"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    required
                  />
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="juan@empresa.com"
                    required
                  />
                </div>

                <InputField
                  label="Empresa / Negocio"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Mi Empresa S.A. (opcional)"
                />

                {/* Selector de presupuesto */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 tracking-wide">
                    Rango de presupuesto
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, budget: opt }))}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                          form.budget === opt
                            ? 'bg-[#00D4FF]/15 border-[#00D4FF]/50 text-[#00D4FF]'
                            : 'bg-white/[0.03] border-white/[0.07] text-slate-500 hover:text-slate-300 hover:border-white/15'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 tracking-wide">
                    Mensaje <span className="text-[#00D4FF]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Cuéntame de tu proyecto — qué necesitas, tiempos y cualquier contexto que ayude..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600
                      bg-white/[0.04] border border-white/[0.07] focus:border-[#00D4FF]/50 focus:bg-white/[0.06]
                      outline-none transition-all duration-200 resize-none focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)]"
                  />
                </div>

                {/* Mensaje de error */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5"
                  >
                    <AlertCircle size={14} />
                    {errorMsg || 'Algo salió mal. Intenta contactarme directamente.'}
                  </motion.div>
                )}

                {/* Botón submit con loading state */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2.5 py-4 text-sm font-bold
                    text-[#050816] bg-[#00D4FF] rounded-xl disabled:opacity-70 disabled:cursor-not-allowed
                    hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#050816]/30 border-t-[#050816] rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <>
                      <Send size={15} />
                      Enviar mensaje
                    </>
                  )}
                </motion.button>

                {/* Nota sobre Formspree (para dev — eliminar en producción si quieres) */}
                <p className="text-center text-[10px] text-slate-700">
                  Formulario seguro vía Formspree · Sin spam
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
