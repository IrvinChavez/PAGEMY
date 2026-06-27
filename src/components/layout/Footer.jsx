import { Github, Mail, MessageCircle } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Servicios', href: '#services' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
]

const SOCIAL = [
  { icon: Github, href: 'https://github.com/IrvinChavez', label: 'GitHub' },
  { icon: Mail, href: 'mailto:ChavezIrvin942@gmail.com', label: 'Email' },
  { icon: MessageCircle, href: 'https://wa.me/526145524234', label: 'WhatsApp' },
]

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl font-black mb-1"
            >
              <span className="gradient-text">IN</span>
              <span className="text-white/30">.</span>
            </button>
            <p className="text-xs text-slate-600 mt-1">Transformando ideas en software inteligente.</p>
          </div>

          <div className="flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10
                  text-slate-400 hover:text-white hover:border-[#00D4FF]/40 hover:bg-[#00D4FF]/10 transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Irvin Chavez Gomez. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-700">
            Hecho con React · Vite · TailwindCSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
