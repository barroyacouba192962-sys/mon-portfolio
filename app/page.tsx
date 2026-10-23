"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import {
  Mail, ExternalLink, Code2, Briefcase, Globe, Palette, Code, Database, BarChart, X, ChevronLeft, ChevronRight,
  Eye, Phone, Send, CheckCircle, Download, MapPin, GraduationCap, FlaskConical, Award, Languages, FileText,
  Trophy, Play, Smartphone, BookOpen, PenTool,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Contenu du site — à mettre à jour ici en priorité
// ---------------------------------------------------------------------------

const links = {
  github: "https://github.com/barroyacouba192962-sys",
  linkedin: "https://www.linkedin.com/in/barro-undefined-b30b47340/",
  email: "barroyacouba192962@gmail.com",
  cvFr: "/cv-yacouba.pdf",
  cvEn: "/cv-yacouba-en.pdf",
};

type TimelineItem = { period?: string; title: string; place: string; detail?: string; href?: string };

const education: TimelineItem[] = [
  {
    period: "2023 – aujourd’hui",
    title: "Cycle d’Ingénieur Statisticien Économiste (ISE)",
    place: "Institut Supérieur des Sciences de la Population (ISSP), Université Joseph Ki-Zerbo, Ouagadougou",
    detail: "Économétrie, comptabilité nationale (SCN 2008), macroéconomie, apprentissage automatique appliqué. Stage de fin de cycle en cours chez Coris Assurance Vie.",
  },
  {
    period: "2023",
    title: "Licence en économie, option Macroéconomie et gestion du développement",
    place: "Université Nazi Boni, Bobo-Dioulasso",
  },
  {
    period: "2018",
    title: "Baccalauréat",
    place: "Complexe Scolaire Alpha la Solidarité",
  },
];

const experience: TimelineItem[] = [
  {
    period: "En cours",
    title: "Stagiaire de fin de cycle",
    place: "Coris Assurance Vie, Burkina Faso",
  },
  {
    period: "En cours",
    title: "Fondateur et développeur, Faso Carrières",
    place: "fasocarrieres.com",
    href: "https://fasocarrieres.com",
    detail: "Conception de la plateforme et rédaction de formations en ligne sur les méthodes quantitatives et les outils professionnels.",
  },
  {
    period: "1 mois",
    title: "Stagiaire",
    place: "Institut National de la Statistique et de la Démographie (INSD), Ouagadougou",
  },
  {
    title: "Assistant numérique",
    place: "Université Joseph Ki-Zerbo, Ouagadougou",
    detail: "Mise à jour des données de la plateforme campusfaso.com.",
  },
];

const certifications = [
  {
    title: "Finance & Quantitative Modeling for Analysts",
    issuer: "University of Pennsylvania · Coursera",
    href: "https://coursera.org/verify/specialization/R352N0T1ED2I",
  },
  {
    title: "Microsoft Power BI Data Analyst",
    issuer: "Microsoft · Coursera",
    href: "https://coursera.org/verify/23P9VXRLDMQJ",
  },
];

const researchInterests = [
  "Macroéconomie appliquée et modèles DSGE",
  "Économétrie des séries temporelles",
  "Commerce, IDE et croissance en Afrique de l’Ouest",
  "Prévision et apprentissage automatique",
  "Économie du développement et approche par les capabilités",
];

const research = [
  {
    title: "Modèle DSGE de type RBC appliqué au Burkina Faso",
    period: "Données 2005–2021",
    description: "Construction et simulation d’un modèle d’équilibre général dynamique stochastique sur données burkinabè, restitué sous forme de présentation Beamer.",
    tools: ["Dynare", "Octave", "LaTeX Beamer"],
  },
  {
    title: "Ouverture commerciale, IDE et croissance économique au Burkina Faso",
    period: "Modèle ARDL",
    description: "Estimation des relations de court et de long terme entre ouverture commerciale, investissements directs étrangers et croissance, puis rédaction du rapport économétrique.",
    tools: ["Python", "ARDL", "Séries temporelles"],
  },
  {
    title: "Prévision de la demande horaire d’électricité",
    period: "Série AEP, 2004–2018",
    description: "Comparaison de cinq modèles : LightGBM, XGBoost, forêts aléatoires, LSTM et régression linéaire. Le meilleur, LightGBM, atteint une erreur moyenne de 0,70 %.",
    metrics: ["MAPE 0,70 %", "R² 0,997"],
    tools: ["Python", "LightGBM", "XGBoost", "PyTorch"],
  },
];

