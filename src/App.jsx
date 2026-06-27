import Navbar      from './components/layout/Navbar'
import Footer      from './components/layout/Footer'
import Hero        from './components/sections/Hero'
import About       from './components/sections/About'
import TechStack   from './components/sections/TechStack'
import Services    from './components/sections/Services'
import Projects    from './components/sections/Projects'
import Process     from './components/sections/Process'   // CAMBIO 5: nueva sección
import WhyChooseMe from './components/sections/WhyChooseMe'
import CallToAction from './components/sections/CallToAction'
import Contact     from './components/sections/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Services />
        <Projects />
        <Process />       {/* entre Proyectos y WhyChooseMe */}
        <WhyChooseMe />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
