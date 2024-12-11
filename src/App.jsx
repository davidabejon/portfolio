// hooks
import { useEffect, useRef, useState } from 'react'

// css files
import './App.css'

// resources
import photo from './assets/foto_traje.jpg'
import esFlag from './assets/spain_round_icon_64.png'
import usFlag from './assets/united_states_of_america_round_icon_64.png'
import uahLogo from './assets/uah.png'
import esCV from '../pdf/DavidAbejonHeras_CV.pdf'
import enCV from '../pdf/DavidAbejonHeras_EN_CV.pdf'

// icons
import { IoCodeSlashOutline } from "react-icons/io5"
import { IoAtSharp } from "react-icons/io5"
import { LuGithub } from "react-icons/lu"
import { AiOutlineLinkedin } from "react-icons/ai"
import { IoSend } from "react-icons/io5"
import { FaRegCopy } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { IoHammerOutline } from "react-icons/io5";
import { MdLanguage } from "react-icons/md"
import { MdOutlineWorkOutline } from "react-icons/md"
import { IoMdDownload } from "react-icons/io"
import { FaRegFilePdf } from "react-icons/fa6"
import { TbBrandGithubFilled } from "react-icons/tb"
import { HiOutlineExternalLink } from "react-icons/hi"
import { AiOutlineGithub } from "react-icons/ai"

// react-pdf
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { pdfjs } from 'react-pdf'

// react-pdf workers config
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

// flicking
import Flicking from "@egjs/react-flicking"
import "@egjs/react-flicking/dist/flicking.css"
import { AutoPlay } from "@egjs/flicking-plugins"
import translation from './language'
const plugins = [new AutoPlay({ duration: '3000' })]

// language url parameter support
import qs from "qs";
import { createBrowserHistory } from "history";

// type animation
import Typed from 'typed.js'
import { Experience } from './components/Experience'
import { Tag } from './components/Tag'
import Project from './components/Project'

