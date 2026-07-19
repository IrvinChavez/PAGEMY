import ScrollExpandMedia from '../ui/ScrollExpandMedia'

// PLACEHOLDER — reemplaza bgImageSrc/mediaSrc/title/eyebrow y el texto de
// abajo con contenido real (una foto de tu setup, una captura de un
// proyecto, etc.). Las imágenes de Unsplash son solo para ver el efecto.
const BG_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop'
const MEDIA_IMAGE = 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop'

export default function ScrollShowcase() {
  return (
    <section className="relative bg-[#050816]">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={MEDIA_IMAGE}
        bgImageSrc={BG_IMAGE}
        title="Diseño con propósito"
        eyebrow="Un vistazo más de cerca"
        scrollToExpand="Desplázate para expandir"
      >
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Este es un espacio para contar una historia visual: un vistazo
            detrás de escena a tu proceso, tu espacio de trabajo, o el detalle
            de un proyecto que merece un momento propio en la página.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Reemplaza esta imagen y este texto con contenido real — una foto
            de tu setup, una captura de un proyecto, o un momento que quieras
            que el visitante recuerde.
          </p>
        </div>
      </ScrollExpandMedia>
    </section>
  )
}
