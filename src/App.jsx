import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import Typed from 'typed.js'
import { IoArrowForward, IoCodeSlashOutline, IoSend, IoClose, IoTerminalOutline } from 'react-icons/io5'
import { LuGithub } from 'react-icons/lu'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { FaRegCopy, FaCheck } from 'react-icons/fa'
import { MdLanguage } from 'react-icons/md'
import { IoMdDownload } from 'react-icons/io'
import { FaRegFilePdf } from 'react-icons/fa6'
import photo from './assets/foto_traje.jpg'
import spotifyImage from './assets/spotify-3ds.png'
import archiveImage from './assets/archive.png'
import radioImage from './assets/connected-sounds.JPG'
import gestImage from './assets/gesttfx.JPG'
import esCV from '../pdf/DavidAbejonHeras_CV.pdf'
import enCV from '../pdf/DavidAbejonHeras_EN_CV.pdf'
import translation from './language'
import { Experience } from './components/Experience'
import { Tag } from './components/Tag'
import Project from './components/Project'
import './App.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

const projects = [
  { id: 'spotify3ds', image: spotifyImage, tags: [['c', 'C'], ['devkitpro', 'devkitPro'], ['python', 'Python']], repositoryURL: 'https://github.com/davidabejon/spotify-3ds' },
  { id: 'archive', image: archiveImage, tags: [['react', 'React'], ['js', 'JavaScript'], ['tailwind', 'Tailwind CSS'], ['graphql', 'GraphQL']], repositoryURL: 'https://github.com/davidabejon/archive', liveDemoURL: 'https://archive.davidabejon.cv/' },
  { id: 'connectedSounds', image: radioImage, tags: [['react', 'React'], ['js', 'JavaScript'], ['threejs', 'Three.js'], ['r3f', 'React Three Fiber'], ['css', 'CSS']], repositoryURL: 'https://github.com/davidabejon/connected-sounds', liveDemoURL: 'https://radio.davidabejon.cv/' },
  { id: 'gesttfx', image: gestImage, tags: [['react', 'React'], ['css', 'CSS'], ['javaservlets', 'Java Servlets'], ['mariadb', 'MariaDB']], liveDemoURL: 'https://gestiontfx.uah.es/GestTFx/' },
]
const companies = ['Universidad de Alcalá', 'Universidad de Alcalá', 'Carrefour', 'Insurea Technologies']
const sections = ['experience', 'projects', 'contact']
const email = 'davidabejonheras@gmail.com'

function readLanguage() {
  return new URLSearchParams(window.location.search).get('language') === 'en' ? 'en' : 'es'
}

