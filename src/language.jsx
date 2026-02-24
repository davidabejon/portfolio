import uahLogo from './assets/uah.png'
import carrefourLogo from './assets/carrefour_logo.jpg'
import insureaLogo from './assets/insureatechnologies_logo.jpg'
const translation = {
    titles: {
        about: { es: 'Sobre mí', en: 'About' },
        contact: { es: 'Contacto', en: 'Contact' },
        experience: { es: 'Experiencia', en: 'Experience' },
        projects: { es: 'Proyectos', en: 'Projects' }
    },
    about: {
        phrase1: {
            es: '¡Hola! Soy David y soy recién graduado ingeniero informático por la Universidad de Alcalá. Siempre me he sentido atraído por el desarrollo web y tengo experiencia con frameworks y tecnologías como React.js, Vue.js, Java Servlets, MySQL entre muchas otras. En mi carrera me he centrado más en el desarrollo Front End, pero tanto en proyectos personales como en mis últimos puestos de trabajo he trabajdo también en el Back End con Go, Springboot y Java Servlets. Me mantengo siempre al día y trabajo integrando la IA en mi rutina de trabajo, basada en metodologías ágiles y SCRUM.',
            en: "Hi! I'm David, a recent Computer Engineering graduate from the University of Alcalá with a strong interest in web development and experience in technologies like React.js, Vue.js, Java Servlets, and MySQL; while I’ve focused mainly on Front-End, I’ve also worked on the Back-End in personal and professional projects, staying up to date and integrating AI into my agile, SCRUM-based workflow."
        }
    },
    experience: [
        {
            title: { es: 'Colaborador en Proyectos de Investigación', en: 'Collaborator on research projects' },
            dateRange: { es: 'Julio 2023 - Septiembre 2023', en: 'July 2023 - September 2023' },
            descr: {
                es: <p>Colaborador en proyectos de investigación de desarrollo web fullstack y ponencias en congresos como <a className='web-link' href='https://www.linkedin.com/in/davidabejonheras/overlay/1635548535763/single-media-viewer/?profileId=ACoAADvqQIYBq4sXvOYS1vNYzvMQcLrvhTrm4W0' target='_blank'>COMPDES2023</a>.</p>,
                en: <p>Collaborator in fullstack web research projects and lectures at congresses such as <a className='web-link' href='https://www.linkedin.com/in/davidabejonheras/overlay/1635548535763/single-media-viewer/?profileId=ACoAADvqQIYBq4sXvOYS1vNYzvMQcLrvhTrm4W0' target='_blank'>COMPDES2023</a>.</p>
            },
            logo: uahLogo
        },
        {
            title: { es: 'Becario Universidad de Alcalá', en: 'Intern at Universidad de Alcalá' },
            dateRange: { es: 'Octubre 2023 - Enero 2025', en: 'October 2023 - January 2025' },
            descr: {
                es: 'Becario para la Universidad de Alcalá de Henares en “Evolución guiada por datos en desarrollos de SW industriales”, realizando proyectos de desarrollo web y móvil fullstack.',
                en: 'Intern for Universidad de Alcalá in "Data-driven evolution in industrial SW developments", developing fullstack web and mobile applications.'
            },
            logo: uahLogo
        },
        {
            title: { es: 'Beca E-Commerce Microservicios Mark IT', en: 'Micro Service and E-Commerce Developer Internship' },
            dateRange: { es: 'Febrero 2025 - Agosto 2025', en: 'February 2025 - August 2025' },
            descr: {
                es:
                    <p>
                        - Mejora continua, desarrollo de proyectos y ejecución de tareas asignadas en Go y Vue.js.<br />
                        - Organización de tareas en JIRA según la priorización del Product Owner, siguiendo metodologías agile.<br />
                        - Aseguramiento del cumplimiento de los estándares de calidad y metodología de despliegue de código (gitflow).
                    </p>,
                en:
                    <p>
                        - Continuous improvement, project development and microservice development written in Go and Vue.js<br />
                        - Task organization with JIRA, following agile methodologies<br />
                        - Software quality control and gitflow workflow standards.
                    </p>,
            },
            logo: carrefourLogo
        },
        {
            title: { es: 'Desarrollador Front-End', en: 'Front-End Developer' },
            dateRange: { es: 'Octubre 2025 - Actualidad', en: 'October 2025 - Present' },
            descr: {
                es:
                    <p>
                        - Desarrollo y mantenimiento de interfaces de usuario utilizando React.js y Next.js.<br />
                        - Automatización de procesos e integración entre compañías del mundo de los seguros.<br />
                        - Calidad de código y revisiones siguiendo metodologías ágiles y SCRUM.
                    </p>,
                en:
                    <p>
                        - Development and maintenance of user interfaces using React.js and Next.js.<br />
                        - Process automation and integration between insurance companies.<br />
                        - Code quality and reviews following agile methodologies and SCRUM.
                    </p>
            },
            logo: insureaLogo
        },
    ],
    projects: {
        spotify3ds: {
            title: { es: 'Spotify 3DS', en: 'Spotify 3DS' },
            descr: {
                es: 'Spotify 3DS es una aplicación nativa para la familiar de consolas Nintendo 3DS desarrollada con el kit de desarrollo de código abierto devkitPro. Permite el control remoto de la sesión de reproducción de un usuario de Spotify a través de una interfaz adaptada a las características de la consola.',
                en: 'Spotify 3DS is a native application for the Nintendo 3DS console developed with the open-source development kit devkitPro. It allows remote control of a user\'s Spotify playback session through an interface adapted to the console\'s features.'
            }
        },
        archive: {
            title: { es: 'Archive', en: 'Archive' },
            descr: {
                es: 'Archive es una aplicación web que permite a los usuarios consultar datos históricos y actuales de animación japonesa a través de una interfaz intuitiva y moderna.',
                en: 'Archive is a web application that allows users to look up historical and current data about Japanese animation through an intuitive and modern interface.'
            }
        },
        connectedSounds: {
            title: { es: 'Connected Sounds', en: 'Connected Sounds' },
            descr: {
                es: 'Connected Sounds es una aplicación web que permite explorar emisoras de radio emitiendo en cualquier país del mundo a través de un visor web limpio y elegante.',
                en: 'Connected Sounds is a project that aims at building bridges between different cultures through the thousands of radio broadcasts being trasmitted all around the globe.'
            }
        },
        gesttfx: {
            title: { es: 'GestTFx', en: 'GestTFx' },
            descr: {
                es: 'Aplicación de gestión de trabajos de fin de grado y máster para la Escuela Politécnica Superior y otras varias facultades de la Universidad de Alcalá.',
                en: 'Final degree and master project management application for the Escuela Politécnica Superior and other faculties of the Universidad de Alcalá.'
            }
        },
        weatherApp: {
            title: { es: 'Webapp meteorológica', en: 'Weather webapp' },
            descr: {
                es: 'Aplicación web que muestra información meteorológica en ciudades españolas. Hecha con React en la parte de Front-End y con la API RESTful de el-tiempo.net y AEMET en el Back-End.',
                en: 'Web app that shows weather information at Spanish cities. Made with React on the Front-End and el-tiempo.net and AEMET\'s RESTful API on the Back-End.'
            }
        },
        frontEndStore: {
            title: { es: 'Front-End Store', en: 'Front-End Store' },
            descr: {
                es: 'Front-End de la página web de una tienda online de camisetas con temática de frameworks de Front-End. Hecha con HTML, CSS y JavaScript.',
                en: 'Mock-up project of a Front-End framework themed online shirts shop. Just the Front-End, made with plain HTML, CSS and JavaScript to help master these tools.'
            }
        },
        blogDeCafe: {
            title: { es: 'BlogDeCafé', en: 'BlogDeCafé' },
            descr: {
                es: 'Front-End de la página web de una cafetería, con varias páginas, hecha con HTML y CSS.',
                en: 'Mock-up project of a coffee shop webpage. An elegant yet practical user interface made with plain HTML and CSS.'
            }
        },
        evah: {
            title: { es: 'EVAH', en: 'EVAH' },
            descr: {
                es: 'Aplicación web de gestión de órdenes, partes de trabajo y pedidos para ENVAC Spain. Hecha con React y Jakarta Servlets.',
                en: 'Web application for managing orders, work orders and requests for ENVAC Spain. Made with React and Jakarta Servlets.'
            }
        }
    },
    buttons: {
        repository: { es: 'Repositorio', en: 'Repository' },
        liveDemo: { es: 'Ver proyecto', en: 'Live Demo' },
        close: { es: 'Cerrar', en: 'Close' },
        repositoryNotAvailable: { es: 'Al ser un proyecto privado, el repositorio no está disponible.', en: 'As this is a private project, the repository is not available.' },
        liveDemoNotAvailable: { es: 'Al ser un proyecto privado, la demostración no está disponible.', en: 'As this is a private project, the live demo is not available.' },
    },
    elementDescriptions: {
        changeLanguage: { es: 'Cambiar idioma', en: 'Change language' },
        copy: { es: 'Copiar', en: 'Copy' },
        send: { es: 'Enviar', en: 'Send' },
        download: { es: 'Descargar', en: 'Download' }
    }
}

export default translation