type Project = {
  title: string;
  description: string;
  tags: string[];
  category: "dev" | "design";
  icon: React.ElementType;
  images: string[];
  link?: { label: string; href: string };
  badge?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Faso Carrières",
    description: "Plateforme d’études, de formation et d’emploi pour le Burkina Faso, que j’ai conçue et développée. J’y rédige des formations en ligne : collecte de données mobile (KoboToolbox, ODK), enquêtes et échantillonnage, économétrie appliquée (Stata, R), analyse de données (SPSS, Stata), cartographie (QGIS), LaTeX, Excel appliqué à la finance et IA générative.",
    tags: ["Next.js", "React", "Node.js", "Appwrite", "Vercel"],
    category: "dev",
    icon: Globe,
    images: [],
    link: { label: "fasocarrieres.com", href: "https://fasocarrieres.com" },
    badge: "Concours National d’Innovation Digitale 2026",
    featured: true,
  },
  {
    title: "FasoPrepas, application mobile",
    description: "Application de préparation aux concours de la fonction publique et des grandes écoles (ISE, ASECNA, IFORD…) : QCM chronométrés, corrections détaillées et suivi de progression. Les candidats peuvent créer et partager leurs propres QCM, et accéder à des ressources pédagogiques ainsi qu’à plus d’une centaine de romans.",
    tags: ["Flutter", "Dart", "Node.js", "Appwrite"],
    category: "dev",
    icon: Smartphone,
    images: ["/1.webp", "/2.webp", "/3.webp"],
  },
  {
    title: "La RévueCapes",
    description: "Mise en forme et édition d’un document de préparation au CAPES option mathématiques, destiné aux candidats des concours directs de la fonction publique.",
    tags: ["LaTeX", "Photoshop"],
    category: "design",
    icon: BookOpen,
    images: ["/PG0.webp"],
  },
  {
    title: "Étiquettes et packaging",
    description: "Conception d’étiquettes et de supports visuels pour des marques de cosmétiques : identité, packaging et déclinaisons produit.",
    tags: ["Photoshop", "Illustrator", "Canva"],
    category: "design",
    icon: PenTool,
    images: [
      "/derma.webp",
      "/black.webp",
      "/5fe9131b-5e4c-4ab7-920a-4ee8ed8840ec.webp",
      "/Pure skin wash.psd.webp",
      "/bf752d66-0b9a-4e7d-aae4-53776d5c87cf.webp",
      "/detox.webp",
      "/Orange Glow Scrub.webp",
      "/66cc732c-bb55-4ca4-ad60-236b5d37ff16.webp",
    ],
  },
  {
    title: "Affiches, logos et vidéo",
    description: "Sélection d’affiches, de logos, de visuels de communication et de montages vidéo réalisés pour des marques, des événements et des associations.",
    tags: ["Photoshop", "Illustrator", "Canva", "CapCut"],
    category: "design",
    icon: Palette,
    images: ["/logo.svg", "/22.png", "/SAlif4.png", "/Oumou.png", "/P5.png", "/LOG6.png", "/PreRentré10.jpg", "/AES7.png", "/Anglais finale.png", "/AfficheLass3.png", "/Lass.mp4", "/cd.webp", "/CANE modifié.png"],
  },
];

const skillGroups = [
  { title: "Économétrie & statistique", icon: BarChart, color: "text-red-400", items: ["Stata", "R", "SPSS", "Python", "scikit-learn", "LightGBM", "XGBoost", "PyTorch", "Dynare", "Octave"] },
  { title: "Données & cartographie", icon: Database, color: "text-yellow-400", items: ["KoboToolbox", "ODK", "QGIS", "Power BI", "Excel (VBA)", "SQL", "PostgreSQL", "Access"] },
  { title: "Rédaction scientifique", icon: FileText, color: "text-cyan-300", items: ["LaTeX", "Beamer", "Word"] },
  { title: "Web & mobile", icon: Code, color: "text-green-400", items: ["Next.js", "React", "Node.js", "Flutter (Dart)", "Appwrite", "Git & GitHub"] },
  { title: "Design & vidéo", icon: Palette, color: "text-purple-400", items: ["Photoshop", "Illustrator", "InDesign", "Canva", "CapCut", "InShot"] },
];