function App() {
  const [language, setLanguage] = useState(readLanguage)
  const [activeSection, setActiveSection] = useState('')
  const [copyStatus, setCopyStatus] = useState('idle')
  const [cvOpen, setCvOpen] = useState(false)
  const [pdfWidth, setPdfWidth] = useState(300)
  const [pdfError, setPdfError] = useState(false)
  const typedElement = useRef(null)
  const dialogRef = useRef(null)
  const pdfContainer = useRef(null)
  const copyTimer = useRef(null)
  const contactPanel = useRef(null)
  const emailElement = useRef(null)
  const ui = Object.fromEntries(Object.entries(translation.ui).map(([key, value]) => [key, value[language]]))
  const cv = language === 'es' ? esCV : enCV

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('language', language)
    window.history.replaceState(null, '', url)
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const syncLanguage = () => setLanguage(readLanguage())
    window.addEventListener('popstate', syncLanguage)
    return () => window.removeEventListener('popstate', syncLanguage)
  }, [])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let typed
    function updateAnimation() {
      typed?.destroy()
      if (preference.matches) {
        typedElement.current.textContent = translation.ui.roles[language][0]
      } else {
        typed = new Typed(typedElement.current, {
          strings: translation.ui.roles[language],
          typeSpeed: 45,
          backSpeed: 25,
          backDelay: 1800,
          loop: true,
        })
      }
    }
    updateAnimation()
    preference.addEventListener('change', updateAnimation)
    return () => {
      typed?.destroy()
      preference.removeEventListener('change', updateAnimation)
    }
  }, [language])

  useEffect(() => {
    const updateSection = () => {
      const current = sections.filter(id => document.getElementById(id).getBoundingClientRect().top <= 180).at(-1)
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      setActiveSection(atBottom ? 'contact' : current || '')
    }
    updateSection()
    window.addEventListener('scroll', updateSection, { passive: true })
    window.addEventListener('resize', updateSection)
    return () => {
      window.removeEventListener('scroll', updateSection)
      window.removeEventListener('resize', updateSection)
    }
  }, [])

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let typed
    let started = false
    function showEmail() {
      typed?.destroy()
      emailElement.current.textContent = email
    }
    function updatePreference() {
      if (preference.matches) showEmail()
    }
    if (preference.matches) showEmail()
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return
      started = true
      observer.disconnect()
      if (preference.matches) {
        showEmail()
      } else {
        typed = new Typed(emailElement.current, {
          strings: [email.replace('abejon', '^350abejon').replace('@', '^500@').replace('.', '^250.')],
          typeSpeed: 48,
          startDelay: 250,
          cursorChar: '▌',
          onComplete: instance => { instance.cursor?.remove() },
        })
      }
    }, { threshold: 0.35 })
    observer.observe(contactPanel.current)
    preference.addEventListener('change', updatePreference)
    return () => {
      observer.disconnect()
      typed?.destroy()
      preference.removeEventListener('change', updatePreference)
    }
  }, [])

  useEffect(() => {
    if (!cvOpen) return
    dialogRef.current.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const observer = new ResizeObserver(([entry]) => setPdfWidth(Math.floor(entry.contentRect.width)))
    observer.observe(pdfContainer.current)
    return () => {
      observer.disconnect()
      document.body.style.overflow = previousOverflow
    }
  }, [cvOpen])

  function changeLanguage() {
    const nextLanguage = language === 'es' ? 'en' : 'es'
    const url = new URL(window.location.href)
    url.searchParams.set('language', nextLanguage)
    window.history.pushState(null, '', url)
    setLanguage(nextLanguage)
  }

  async function copyEmail() {
    clearTimeout(copyTimer.current)
    try {
      await navigator.clipboard.writeText(email)
      setCopyStatus('copied')
      copyTimer.current = setTimeout(() => setCopyStatus('idle'), 2500)
    } catch (error) {
      console.error('Could not copy the email address.', error)
      setCopyStatus('error')
    }
  }

  function closeCV() {
    dialogRef.current.close()
    setCvOpen(false)
  }

  return (
    <>
      <a className="skip-link" href="#main">{ui.skip}</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label={ui.home}>
            <IoCodeSlashOutline aria-hidden="true" /><span>David<span className="brand-accent">.</span></span>
          </a>
          <nav aria-label={ui.navigation}>
            {sections.map(id => (
              <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>
                {translation.titles[id][language]}
              </a>
            ))}
          </nav>
          <button className="language-button" onClick={changeLanguage} aria-label={translation.elementDescriptions.changeLanguage[language]}>
            <MdLanguage aria-hidden="true" /><span>{language.toUpperCase()}</span><span className="language-alternative">/ {language === 'es' ? 'EN' : 'ES'}</span>
          </button>
        </div>
      </header>

      <main className="app" id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow"><span className="status-dot" />{ui.heroLabel}</p>
            <h1 id="hero-title">David Abejón<span className="title-dot">.</span></h1>
            <div className="type-wrap">
              <span className="sr-only">{translation.ui.roles[language][0]}</span>
              <span aria-hidden="true"><span ref={typedElement} /></span>
            </div>
            <p className="hero-intro">{ui.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">{ui.viewProjects}<IoArrowForward aria-hidden="true" /></a>
              <button className="button button-secondary" onClick={() => { setPdfError(false); setCvOpen(true) }}><FaRegFilePdf aria-hidden="true" />{ui.viewCV}</button>
              <a className="hero-contact" href="#contact">{translation.titles.contact[language]}<IoArrowForward aria-hidden="true" /></a>
            </div>
          </div>
          <div className="portrait-frame">
            <img className="photo" src={photo} alt={ui.portrait} width="240" height="280" />
            {/* <span className="portrait-caption">TODO: think about what to say here</span> */}
          </div>
          <a className="hero-scroll eyebrow" href="#experience"><span>↓</span>{ui.explore}</a>
        </section>

        <section className="content-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading"><p className="eyebrow">01 / {ui.journey}</p><h2 id="experience-title">{translation.titles.experience[language]}</h2><p>{ui.experienceIntro}</p></div>
          <div className="timeline">
            {translation.experience.map((item, index) => ({ ...item, company: companies[index] })).reverse().map((item, index) => (
              <Experience key={`${item.company}-${item.dateRange.en}`} title={item.title[language]} date={item.dateRange[language]} description={item.descr[language]} logo={item.logo} company={item.company} current={index === 0} currentLabel={ui.current} />
            ))}
          </div>
        </section>

        <section className="content-section" id="projects" aria-labelledby="projects-title">
          <div className="section-heading"><p className="eyebrow">02 / {ui.selectedWork}</p><h2 id="projects-title">{translation.titles.projects[language]}</h2><p>{ui.projectsIntro}</p></div>
          <div className="project-list">
            {projects.map((project, index) => (
              <Project key={project.id} {...project} number={String(index + 1).padStart(2, '0')} title={translation.projects[project.id].title[language]} description={translation.projects[project.id].descr[language]} tags={project.tags.map(([type, text]) => <Tag key={type} type={type} text={text} />)} repository={translation.buttons.repository[language]} liveDemo={translation.buttons.liveDemo[language]} language={language} />
            ))}
          </div>
        </section>

        <section className="content-section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-heading"><p className="eyebrow">03 / {ui.connect}</p><h2 id="contact-title">{translation.titles.contact[language]}</h2><p>{ui.contactIntro}</p></div>
          <div className="contact-panel" ref={contactPanel}>
            <div className="terminal-bar" aria-hidden="true"><IoTerminalOutline /><span>david@portfolio:~</span><span className="terminal-path">~/contact</span></div>
            <div className="email-block">
              <span className="eyebrow" id="email-label">EMAIL</span>
              <div className="email">
                <span className="terminal-prompt" aria-hidden="true">&gt;</span>
                <span className="terminal-address" aria-labelledby="email-label"><span className="sr-only">{email}</span><span aria-hidden="true"><span ref={emailElement} /></span></span>
                <button className="icon-button" onClick={copyEmail} aria-label={translation.elementDescriptions.copy[language]} title={translation.elementDescriptions.copy[language]}>{copyStatus === 'copied' ? <FaCheck aria-hidden="true" /> : <FaRegCopy aria-hidden="true" />}</button>
                <a className="icon-button" href={`mailto:${email}`} aria-label={translation.elementDescriptions.send[language]} title={translation.elementDescriptions.send[language]}><IoSend aria-hidden="true" /></a>
              </div>
              <p className={`copy-feedback ${copyStatus !== 'idle' ? 'is-visible' : ''} ${copyStatus === 'error' ? 'is-error' : ''}`} role="status"><span>{copyStatus === 'copied' ? ui.copied : copyStatus === 'error' ? ui.copyError : ''}</span></p>
            </div>
            <div className="social-links">
              <a className="button button-secondary" href="https://github.com/davidabejon" target="_blank" rel="noreferrer"><LuGithub aria-hidden="true" />GitHub<IoArrowForward aria-hidden="true" /></a>
              <a className="button button-secondary" href={`https://www.linkedin.com/in/davidabejonheras/${language === 'en' ? '?locale=en_US' : ''}`} target="_blank" rel="noreferrer"><AiOutlineLinkedin aria-hidden="true" />LinkedIn<IoArrowForward aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>David Abejón © {new Date().getFullYear()}</span>
        <a href="https://github.com/davidabejon/portfolio" target="_blank" rel="noreferrer"><LuGithub aria-hidden="true" />{translation.buttons.repository[language]}<IoArrowForward aria-hidden="true" /></a>
        <a href="#home">{ui.backTop} ↑</a>
      </footer>

      <dialog className="cv-dialog" ref={dialogRef} aria-labelledby="cv-title" onCancel={event => { event.preventDefault(); closeCV() }} onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); closeCV() } }} onClose={() => setCvOpen(false)}>
        <div className="cv-toolbar">
          <h2 id="cv-title">Curriculum Vitae</h2>
          <a className="icon-button" href={cv} download aria-label={translation.elementDescriptions.download[language]}><IoMdDownload aria-hidden="true" /></a>
          <button className="icon-button" onClick={closeCV} aria-label={translation.buttons.close[language]}><IoClose aria-hidden="true" /></button>
        </div>
        <div className="pdf-container" ref={pdfContainer}>
          {cvOpen && <Document file={cv} loading={<p className="pdf-message">{ui.loadingCV}</p>} error={<p className="pdf-message" role="alert">{ui.cvError}</p>} onLoadError={error => { console.error('Could not load the CV.', error); setPdfError(true) }}>
            {!pdfError && <Page pageNumber={1} width={pdfWidth} loading={<p className="pdf-message">{ui.loadingCV}</p>} error={<p className="pdf-message" role="alert">{ui.cvError}</p>} onRenderError={error => console.error('Could not render the CV.', error)} />}
          </Document>}
        </div>
        <div className="cv-footer"><a className="button button-primary" href={cv} download><IoMdDownload aria-hidden="true" />{translation.elementDescriptions.download[language]}</a><button className="button button-secondary" onClick={closeCV}>{translation.buttons.close[language]}</button></div>
      </dialog>
    </>
  )
}

export default App
