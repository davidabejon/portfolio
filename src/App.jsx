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
  'pdfjs-dist/build/pdf.worker.min.js',
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
          <div className='experience-role d-flex gap-sm-5 flex-wrap flex-sm-nowrap aling-items-center'>
            <div className='d-flex flex-column'>
              <h5>{translation.experience.role1.title[language]}</h5>
              <p className='mb-2'>{translation.experience.role1.dateRange[language]}</p>
              <p>{translation.experience.role1.descr[language]}</p>
            </div>
            <img className='uah-logo' height={100} src={uahLogo}></img>
          </div>
          <hr></hr>
          <div className='experience-role d-flex mt-4 gap-sm-5 flex-wrap flex-sm-nowrap'>
            <div className='d-flex flex-column'>
              <h5>{translation.experience.role2.title[language]}</h5>
              <p className='mb-2'>{translation.experience.role2.dateRange[language]}</p>
              <p>{translation.experience.role2.descr[language]} <a className='web-link' href='https://www.linkedin.com/in/davidabejonheras/overlay/1635548535763/single-media-viewer/?profileId=ACoAADvqQIYBq4sXvOYS1vNYzvMQcLrvhTrm4W0' target='_blank'>COMPDES2023</a>.</p>
            </div>
            <img className='uah-logo' height={100} src={uahLogo}></img>
          </div>
        </div>

        <div className='projects pb-5 d-flex flex-column gap-5' ref={projectsRef}>
          <div className='d-flex align-items-center gap-2 mb-2'>
            <IoHammerOutline color='white' size="3rem" />
            <h1>{translation.titles.projects[language]}</h1>
          </div>

          <div className='connected-sounds d-flex gap-sm-5 flex-wrap flex-sm-nowrap'>
            <div className='connected-sounds-content d-flex flex-column justify-content-center'>
              <h4>{translation.projects.connectedSounds.title[language]}</h4>
              <hr className='project-separator'></hr>
              <div className='d-flex gap-3 flex-wrap mb-2'>
                <span className='tag tag-react'>React</span>
                <span className='tag tag-js'>JavaScript</span>
                <span className='tag tag-css'>CSS</span>
              </div>
              <p>{translation.projects.connectedSounds.descr[language]}</p>
              <div className='project-buttons d-flex gap-3'>
                <a target='_blank' href='https://github.com/davidabejon/connected-sounds' className='project-button d-flex align-items-center gap-1'>{translation.buttons.repository[language]}<TbBrandGithubFilled /></a>
                <a target='_blank' href='http://143.47.48.170:5173/' className='project-button d-flex align-items-center gap-1'>{translation.buttons.liveDemo[language]}<HiOutlineExternalLink /></a>
              </div>
            </div>
          </div>

          <div className='weather-app d-flex gap-sm-5 flex-wrap flex-sm-nowrap'>
            <div className='weather-app-content d-flex flex-column justify-content-center'>
              <h4>{translation.projects.weatherApp.title[language]}</h4>
              <hr className='project-separator'></hr>
              <div className='d-flex gap-3 flex-wrap mb-2'>
                <span className='tag tag-react'>React</span>
                <span className='tag tag-js'>JavaScript</span>
                <span className='tag tag-css'>CSS</span>
                <span className='tag tag-apirest'>RESTful API</span>
              </div>
              <p>{translation.projects.weatherApp.descr[language]}</p>
              <div className='project-buttons d-flex gap-3'>
                <a target='_blank' href='https://github.com/davidabejon/react-weather-app-v2' className='project-button d-flex align-items-center gap-1'>{translation.buttons.repository[language]}<TbBrandGithubFilled /></a>
                <a target='_blank' href='https://davidabejon.github.io/react-weather-app-v2/' className='project-button d-flex align-items-center gap-1'>{translation.buttons.liveDemo[language]}<HiOutlineExternalLink /></a>
              </div>
            </div>
          </div>

          <div className='front-end-store d-flex mt-4 gap-sm-5 flex-wrap flex-sm-nowrap'>
            <div className='front-end-store-content d-flex flex-column justify-content-center'>
              <h4>{translation.projects.frontEndStore.title[language]}</h4>
              <hr className='project-separator'></hr>
              <div className='d-flex gap-3 flex-wrap mb-2'>
                <span className='tag tag-html'>HTML</span>
                <span className='tag tag-css'>CSS</span>
                <span className='tag tag-js'>JavaScript</span>
              </div>
              <p>{translation.projects.frontEndStore.descr[language]}</p>
              <div className='project-buttons d-flex gap-3'>
                <a target='_blank' href='https://github.com/davidabejon/FrontEnd-Store' className='project-button d-flex align-items-center gap-1'>{translation.buttons.repository[language]}<TbBrandGithubFilled /></a>
                <a target='_blank' href='https://davidabejon.github.io/FrontEnd-Store/' className='project-button d-flex align-items-center gap-1'>{translation.buttons.liveDemo[language]}<HiOutlineExternalLink /></a>
              </div>
            </div>
          </div>

          <div className='blogdecafe d-flex mt-4 gap-sm-5 flex-wrap flex-sm-nowrap'>
            <div className='blogdecafe-content d-flex flex-column justify-content-center'>
              <h4>{translation.projects.blogDeCafe.title[language]}</h4>
              <hr className='project-separator'></hr>
              <div className='d-flex gap-3 flex-wrap mb-2'>
                <span className='tag tag-html'>HTML</span>
                <span className='tag tag-css'>CSS</span>
              </div>
              <p>{translation.projects.blogDeCafe.descr[language]}</p>
              <div className='project-buttons d-flex gap-3'>
                <a target='_blank' href='https://github.com/davidabejon/BlogDeCafe' className='project-button d-flex align-items-center gap-1'>{translation.buttons.repository[language]}<TbBrandGithubFilled /></a>
                <a target='_blank' href='https://davidabejon.github.io/BlogDeCafe/' className='project-button d-flex align-items-center gap-1'>{translation.buttons.liveDemo[language]}<HiOutlineExternalLink /></a>
              </div>
            </div>
          </div>
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