function App() {

  const [language, setLanguage] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const email = "davidabejonheras@gmail.com"

  const history = createBrowserHistory()

  // Create reference to store the DOM element containing the animation
  const el = useRef(null);
  // Create reference to store the Typed instance itself
  const typed = useRef(null);

  // refs to scroll to on navtop click
  const contactRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);

  const changeLanguage = () => {
    if (language == 'es') {
      setLanguage('en');
      history.push(`?language=en`)
    }
    else {
      setLanguage('es');
      history.push(`?language=es`)
    }
  }

  const copyEmail = (e) => {
    navigator.clipboard.writeText(email);
    document.getElementById('copy-icon-wrapper').classList.remove('show')
    document.getElementById('copy-icon-wrapper').classList.add('hide')
    setTimeout(() => {
      setEmailCopied(true);
      document.getElementById('copy-icon-wrapper').classList.remove('hide')
      document.getElementById('copy-icon-wrapper').classList.add('show')
    }, 200);
    setTimeout(() => {
      document.getElementById('copy-icon-wrapper').classList.remove('show')
      document.getElementById('copy-icon-wrapper').classList.add('hide')
      setTimeout(() => {
        setEmailCopied(false);
        document.getElementById('copy-icon-wrapper').classList.remove('hide')
        document.getElementById('copy-icon-wrapper').classList.add('show')
      }, 200);
    }, 2000);
  }

  // scroll view to referenced element
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop - document.getElementById('nav-top').offsetHeight - 10)

  // recover language state on page reload
  useEffect(() => {
    const filterParams = history.location.search.substring(1);
    const filtersFromParams = qs.parse(filterParams);
    if (filtersFromParams.language) {
      setLanguage(filtersFromParams.language);
    }
    else {
      setLanguage('es')
      history.push('?language=es')
    }
  }, [])

  useEffect(() => {
    if (language == 'es') {
      var strings = [
        "Desarrollador Front-End^1500",
        "Estudiante de Ingeniería Informática^1500"
      ]
    }
    else {
      var strings = [
        "Front-End Developer^1500",
        "Informatics Engineering student^1500"
      ]
    }

    var options = {
      strings,
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    }
  }, [language])

  return (
    <>
      <div className='bg'></div>
      <div className='language'>
        <button onClick={changeLanguage} title={translation.elementDescriptions.changeLanguage[language]}>
          {
            window.innerWidth > 480 ?
              <MdLanguage color='white' size="2rem" />
              : ''
          }
          {
            language == 'es' ?
              <img className='flag' src={esFlag}></img>
              :
              <img className='flag' src={usFlag}></img>
          }
        </button>
      </div>
      {
        window.innerWidth > 480 ?
          <div className='logo' onClick={() => window.scrollTo(0, 0)}>
            <Flicking circular={true} horizontal={false} plugins={plugins}>
              {
                Array.from({ length: 10 }, (_, i) => i).map(i => (
                  <p key={i}>David Abejón</p>
                ))
              }
            </Flicking>
          </div>
          : ''
      }
      <div className='nav-top' id='nav-top'>
        <button onClick={() => scrollToRef(contactRef)}>{translation.titles.contact[language]}</button>
        <button onClick={() => scrollToRef(experienceRef)}>{translation.titles.experience[language]}</button>
        <button onClick={() => scrollToRef(projectsRef)}>{translation.titles.projects[language]}</button>
      </div>
      <div className='app container'>

        <div className='about-me mb-4'>
          <img className='photo' src={photo}></img>
          <div className='d-flex align-items-center gap-2 mb-2'>
            <IoCodeSlashOutline color='white' size="3rem" />
            <h1>David Abejón</h1>
          </div>
          <div className="type-wrap">
            <span className='type-animation' ref={el} />
          </div>
          <p>{translation.about.phrase1[language]} <a className='web-link' href='https://uah.es'>Universidad de Alcalá de Henares</a>. {translation.about.phrase2[language]}</p>
        </div>

        {
          window.innerWidth > 480 ?
            <button
              className='link d-flex gap-2 align-items-center mb-5'
              data-bs-toggle="modal"
              data-bs-target="#pdfModal"
            >
              <FaRegFilePdf color='white' size='2.5rem' />
              <h4>Curriculum Vitae</h4>
            </button>
            :
            <a href={language == 'es' ? esCV : enCV} download className='link d-flex gap-2 align-items-center mb-5'>
              <FaRegFilePdf color='white' size='2.5rem' />
              <h4>Curriculum Vitae</h4>
            </a>
        }

        <div className='contact mb-5 d-flex flex-column gap-3' ref={contactRef}>
          <div className='d-flex align-items-center gap-2 mb-2'>
            <IoAtSharp color='white' size="3rem" />
            <h1>{translation.titles.contact[language]}</h1>
          </div>

          <div className='links'>
            <a className='link' href='https://github.com/davidabejon' target='_blank'>
              <LuGithub color='white' size="1.5rem" />
              <h4 className='m-0'>GitHub</h4>
            </a>
            <a className='link' href={language == 'es' ? 'https://www.linkedin.com/in/davidabejonheras/' : 'https://www.linkedin.com/in/davidabejonheras/?locale=en_US'} target='_blank'>
              <AiOutlineLinkedin color='white' size="1.5rem" />
              <h4 className='m-0'>Linkedin</h4>
            </a>
          </div>

          <div className='email'>
            <input className='email-input' readOnly value={email}></input>
            <button
              type='button'
              className='copy-button d-flex align-items-center'
              title={translation.elementDescriptions.copy[language]}
              onClick={copyEmail}>
              <div id='copy-icon-wrapper' style={{ transform: 'translateY(-3px)' }}>
                {
                  emailCopied ?
                    <FaCheck color='white' size="1.25rem" />
                    :
                    <FaRegCopy color='white' size="1.25rem" />
                }
              </div>
            </button>
            <a href={'mailto:' + email} className='send-button d-flex align-items-center' title={translation.elementDescriptions.send[language]}>
              <IoSend color='white' size="1.25rem" />
            </a>
          </div>

        </div>

        <div className='experience mb-5' ref={experienceRef}>
          <div className='d-flex align-items-center gap-2 mb-4'>
            <MdOutlineWorkOutline color='white' size="3rem" />
            <h1>{translation.titles.experience[language]}</h1>
          </div>
          <Experience
            className='experience-role'
            title={translation.experience.role1.title[language]}
            date={translation.experience.role1.dateRange[language]}
            description={translation.experience.role1.descr[language]}
            logo={uahLogo}
          />
          <hr></hr>
          <Experience
            className='experience-role'
            title={translation.experience.role2.title[language]}
            date={translation.experience.role2.dateRange[language]}
            description={<>{translation.experience.role2.descr[language]} <a className='web-link' href='https://www.linkedin.com/in/davidabejonheras/overlay/1635548535763/single-media-viewer/?profileId=ACoAADvqQIYBq4sXvOYS1vNYzvMQcLrvhTrm4W0' target='_blank'>COMPDES2023</a>.</>}
            logo={uahLogo}
          />
        </div>

        <div className='projects pb-5 d-flex flex-column gap-5' ref={projectsRef}>
          <div className='d-flex align-items-center gap-2 mb-2'>
            <IoHammerOutline color='white' size="3rem" />
            <h1>{translation.titles.projects[language]}</h1>
          </div>

          <Project
            className='connected-sounds'
            title={translation.projects.connectedSounds.title[language]}
            description={translation.projects.connectedSounds.descr[language]}
            tags={[
              <Tag type='react' text='React' />,
              <Tag type='js' text='JavaScript' />,
              <Tag type='css' text='CSS' />
            ]}
            repository={translation.buttons.repository[language]}
            repositoryURL='https://github.com/davidabejon/connected-sounds'
            liveDemo={translation.buttons.liveDemo[language]}
            liveDemoURL='https://radio.davidabejon.cv/'
          />

          <Project
            className='gesttfx'
            title={translation.projects.gesttfx.title[language]}
            description={translation.projects.gesttfx.descr[language]}
            tags={[
              <Tag type='react' text='React' />,
              <Tag type='css' text='CSS' />,
              <Tag type='javaservlets' text='Java Servlets' />,
              <Tag type='mariadb' text='MariaDB' />,
            ]}
            repository={translation.buttons.repository[language]}
            repositoryDisabled
            liveDemo={translation.buttons.liveDemo[language]}
            liveDemoURL="https://gestiontfx.uah.es/GestTFx/"
            language={language}
            />

          <Project
            className='evah'
            title={translation.projects.evah.title[language]}
            description={translation.projects.evah.descr[language]}
            tags={[
              <Tag type='react' text='React' />,
              <Tag type='js' text='JavaScript' />,
              <Tag type='css' text='CSS' />,
              <Tag type='javaservlets' text='Java Servlets' />,
            ]}
            repository={translation.buttons.repository[language]}
            repositoryDisabled
            liveDemo={translation.buttons.liveDemo[language]}
            liveDemoDisabled
            language={language}
          />

        </div>

      </div>

      <footer>
        <a href='https://github.com/davidabejon/portfolio' className='source-code-footer web-link' target='_blank'><AiOutlineGithub color='white' size="1.2rem" className='mx-1' />{translation.buttons.repository[language]}</a>
        <div>David Abejón, 2024</div>
      </footer>

      {/* CV PDF Modal */}
      <div className="modal fade" tabIndex="-1" id='pdfModal' aria-labelledby='pdfModalLabel' aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div className='d-flex' style={{ justifyContent: 'flex-end' }}>
                <a href={language == 'es' ? esCV : enCV} download title={translation.elementDescriptions.download[language]}>
                  <IoMdDownload color='black' size='2.5rem' />
                </a>
              </div>
              <div className='d-flex justify-content-center'>
                <Document file={language == 'es' ? esCV : enCV} className="pdf">
                  <Page pageNumber={1} className="pdf" />
                </Document>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{translation.buttons.close[language]}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