const spokenLanguages = [
  { name: "Dioula, Bolon", level: "Langues maternelles" },
  { name: "Français", level: "Courant" },
  { name: "Anglais", level: "Niveau de base" },
];

const projectCardImageSizes = "(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) calc(50vw - 2.5rem), 480px";
const modalImageSizes = "(max-width: 959px) calc(100vw - 2rem), 896px";

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

// ---------------------------------------------------------------------------
// Icônes de marque
// ---------------------------------------------------------------------------

type BrandIconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const GitHubIcon = ({ size = 20, ...props }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true" {...props}>
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.33-1.75-1.33-1.75-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.23 1.84 1.23 1.08 1.83 2.83 1.3 3.52 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.48-1.33-5.48-5.9 0-1.3.47-2.36 1.23-3.19-.12-.3-.53-1.53.12-3.19 0 0 1.01-.32 3.3 1.22a11.43 11.43 0 0 1 6 0c2.28-1.54 3.29-1.22 3.29-1.22.66 1.66.25 2.89.12 3.19.77.83 1.23 1.89 1.23 3.19 0 4.58-2.81 5.6-5.49 5.9.43.38.82 1.11.82 2.25v3.34c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

const LinkedInIcon = ({ size = 20, ...props }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true" {...props}>
    <path d="M4.98 3.5A2.49 2.49 0 1 0 5 8.48a2.49 2.49 0 0 0-.02-4.98ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.53 4.8 5.82V21h-4v-5.7c0-1.36-.03-3.11-1.95-3.11-1.95 0-2.25 1.48-2.25 3.01V21h-4V9Z" />
  </svg>
);

// ---------------------------------------------------------------------------
// Composants
// ---------------------------------------------------------------------------

const SectionTitle = ({ icon: Icon, title, id }: { icon: React.ElementType; title: string; id?: string }) => (
  <div className="flex items-center gap-3 mb-10" id={id}>
    <Icon className="text-blue-500" />
    <h3 className="text-2xl font-bold text-white">{title}</h3>
  </div>
);

const Media = ({ src, alt, sizes, inModal = false }: { src: string; alt: string; sizes: string; inModal?: boolean }) => {
  if (isVideo(src)) {
    return inModal ? (
      <video src={src} controls autoPlay playsInline className="h-full w-full object-contain" aria-label={alt} />
    ) : (
      <div className="relative h-full w-full">
        <video src={`${src}#t=0.5`} muted playsInline preload="metadata" className="h-full w-full object-contain p-4" aria-label={alt} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-slate-950/70 p-3 text-white"><Play size={22} /></span>
        </div>
      </div>
    );
  }
  return <Image src={src} alt={alt} fill sizes={sizes} className={inModal ? "object-contain" : "object-contain p-4"} />;
};

const ProjectImageCarousel = ({ images, title, onOpenGallery }: { images: string[]; title: string; onOpenGallery: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const go = (e: React.MouseEvent, step: number) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + step + images.length) % images.length);
  };

  // On ne monte que l'image affichée et ses voisines pour éviter de charger toute la galerie d'un coup
  const isNear = (index: number) => {
    const n = images.length;
    return index === currentIndex || index === (currentIndex + 1) % n || index === (currentIndex - 1 + n) % n;
  };

  return (
    <div className="relative h-72 w-full overflow-hidden bg-slate-900/20 border-b border-slate-800/50 group/carousel">
      {images.map((img, index) => isNear(index) && (
        <div
          key={img}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        >
          <Media src={img} alt={`${title}, visuel ${index + 1}`} sizes={projectCardImageSizes} />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button onClick={(e) => go(e, -1)} aria-label="Visuel précédent" className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 bg-slate-900/70 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 transition-all duration-300 hover:bg-blue-600 backdrop-blur-sm">
            <ChevronLeft size={20} />
          </button>
          <button onClick={(e) => go(e, 1)} aria-label="Visuel suivant" className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 bg-slate-900/70 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 focus:opacity-100 transition-all duration-300 hover:bg-blue-600 backdrop-blur-sm">
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/carousel:opacity-100 transition-opacity flex items-center justify-center z-20">
        <button
          onClick={(e) => { e.stopPropagation(); onOpenGallery(); }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold shadow-xl transform translate-y-4 group-hover/carousel:translate-y-0 transition-all"
        >
          <Eye size={16} />
          Voir la galerie
        </button>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((img, i) => (
            <div key={img} className={`h-1 rounded-full transition-all ${i === currentIndex ? 'w-4 bg-blue-500' : 'w-1 bg-slate-600'}`} />
          ))}
        </div>
      )}
    </div>
  );
};

