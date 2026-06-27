import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Servicios', href: '#services' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
]

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLink = (href) => {
    setOpen(false)
    scrollTo(href)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050816]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(0,212,255,0.06)]'
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-black tracking-tight"
            aria-label="Inicio"
          >
            <span className="gradient-text">IN</span>
            <span className="text-white/30">.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="relative text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 group py-1"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-[#00D4FF] to-[#A855F7] group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>

          <button
            onClick={() => handleLink('#contact')}
            className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold text-[#050816] bg-[#00D4FF] rounded-full
              hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-105 transition-all duration-300"
          >
            Contratarme
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white transition-colors"
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0B1120]/95 backdrop-blur-2xl border-b border-white/[0.06] md:hidden"
          >
            <nav className="flex flex-col p-6 gap-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleLink(l.href)}
                  className="text-left text-slate-300 text-base py-3 px-2 border-b border-white/[0.05] hover:text-white transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => handleLink('#contact')}
                className="mt-4 py-3 text-base font-semibold text-[#050816] bg-[#00D4FF] rounded-full"
              >
                Contratarme
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
