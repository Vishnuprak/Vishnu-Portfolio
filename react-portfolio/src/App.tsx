import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoon, faSun, faBars, faXmark, faDownload, faLocationDot, 
  faPhone, faEnvelope, faBriefcase, faGraduationCap, faDatabase, 
  faCode, faGears, faWrench, faPaperPlane, faCircleCheck, faCircleExclamation, 
  faArrowRight, faHeart, faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, faTwitter, faLinkedinIn, faGithub 
} from '@fortawesome/free-brands-svg-icons';
import './App.css';

// Types
interface ProjectDetailed {
  description: string;
  objectivesTitle?: string;
  objectivesText?: string;
  processTitle?: string;
  processText?: string;
  company?: string;
  role?: string;
  position?: string;
  timeline?: string;
  teamMembers?: string;
  institution?: string;
  completed?: string;
  demoVideo?: string;
}

interface Project {
  id: string;
  title: string;
  category: 'worked' | 'college';
  description: string;
  tech: string[];
  image: string;
  featured?: boolean;
  details: ProjectDetailed;
}

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  timeline: string;
  desc: string;
  tech?: string[];
  type: 'work' | 'intern';
}

export default function App() {
  // States
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'worked' | 'college'>('all');
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Theme Sync on Mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('color-theme');
    if (storedTheme === 'light' || (!storedTheme && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  };

  // Data
  const experiences: ExperienceItem[] = [
    {
      role: 'Full-Stack Developer (Development Executive)',
      company: "Jeff's Group of Companies",
      location: 'Bangalore, India',
      timeline: 'Mar 2026 - Present',
      desc: 'Developing an enterprise Sports ERP platform for managing athletes, coaches, team rosters, tournament brackets, and training metrics. Designing scalable workflow architectures, engineering RESTful APIs with Node.js and Express.js, and optimizing complex PostgreSQL queries.',
      tech: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'TypeScript', 'REST APIs'],
      type: 'work'
    },
    {
      role: 'Software Developer',
      company: 'Mazeworks solutions Pvt Ltd',
      location: 'Chennai, India',
      timeline: 'Jun 2024 - Feb 2026',
      desc: 'Engineered responsive, dynamic ERP layouts and analytics dashboards. Implemented core asset tracking logs, equipment inspections, and automated work orders within an Asset Management System utilizing Redux for centralized state management.',
      tech: ['React', 'TypeScript', 'Redux', 'Tailwind CSS', 'PrimeReact', 'MongoDB', 'Express.js'],
      type: 'work'
    },
    {
      role: 'Software Developer - Intern',
      company: 'Mazeworks solutions Pvt Ltd',
      location: 'Chennai, India',
      timeline: 'Feb 2024 - Jun 2024',
      desc: 'Gained hands-on experience with React core concepts, Git workflow patterns, and Agile/Scrum methodologies. Contributed to development sprint goals, assisted in debugging codebase errors, and refactored reusable UI components.',
      tech: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'Agile'],
      type: 'intern'
    }
  ];

  const projects: Project[] = [
    {
      id: 'sports-erp',
      title: 'Sports ERP Platform',
      category: 'worked',
      description: 'An enterprise-grade Sports ERP platform designed to coordinate and manage athletes, tournament calendars, coaching rosters, training schedules, and performance analytics.',
      tech: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
      featured: true,
      details: {
        description: 'Developed an end-to-end Sports ERP application designed to manage athletes, coaches, teams, tournament calendars, training schedules, and multi-dimensional performance metrics. The platform integrates responsive user portals with a secure administrative dashboard, processing high-volume databases and automating complex operational workflows.',
        objectivesTitle: 'Description & Objectives',
        objectivesText: 'The core objective is to deliver a unified, secure platform for sports organizations and complexes to schedule training programs, analyze athlete progress indicators, and streamline operational scheduling via dynamic analytical reporting.',
        processTitle: 'Process & Engineering',
        processText: 'Engineered a scalable backend API using Node.js, Express.js, and TypeScript, backed by an optimized PostgreSQL database. Designed relational schemas with index optimizations to ensure low-latency retrieval of performance analytics. Developed reusable frontend interfaces in React and integrated RESTful endpoints.',
        company: "Jeff's Group of Companies, Bangalore",
        position: 'Development Executive (Full Stack Developer)',
        timeline: 'Mar 2026 - Present'
      }
    },
    {
      id: 'asset-tracking',
      title: 'Asset Tracking System',
      category: 'worked',
      description: 'An enterprise asset management workspace designed to monitor equipment lifecycles, schedule routine inspections, and manage operational work orders.',
      tech: ['React', 'TypeScript', 'Redux', 'MongoDB', 'PrimeReact', 'Express.js'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      details: {
        description: 'Engineered a centralized web portal for real-time tracking of company hardware assets, automated scheduling of preventive maintenance inspections, and digital work order assignment. Utilizes fully responsive layouts and high-performance tabular interfaces.',
        objectivesTitle: 'Description',
        objectivesText: 'Streamline inspection workflows, automate status log updates, and export comprehensive diagnostic records for mechanical and electrical infrastructure assets.',
        processTitle: 'Engineering Process',
        processText: 'Developed structured forms, validation layers, and interactive tables using React and PrimeReact. Implemented Redux Toolkit for unified client state management. Designed a RESTful backend using Express.js and MongoDB to ingest and serve asset metrics with sub-second latency.',
        company: 'Mazeworks solutions Pvt Ltd, Chennai',
        timeline: 'Jun 2024 - Feb 2026'
      }
    },
    {
      id: 'erp-dashboards',
      title: 'ERP Dashboard Apps',
      category: 'worked',
      description: 'Designed and deployed dynamic analytics dashboards and automated reporting modules for enterprise resources planning, displaying live KPI metrics.',
      tech: ['React', 'Tailwind CSS', 'Chart.js', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      details: {
        description: 'Developed responsive and customizable dashboard layouts for various modules of enterprise resource planning (ERP) suites. These dashboards consolidate vital KPIs, interactive data visualizations, and detailed business intelligence reports.',
        objectivesTitle: 'Overview',
        objectivesText: 'Engineered custom widgets and charting containers to aggregate and render live operational metrics and financial ledgers, enhancing organizational decision-making.',
        company: 'Mazeworks solutions Pvt Ltd, Chennai',
        timeline: 'Jun 2024 - Feb 2026'
      }
    },
    {
      id: 'videototext',
      title: 'Video to Text Converter',
      category: 'college',
      description: 'Developed an automated desktop application in Python that extracts audio from video containers and runs speech recognition models to generate structured transcripts.',
      tech: ['Python', 'Speech Recognition APIs', 'Tkinter', 'FFmpeg'],
      image: '/img/portfolio/Video-to-text.jpeg',
      details: {
        description: 'Created an assistive utility designed to transcribe speech from various video and audio formats into searchable text files, facilitating media accessibility for hearing-impaired users and simplifying academic note-taking.',
        objectivesTitle: 'Objective',
        objectivesText: 'Deliver a reliable desktop client to programmatically strip audio from files, query speech-to-text models, and export timestamped, formatted transcripts.',
        processTitle: 'Process & System Architecture',
        processText: 'Programmed a Python application that uses subprocesses (e.g., FFmpeg) to extract audio tracks. Implemented speech-to-text processing using speech recognition libraries to transcribe spoken dialog into string buffers. Built a graphical user interface (GUI) using Tkinter to manage video uploads, conversion queues, and text output exports.',
        teamMembers: 'Vishnu Prakash D (Lead), Gopi GR, Gokulan M, Ravi Teja',
        institution: 'Kalasalingam Academy of Research and Education',
        completed: 'May 2023'
      }
    },
    {
      id: 'fingerprint',
      title: 'Fingerprint Door Lock',
      category: 'college',
      description: 'Engineered a biometric access control system combining Arduino microcontrollers, optical fingerprint sensors, and electrical relay switching for secure door locking.',
      tech: ['Arduino', 'C++ (Embedded)', 'Biometrics', 'IoT Hardware'],
      image: '/img/portfolio/FingerDoor-lock-System.jpeg',
      details: {
        description: 'Designed and assembled an IoT access control unit utilizing biometric authentication to replace physical key mechanisms, enhancing residential or office security.',
        objectivesTitle: 'Objective',
        objectivesText: 'Implement a secure embedded system capable of capturing, storing, and matching biometric fingerprint templates, sending output signals to trigger physical locks.',
        processTitle: 'Process & Engineering',
        processText: 'Interfaced an optical biometric scanner with an Arduino Uno over serial communications. Configured the microcontroller firmware in C++ to process scan packets, run verification algorithms against stored templates, and actuate a 12V relay module to power a solenoid latch upon successful identification.',
        demoVideo: '/img/FingerprintDoorLockSystem.mp4',
        teamMembers: 'Vishnu Prakash D (Lead), Gopi GR, Shakthi G, Vignesh C, Gangaiah',
        institution: 'Kalasalingam Academy of Research and Education',
        completed: 'Dec 2022'
      }
    },
    {
      id: 'figmafoodapp',
      title: "Vichu's Food App (UI/UX)",
      category: 'college',
      description: 'Designed user journeys and a high-fidelity prototype in Figma for an on-demand food ordering platform, refining checkout and shopping cart micro-interactions.',
      tech: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
      image: '/img/portfolio/Figma FoodApp.png',
      details: {
        description: 'Designed user journeys and a high-fidelity prototype in Figma for an on-demand food ordering platform, refining checkout and shopping cart micro-interactions.',
        objectivesTitle: 'Objective',
        objectivesText: 'Conducted competitor analyses, designed wireframes, established a cohesive typography and color design system, and mapped out smooth navigation transitions to create an interactive click-through prototype.',
        role: 'UI/UX Designer',
        completed: 'Dec 2023'
      }
    }
  ];

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill out all fields.');
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch('contact_process.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      });
      const result = await response.text();
      if (result.includes('Message has been sent')) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  const filteredProjects = projects.filter(
    proj => filter === 'all' || proj.category === filter
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen relative overflow-x-hidden transition-colors duration-300">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600 rounded-full glowing-orb opacity-5 dark:opacity-15"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600 rounded-full glowing-orb opacity-5 dark:opacity-15"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-emerald-600 rounded-full glowing-orb opacity-5 dark:opacity-15"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 glass-nav bg-white/80 dark:bg-slate-950/75 border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 py-4">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <span className="text-xl md:text-2xl font-extrabold tracking-wider text-[#004BA9] dark:text-blue-400 transition-colors">
              VISHNU PRAKASH
            </span>
          </a>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-8">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map(sec => (
                <a key={sec} href={`#${sec.toLowerCase()}`} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                  {sec}
                </a>
              ))}
            </nav>

            <button onClick={toggleTheme} className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg p-2 transition-colors">
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-xl" />
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-500 dark:text-slate-300 p-2">
              <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col gap-4">
            {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map(sec => (
              <a key={sec} onClick={() => setMobileMenuOpen(false)} href={`#${sec.toLowerCase()}`} className="text-slate-600 dark:text-slate-300 font-medium py-2 border-b border-slate-200 dark:border-slate-800/50">
                {sec}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <section id="home" className="min-h-screen flex items-center pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider text-sm">Hello</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
                I am <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 dark:from-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent">Vishnu Prakash</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300">Full-Stack Developer</h2>
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
                Passionate software developer with <strong className="text-indigo-600 dark:text-indigo-300">2.5+ years of experience</strong> crafting responsive frontend interfaces and optimized backend systems. Specializing in building scalable applications with <span className="text-slate-800 dark:text-slate-200 font-semibold">React.js, TypeScript, Node.js, MongoDB, and PostgreSQL</span>.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="#projects" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-indigo-600/35 transition-all">
                  View Projects
                </a>
                <a href="/Vishnu prakash D Resume (1).pdf" download className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold px-8 py-3.5 rounded-lg transition-all flex items-center justify-center">
                  Get CV <FontAwesomeIcon icon={faDownload} className="ml-2" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-800/80 shadow-2xl">
                <img className="w-full h-full object-cover" src="/img/banner/home-right.png" alt="Vishnu" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 dark:from-slate-950/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 border-t border-slate-200 dark:border-slate-900 bg-slate-100/40 dark:bg-slate-900/40 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-800">
                <img className="rounded-xl w-full max-w-sm object-cover" src="/img/about-us.png" alt="About" />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider text-xs">Biography</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Let’s Introduce Myself</h2>
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
                I am a dedicated Software Developer based in Srivilliputhur, Tamil Nadu, with a B.Tech in Information Technology from Kalasalingam Academy of Research and Education. Over the past <strong className="text-indigo-600 dark:text-indigo-300">2.5+ years</strong>, I have worked professionally building web applications, Asset Management Systems, ERP portals, and Sports ERP platforms.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                  <h3 className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">2.5+</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Years Experience</p>
                </div>
                <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                  <h3 className="text-2xl md:text-3xl font-bold text-violet-600 dark:text-violet-400">6</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Projects Completed</p>
                </div>
                <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                  <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">8.36</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">B.Tech CGPA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 border-t border-slate-200 dark:border-slate-900 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-2">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider text-xs">History</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Experience Timeline</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 max-w-4xl mx-auto pl-6 sm:pl-8 space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-indigo-600 text-white ring-8 ring-slate-50 dark:ring-slate-950">
                  <FontAwesomeIcon icon={exp.type === 'work' ? faBriefcase : faGraduationCap} className="text-xs" />
                </span>
                <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">{exp.company}, {exp.location}</p>
                    </div>
                    <span className="bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 text-xs px-3 py-1 rounded-full font-bold self-start sm:self-center">
                      {exp.timeline}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">{exp.desc}</p>
                  {exp.tech && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map(t => (
                        <span key={t} className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-xs font-semibold">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 border-t border-slate-200 dark:border-slate-900 bg-slate-100/40 dark:bg-slate-900/40 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-2">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider text-xs">Expertise</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Full-Stack Skills</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col gap-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl font-bold"><FontAwesomeIcon icon={faCode} /></div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Frontend</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">React, TypeScript, JavaScript, HTML5/CSS3, Tailwind CSS, Redux Toolkit, PrimeReact</p>
              </div>
            </div>
            {/* Backend */}
            <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col gap-6">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 text-xl font-bold"><FontAwesomeIcon icon={faGears} /></div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Backend & APIs</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Node.js, Express.js, RESTful API Design, System Architecture</p>
              </div>
            </div>
            {/* Database */}
            <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col gap-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl font-bold"><FontAwesomeIcon icon={faDatabase} /></div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Databases</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">PostgreSQL, MongoDB, SQL Query Optimization, Relational/Non-Relational Schema Design</p>
              </div>
            </div>
            {/* Tools */}
            <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col gap-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xl font-bold"><FontAwesomeIcon icon={faWrench} /></div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Workflows</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Git & GitHub, CI/CD, Agile/Scrum Methodologies, AWS Basics, Figma UI Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 border-t border-slate-200 dark:border-slate-900 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 flex flex-col gap-2">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider text-xs">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Recent Work</h2>
          </div>

          <div className="flex items-center justify-center gap-4 mb-16">
            {(['all', 'worked', 'college'] as const).map(tab => (
              <button key={tab} onClick={() => setFilter(tab)} className={`px-6 py-2 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-800 transition-all ${filter === tab ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600'}`}>
                {tab === 'all' ? 'All' : tab === 'worked' ? 'Projects Worked' : 'College Projects'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(proj => (
              <div key={proj.id} className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="aspect-video overflow-hidden relative">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={proj.image} alt={proj.title} />
                  {proj.featured && (
                    <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-bold uppercase">Active</span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow gap-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map(t => (
                      <span key={t} className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-xs font-semibold">{t}</span>
                    ))}
                  </div>
                  <button onClick={() => setSelectedProject(proj)} className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold flex items-center gap-2 mt-2 self-start hover:text-indigo-700 dark:hover:text-indigo-300">
                    View Details <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 border-t border-slate-200 dark:border-slate-900 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-start gap-4">
                <div className="text-indigo-600 dark:text-indigo-400"><FontAwesomeIcon icon={faLocationDot} className="text-xl" /></div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-semibold">Location</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Srivilliputhur, Tamil Nadu, India</p>
                </div>
              </div>
              <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-start gap-4">
                <div className="text-violet-600 dark:text-violet-400"><FontAwesomeIcon icon={faPhone} className="text-xl" /></div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-semibold">Phone</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">+91 6382274181</p>
                </div>
              </div>
              <div className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-start gap-4">
                <div className="text-emerald-600 dark:text-emerald-400"><FontAwesomeIcon icon={faEnvelope} className="text-xl" /></div>
                <div>
                  <h4 className="text-slate-900 dark:text-white font-semibold">Email</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">vishnuprakashdharmaraj@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="glass-panel bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl flex flex-col gap-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Message</label>
                  <textarea name="message" rows={5} value={formData.message} onChange={handleInputChange} required className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500" />
                </div>
                <button 
                  type="submit" 
                  disabled={isSending} 
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 rounded-lg flex items-center gap-2 justify-center self-end transition-all shadow-md hover:shadow-indigo-600/20"
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                  <FontAwesomeIcon icon={isSending ? faSpinner : faPaperPlane} spin={isSending} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-slate-100 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 md:px-8 text-center flex flex-col items-center gap-6">
          <h4 className="text-slate-900 dark:text-white font-bold text-lg">Follow Me</h4>
          <div className="flex items-center justify-center gap-6">
            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-500/40 transition-colors"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-500/40 transition-colors"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://www.linkedin.com/in/vishnu-prakash-34942b263/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-500/40 transition-colors"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-500/40 transition-colors"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
          <p className="text-slate-500 text-sm flex items-center gap-1 justify-center">
            &copy; {new Date().getFullYear()} by Vishnu Prakash <FontAwesomeIcon icon={faHeart} className="text-rose-500/70" />
          </p>
        </div>
      </footer>

      {/* Modals for form status */}
      {formStatus === 'success' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
          <div className="glass-panel bg-white dark:bg-slate-900 p-8 rounded-2xl max-w-sm w-full text-center border border-emerald-500/20 shadow-2xl">
            <div className="text-emerald-500 text-3xl mb-4"><FontAwesomeIcon icon={faCircleCheck} /></div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Thank you, your message has been received.</p>
            <button onClick={() => setFormStatus('idle')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg mt-6 font-semibold transition-colors">Close</button>
          </div>
        </div>
      )}
      {formStatus === 'error' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
          <div className="glass-panel bg-white dark:bg-slate-900 p-8 rounded-2xl max-w-sm w-full text-center border border-rose-500/20 shadow-2xl">
            <div className="text-rose-500 text-3xl mb-4"><FontAwesomeIcon icon={faCircleExclamation} /></div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sending Failed</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Could not send email. Please check your Resend API Key configuration in the backend settings.</p>
            <button onClick={() => setFormStatus('idle')} className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg mt-6 font-semibold transition-colors">Close</button>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full my-8 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedProject.title}</h2>
              <button onClick={() => setSelectedProject(null)} className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2 transition-colors">
                <FontAwesomeIcon icon={faXmark} className="text-xl" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 md:p-8 overflow-y-auto flex-grow">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side details */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
                    <img className="w-full h-full object-cover" src={selectedProject.image} alt={selectedProject.title} />
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-full text-xs font-semibold">{t}</span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p>{selectedProject.details.description}</p>
                    
                    {selectedProject.details.objectivesTitle && (
                      <>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">{selectedProject.details.objectivesTitle}</h3>
                        <p>{selectedProject.details.objectivesText}</p>
                      </>
                    )}
                    
                    {selectedProject.details.processTitle && (
                      <>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">{selectedProject.details.processTitle}</h3>
                        <p>{selectedProject.details.processText}</p>
                      </>
                    )}

                    {selectedProject.details.demoVideo && (
                      <>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4">Project Demo Video</h3>
                        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg aspect-video w-full max-w-xl bg-black">
                          <video className="w-full h-full" controls>
                            <source src={selectedProject.details.demoVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Side metadata */}
                <div className="lg:col-span-4">
                  <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 p-6 rounded-2xl flex flex-col gap-5">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Project Information</h4>
                    <hr className="border-slate-200 dark:border-slate-800" />
                    
                    <div className="flex flex-col gap-4 text-sm">
                      {selectedProject.details.company && (
                        <div>
                          <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-semibold">Company</span>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">{selectedProject.details.company}</p>
                        </div>
                      )}

                      {selectedProject.details.position && (
                        <div>
                          <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-semibold">Position</span>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">{selectedProject.details.position}</p>
                        </div>
                      )}

                      {selectedProject.details.role && (
                        <div>
                          <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-semibold">Role</span>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">{selectedProject.details.role}</p>
                        </div>
                      )}

                      {selectedProject.details.timeline && (
                        <div>
                          <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-semibold">Timeline</span>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">{selectedProject.details.timeline}</p>
                        </div>
                      )}

                      {selectedProject.details.teamMembers && (
                        <div>
                          <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-semibold">Team Members</span>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">{selectedProject.details.teamMembers}</p>
                        </div>
                      )}

                      {selectedProject.details.institution && (
                        <div>
                          <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-semibold">Institution</span>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">{selectedProject.details.institution}</p>
                        </div>
                      )}

                      {selectedProject.details.completed && (
                        <div>
                          <span className="text-slate-400 dark:text-slate-500 text-xs uppercase font-semibold">Completed Date</span>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">{selectedProject.details.completed}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex justify-end">
              <button onClick={() => setSelectedProject(null)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-xl transition-colors shadow-md">
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