const Timeline = ({ items }: { items: TimelineItem[] }) => (
  <ol className="relative border-l border-slate-800 ml-2 space-y-8">
    {items.map((item) => (
      <li key={item.title} className="pl-6 relative">
        <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-slate-950" />
        {item.period && <p className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-1">{item.period}</p>}
        <h5 className="text-white font-semibold leading-snug">{item.title}</h5>
        {item.href ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">{item.place}</a>
        ) : (
          <p className="text-sm text-slate-400">{item.place}</p>
        )}
        {item.detail && <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.detail}</p>}
      </li>
    ))}
  </ol>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Portfolio() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setSendError(false);

    // Identifiants EmailJS : Service ID, Template ID et Public Key
    emailjs.sendForm('service_nirrku4', 'template_xgbql3z', formRef.current, 'R96sVpClJi_x58i6_')
      .then(() => {
        setIsSuccess(true);
        setIsSending(false);
        formRef.current?.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }, (error) => {
        console.error('Erreur:', error.text);
        setIsSending(false);
        setSendError(true);
      });
  };

  useEffect(() => {
    document.body.style.overflow = selectedProject !== null ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject === null) return;
    const onKey = (e: KeyboardEvent) => {
      const len = projects[selectedProject].images.length;
      if (e.key === 'Escape') setSelectedProject(null);
      if (e.key === 'ArrowRight') setModalImageIndex((prev) => (prev + 1) % len);
      if (e.key === 'ArrowLeft') setModalImageIndex((prev) => (prev - 1 + len) % len);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject]);

  const openModal = (projectIndex: number) => {
    if (projects[projectIndex].images.length === 0) return;
    setSelectedProject(projectIndex);
    setModalImageIndex(0);
  };

  const stepModal = (step: number) => {
    if (selectedProject === null) return;
    const len = projects[selectedProject].images.length;
    setModalImageIndex((prev) => (prev + step + len) % len);
  };

  const devProjects = projects.map((p, i) => ({ p, i })).filter(({ p }) => p.category === 'dev');
  const designProjects = projects.map((p, i) => ({ p, i })).filter(({ p }) => p.category === 'design');

  const renderProject = ({ p: project, i }: { p: Project; i: number }) => {
    const Icon = project.icon;
    const accent = project.category === 'design' ? 'text-purple-400 bg-purple-500/10' : 'text-blue-400 bg-blue-500/10';
    return (
      <div key={project.title} className={`${project.featured ? 'md:col-span-2 ' : ''}group relative bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col`}>
        {project.images.length > 0 && (
          <ProjectImageCarousel images={project.images} title={project.title} onOpenGallery={() => openModal(i)} />
        )}
        <div className="p-8 flex flex-col flex-1">
          {project.images.length === 0 && (
            <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
              <Icon size={22} />
            </div>
          )}
          {project.badge && (
            <p className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <Trophy size={13} /> {project.badge}
            </p>
          )}
          <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">{project.description}</p>
          <div className="mt-auto flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${accent}`}>{tag}</span>
            ))}
            {project.link && (
              <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                {project.link.label} <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  const currentMedia = selectedProject !== null ? projects[selectedProject].images[modalImageIndex] : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">YB</span>
            <span className="font-bold text-lg tracking-tight text-white">Yacouba Barro</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#parcours" className="hover:text-blue-400 transition-colors">Parcours</a>
            <a href="#recherche" className="hover:text-blue-400 transition-colors">Recherche</a>
            <a href="#projets" className="hover:text-blue-400 transition-colors">Projets</a>
            <a href="#competences" className="hover:text-blue-400 transition-colors">Compétences</a>
            <a href="#contact" className="flex items-center gap-2 text-blue-500 border border-blue-500/50 px-4 py-1.5 rounded-md hover:bg-blue-500/10 transition-all">
              <Mail size={16} />
              Contact
            </a>
          </div>
          <a href="#contact" className="md:hidden flex items-center gap-2 text-sm text-blue-500 border border-blue-500/50 px-3 py-1.5 rounded-md">
            <Mail size={15} />
            Contact
          </a>
        </div>
      </nav>

      {/* Galerie plein écran */}
      {selectedProject !== null && currentMedia && (
        <div role="dialog" aria-modal="true" aria-label={projects[selectedProject].title} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <button onClick={() => setSelectedProject(null)} aria-label="Fermer la galerie" className="absolute top-6 right-6 text-slate-400 hover:text-white z-[110] p-2 bg-slate-900 rounded-full">
            <X size={24} />
          </button>

          <div className="relative w-full max-w-4xl h-[80vh] px-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {projects[selectedProject].images.length > 1 && (
              <>
                <button onClick={() => stepModal(-1)} aria-label="Visuel précédent" className="absolute left-4 p-2 bg-slate-900/50 rounded-full hover:bg-blue-600 transition-colors z-[110]">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={() => stepModal(1)} aria-label="Visuel suivant" className="absolute right-4 p-2 bg-slate-900/50 rounded-full hover:bg-blue-600 transition-colors z-[110]">
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="relative w-full h-full">
              <Media key={currentMedia} src={currentMedia} alt={`${projects[selectedProject].title}, visuel ${modalImageIndex + 1}`} sizes={modalImageSizes} inModal />
            </div>

            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <p className="text-white font-medium">{projects[selectedProject].title}</p>
              <p className="text-slate-500 text-sm">Visuel {modalImageIndex + 1} sur {projects[selectedProject].images.length}</p>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* Présentation */}
        <section className="mb-32 grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-blue-500 font-mono mb-4">Hello World, je suis Yacouba Barro</h2>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Élève ingénieur statisticien-économiste
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                data, recherche et solutions numériques.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-6">
              Je me forme à l’ISSP (Université Joseph Ki-Zerbo) à l’économétrie appliquée, à la macroéconomie quantitative
              et à la science des données. J’analyse des données pour éclairer les décisions, et je conçois des plateformes,
              des applications et des formations qui rendent ces méthodes accessibles au Burkina Faso.
            </p>
            <p className="mb-10 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Ouvert aux stages, bourses et projets doctoraux
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={links.cvFr} download className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-500 transition-all font-medium shadow-xl shadow-blue-500/20">
                <Download size={18} />
                CV en français (PDF)
              </a>
              <a href={links.cvEn} download className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-xl hover:border-blue-500/50 hover:bg-slate-800 transition-all font-medium">
                <Download size={18} className="text-blue-500" />
                CV in English (PDF)
              </a>
            </div>
          </div>
          <div className="order-first md:order-none mr-auto md:mx-0">
            <div className="relative h-32 w-32 md:h-64 md:w-64 rounded-full p-1 bg-gradient-to-br from-blue-500 to-cyan-300 shadow-2xl shadow-blue-500/20">
              <Image src="/yacouba-barro.webp" alt="Portrait de Yacouba Barro" fill sizes="(max-width: 767px) 128px, 256px" className="rounded-full object-cover p-1" priority />
            </div>
          </div>
        </section>

        {/* Parcours */}
        <section id="parcours" className="mb-32 scroll-mt-24">
          <SectionTitle icon={GraduationCap} title="Parcours" />
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">Formation</h4>
              <Timeline items={education} />
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6">Expérience</h4>
              <Timeline items={experience} />
            </div>
          </div>

          <div className="mt-14">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2"><Award size={16} /> Certifications</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((c) => (
                <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-blue-500/50 transition-all">
                  <div>
                    <p className="font-semibold text-white">{c.title}</p>
                    <p className="text-sm text-slate-400">{c.issuer}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-blue-400 group-hover:text-blue-300">Vérifier <ExternalLink size={13} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Recherche */}
        <section id="recherche" className="mb-32 scroll-mt-24">
          <SectionTitle icon={FlaskConical} title="Recherche et projets académiques" />
          <div className="mb-10 flex flex-wrap gap-3">
            {researchInterests.map((interest) => (
              <span key={interest} className="px-4 py-2 bg-blue-500/5 border border-blue-500/20 text-blue-200 rounded-xl text-sm font-medium">{interest}</span>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {research.map((r) => (
              <article key={r.title} className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <p className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">{r.period}</p>
                <h4 className="text-lg font-bold text-white leading-snug mb-3">{r.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{r.description}</p>
                {r.metrics && (
                  <div className="mb-5 flex gap-3">
                    {r.metrics.map((m) => (
                      <span key={m} className="rounded-lg bg-cyan-400/10 px-3 py-1.5 font-mono text-sm font-semibold text-cyan-300">{m}</span>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex flex-wrap gap-2">
                  {r.tools.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded text-blue-400 bg-blue-500/10">{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Projets */}
        <section id="projets" className="mb-32 scroll-mt-24">
          <SectionTitle icon={Briefcase} title="Projets numériques" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {devProjects.map(renderProject)}
          </div>
          <SectionTitle icon={Palette} title="Édition, design et vidéo" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {designProjects.map(renderProject)}
          </div>
        </section>

        {/* Compétences */}
        <section id="competences" className="mb-32 scroll-mt-24">
          <SectionTitle icon={Code2} title="Compétences" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {skillGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.title}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon size={18} className={group.color} />
                    <h4 className="text-lg font-semibold text-white">{group.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((skill) => (
                      <span key={skill} className="px-3.5 py-1.5 bg-slate-900/50 border border-slate-800 rounded-xl text-sm font-medium">{skill}</span>
                    ))}
                  </div>
                </div>
              );
            })}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Languages size={18} className="text-emerald-400" />
                <h4 className="text-lg font-semibold text-white">Langues</h4>
              </div>
              <ul className="space-y-2 text-sm">
                {spokenLanguages.map((l) => (
                  <li key={l.name} className="flex justify-between gap-4 border-b border-slate-800/70 pb-2">
                    <span className="font-medium text-slate-200">{l.name}</span>
                    <span className="text-slate-500">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mb-32 scroll-mt-24">
          <SectionTitle icon={Mail} title="Contactez-moi" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Une offre de stage, une bourse, un projet de recherche, une analyse statistique ou une solution web ?
                Écrivez-moi, je vous réponds rapidement.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Mail size={20} /></div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">E-mail</p>
                    <a href={`mailto:${links.email}`} className="text-slate-200 hover:text-blue-400 transition-colors font-medium break-all">{links.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Phone size={20} /></div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">WhatsApp et appel</p>
                    <p className="text-slate-200 font-medium">(+226) 66 54 84 30 / 68 54 36 46</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><MapPin size={20} /></div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Localisation</p>
                    <p className="text-slate-200 font-medium">Ouagadougou, Burkina Faso</p>
                  </div>
                </div>
              </div>
            </div>

            <form ref={formRef} className="space-y-4" onSubmit={sendEmail}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">Nom complet</label>
                  <input type="text" name="user_name" id="name" required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Ex. : Awa Ouédraogo" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Adresse e-mail</label>
                  <input type="email" name="user_email" id="email" required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all" placeholder="vous@exemple.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-300">Sujet</label>
                <input type="text" name="subject" id="subject" required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Objet de votre message" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                <textarea name="message" id="message" rows={4} required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all resize-none" placeholder="Dites-m’en plus sur votre projet ou votre offre…"></textarea>
              </div>
              <button
                type="submit"
                disabled={isSending || isSuccess}
                className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg group ${isSuccess ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'}`}
              >
                {isSending ? 'Envoi en cours…' : isSuccess ? 'Message envoyé !' : 'Envoyer le message'}
                {isSuccess ? (
                  <CheckCircle size={18} className="animate-bounce" />
                ) : (
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
              </button>
              {sendError && (
                <p className="text-sm text-red-400">L’envoi a échoué. Écrivez-moi directement à {links.email}.</p>
              )}
            </form>
          </div>
        </section>

        {/* Pied de page */}
        <footer className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Yacouba Barro · Ouagadougou</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-all duration-300 hover:scale-110" aria-label="GitHub" title="GitHub">
                <GitHubIcon size={20} />
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-all duration-300 hover:scale-110" aria-label="LinkedIn" title="LinkedIn">
                <LinkedInIcon size={20} />
              </a>
            </div>
            <span className="flex items-center gap-2 text-slate-400 text-sm">
              <Globe size={16} />
              Stages, bourses, missions freelance
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
