"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { Mail, ExternalLink, Code2, Briefcase, Terminal, Globe, Palette, Code, Database, BarChart, X, ChevronLeft, ChevronRight, Eye, Image as ImageIcon, Phone, Send, CheckCircle, Download, MapPin } from 'lucide-react';

const projects = [
  {
    title: "Application Mobile FasoPrepas",
    description: "Solution mobile complète permettant aux candidats de s'entraîner en conditions réelles aux concours d'entrée dans la fonction publique; concours d'Ingénieur Statisticien Économiste, Concours d'ASECNA, IFORD, etc. Inclut un système de QCM chronométrés, des corrections détaillées et un suivi de progression personnalisé. L'application permet également aux utilisateurs de créer leurs propres QCM et de les partager avec la communauté, favorisant ainsi l'entraide et la collaboration entre candidats, d'accéder à des ressources pédagogiques exclusives et plus d'une centaine de Romans.",
    tags: ["Dart", "FLUTTER", "Node.js", "Appwrite"],
    link: "https://votre-lien-store.com",
    category: "dev",
    github: "https://github.com/votre-repo",
    images: [
      "/1.webp", 
      "/2.webp", 
      "/3.webp", 
    ] 
  },
  {
    title: "Quelques étiquettes réalisées",
    description: "Conception graphique d'étiquettes personnalisées et de supports de communication visuelle pour divers projets de branding et packaging.",
    tags: ["Photoshop", "Illustrator", "Canva"],
    link: "#",
    category: "design",
    images: [
      "/derma.webp",
      "/black.webp",
      "/5fe9131b-5e4c-4ab7-920a-4ee8ed8840ec.webp", 
      "/Pure skin wash.psd.webp",
      "/bf752d66-0b9a-4e7d-aae4-53776d5c87cf.webp",
      "/detox.webp",
      "/Orange Glow Scrub.webp",
      "/66cc732c-bb55-4ca4-ad60-236b5d37ff16.webp"
    ]
  },
  {
    title: "Quelques realisations",
    description: "Selection de realisations graphiques et visuelles. Vous pourrez ajouter plusieurs images a cette galerie pour presenter differents travaux.",
    tags: ["Photoshop", "Illustrator", "Canva"],
    link: "#",
    category: "design",
    images: ["/logo.svg", "/22.png", "/SAlif4.png", "/Oumou.png", "/P5.png", "/LOG6.png", "/PreRentré10.jpg", "/AES7.png", "/Anglais finale.png", "/AfficheLass3.png", "/Lass.mp4", "/cd.webp", "/CANE modifié.png"]
  },
  {
    title: "Un document CAPES options mathematiques édité",
    description: "J'ai édité un document de preparation de CAPES opion Mathématiques : La RévueCapes. Un document qui permet aux candidats(es) des concours directs de la fonction publique de se preparer efficacement aux concours de capes option mathématiqies",
    tags: ["Latex", "Photoshop"],
    link: "#",
    category: "design",
    images: ["/PG0.webp"]
  }
];

// Define the new skill categories
const designSkills = ["Photoshop", "Illustrator", "Indesign", "Canva", "CapCut", "InShot"];
const devSkills = ["Python", "Flutter", "React/Next.js", "Node.js"];
const dataSkills = ["Stata", "SPSS", "R", "Excel", "PowerBi"];
const dbSkills = ["SQL", "PostgreSQL", "Access"];
const projectCardImageSizes = "(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) calc(50vw - 2.5rem), 480px";
const modalImageSizes = "(max-width: 959px) calc(100vw - 2rem), 896px";

type BrandIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

const GitHubIcon = ({ size = 20, ...props }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    aria-hidden="true"
    {...props}
  >
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.33-1.75-1.33-1.75-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.23 1.84 1.23 1.08 1.83 2.83 1.3 3.52 1 .11-.77.42-1.3.76-1.6-2.67-.3-5.48-1.33-5.48-5.9 0-1.3.47-2.36 1.23-3.19-.12-.3-.53-1.53.12-3.19 0 0 1.01-.32 3.3 1.22a11.43 11.43 0 0 1 6 0c2.28-1.54 3.29-1.22 3.29-1.22.66 1.66.25 2.89.12 3.19.77.83 1.23 1.89 1.23 3.19 0 4.58-2.81 5.6-5.49 5.9.43.38.82 1.11.82 2.25v3.34c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

const LinkedInIcon = ({ size = 20, ...props }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    aria-hidden="true"
    {...props}
  >
    <path d="M4.98 3.5A2.49 2.49 0 1 0 5 8.48a2.49 2.49 0 0 0-.02-4.98ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.53 4.8 5.82V21h-4v-5.7c0-1.36-.03-3.11-1.95-3.11-1.95 0-2.25 1.48-2.25 3.01V21h-4V9Z" />
  </svg>
);

const ProjectImageCarousel = ({ images, title, onOpenGallery }: { images: string[], title: string, onOpenGallery: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasImages = images.length > 0;

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Rotation automatique toutes les 4 secondes
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-72 w-full overflow-hidden bg-slate-900/20 border-b border-slate-800/50 group/carousel">
      {hasImages ? images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <Image 
            src={img} 
            alt={`${title} screenshot ${index + 1}`}
            fill
            sizes={projectCardImageSizes}
            className="object-contain p-4 transition-transform duration-700" // object-contain garantit que l'image est entière
          />
        </div>
      )) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/30 px-6 text-center">
          <div className="rounded-full border border-slate-700/80 bg-slate-900/80 p-4 text-slate-400">
            <ImageIcon size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Galerie a venir</p>
            <p className="text-xs text-slate-500"></p>
          </div>
        </div>
      )}
      
      {/* Flèches de navigation au survol */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 bg-slate-900/70 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-blue-600 backdrop-blur-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 bg-slate-900/70 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-blue-600 backdrop-blur-sm"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Overlay au survol pour le bouton Galerie */}
      {hasImages && (
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/carousel:opacity-100 transition-opacity flex items-center justify-center z-20">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenGallery();
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold shadow-xl transform translate-y-4 group-hover/carousel:translate-y-0 transition-all"
          >
            <Eye size={16} />
            Voir la galerie
          </button>
        </div>
      )}

      {/* Indicateurs (petits points) */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i === currentIndex ? 'w-4 bg-blue-500' : 'w-1 bg-slate-600'}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Portfolio() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);

    // Remplace ces 3 valeurs par tes propres identifiants EmailJS
    // Service ID, Template ID et Public Key
    emailjs.sendForm(
      'service_nirrku4', 
      'template_xgbql3z', 
      formRef.current, 
      'R96sVpClJi_x58i6_'
    )
    .then(() => {
      setIsSuccess(true);
      setIsSending(false);
      formRef.current?.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }, (error) => {
      console.error('Erreur:', error.text);
      setIsSending(false);
    });
  };

  useEffect(() => {
    document.body.style.overflow = selectedProject !== null ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  const openModal = (projectIndex: number) => {
    if (projects[projectIndex].images.length === 0) return;
    setSelectedProject(projectIndex);
    setModalImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const nextModalImage = () => {
    if (selectedProject !== null) {
      setModalImageIndex((prev) => (prev + 1) % projects[selectedProject].images.length);
    }
  };

  const prevModalImage = () => {
    if (selectedProject !== null) {
      const len = projects[selectedProject].images.length;
      setModalImageIndex((prev) => (prev - 1 + len) % len);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 font-sans">
      {/* Header / Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-blue-500" />
            <span className="font-bold text-lg tracking-tight text-white">Dev.Portfolio</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#projets" className="hover:text-blue-400 transition-colors">Projets</a>
            <a href="#competences" className="hover:text-blue-400 transition-colors">Skills</a>
            <a href="#contact" className="flex items-center gap-2 text-blue-500 border border-blue-500/50 px-4 py-1.5 rounded-md hover:bg-blue-500/10 transition-all">
              <Mail size={16} />
              Contact
            </a>
          </div>
        </div>
      </nav>


      {/* Modal / Lightbox de la Galerie */}
      {selectedProject !== null && projects[selectedProject].images.length > 0 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm animate-in fade-in duration-300">
          <button onClick={closeModal} className="absolute top-6 right-6 text-slate-400 hover:text-white z-[110] p-2 bg-slate-900 rounded-full">
            <X size={24} />
          </button>
          
          <div className="relative w-full max-w-4xl h-[80vh] px-4 flex items-center justify-center">
            {/* Navigation Modal */}
            {projects[selectedProject].images.length > 1 && (
              <>
                <button onClick={prevModalImage} className="absolute left-4 p-2 bg-slate-900/50 rounded-full hover:bg-blue-600 transition-colors z-[110]">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={nextModalImage} className="absolute right-4 p-2 bg-slate-900/50 rounded-full hover:bg-blue-600 transition-colors z-[110]">
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="relative w-full h-full">
              <Image
                src={projects[selectedProject].images[modalImageIndex]}
                alt="Full size view"
                fill
                sizes={modalImageSizes}
                className="object-contain"
              />
            </div>
            
            {/* Caption Modal */}
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <p className="text-white font-medium">{projects[selectedProject].title}</p>
              <p className="text-slate-500 text-sm">Image {modalImageIndex + 1} sur {projects[selectedProject].images.length}</p>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-blue-500 font-mono mb-4">Hello World, je suis —</h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Ingénieur Statisticien Economiste <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Developpeur Web & Infographiste & Videaste.
            </span>
          </h1>
          {/* eslint-disable react/no-unescaped-entities */}
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
            Je n'ettoie et j'analyse vos données afin de vous aidez à prendre des decisions sur le fonctionnement de votre structure Je conçois et développe des solutions numériques robustes, scalables et centrées sur l&apos;utilisateur, telle que les sites Web, application mobile & ios & web & Macs. 
            Spécialisé dans les écosystèmes Modern Web.
          </p>
          {/* eslint-enable react/no-unescaped-entities */}
          <div className="flex flex-wrap gap-4">
            <a 
              href="/cv-yacouba.pdf" 
              download 
              className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-white px-6 py-3 rounded-xl hover:border-blue-500/50 hover:bg-slate-800 transition-all font-medium group shadow-xl shadow-blue-500/5"
            >
              <Download size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
              Télécharger mon CV (PDF)
            </a>
          </div>
        </section>

        {/* Skills Section */}
        <section id="competences" className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Code2 className="text-blue-500" />
            <h3 className="text-2xl font-bold text-white">Stack Technique</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Stack de Design */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette size={18} className="text-purple-400" />
                <h4 className="text-xl font-semibold text-white">Stack de Design</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {designSkills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stack de Développement */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code size={18} className="text-green-400" />
                <h4 className="text-xl font-semibold text-white">Stack de Développement</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {devSkills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stack de Traitement de Données */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart size={18} className="text-red-400" />
                <h4 className="text-xl font-semibold text-white">Stack de Traitement de Données</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {dataSkills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stack des Bases de Données */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database size={18} className="text-yellow-400" />
                <h4 className="text-xl font-semibold text-white">Stack des Bases de Données</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {dbSkills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projets" className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="text-blue-500" />
            <h3 className="text-2xl font-bold text-white">Projets Notables</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, i) => (
              <div key={i} className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
                <ProjectImageCarousel 
                  images={project.images} 
                  title={project.title} 
                  onOpenGallery={() => openModal(i)} 
                />
                <div className="p-8">
                  <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-10">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Code size={20} />
                      </a>
                    )}
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${
                          project.category === 'design' 
                            ? 'text-purple-400 bg-purple-500/10' 
                            : 'text-blue-400 bg-blue-500/10'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <Mail className="text-blue-500" />
            <h3 className="text-2xl font-bold text-white">Contactez-moi</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              {/* eslint-disable react/no-unescaped-entities */}
              <p className="text-slate-400 mb-8 leading-relaxed">
                Besoin d'une analyse statistique, d'une solution Web ou d'une réalisation visuelle ? 
                N'hésitez pas à m'envoyer un message. Je vous répondrai dans les plus brefs délais.
              </p>
              {/* eslint-enable react/no-unescaped-entities */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email personnel</p>
                    <a href="mailto:barroyacouba192962@gmail.com" className="text-slate-200 hover:text-blue-400 transition-colors font-medium">barroyacouba192962@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">WhatsApp & Appel</p>
                    <p className="text-slate-200 font-medium">(+226) 66 54 84 30 / 68 54 36 46</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Localisation</p>
                    <p className="text-slate-200 font-medium">Ouagadougou</p>
                  </div>
                </div>
              </div>
            </div>

            <form ref={formRef} className="space-y-4" onSubmit={sendEmail}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">Nom complet</label>
                  <input type="text" name="user_name" id="name" required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Ex: Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Votre Email</label>
                  <input type="email" name="user_email" id="email" required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all" placeholder="votre@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-300">Sujet</label>
                <input type="text" name="subject" id="subject" required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Objet de votre demande" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">Votre Message</label>
                <textarea name="message" id="message" rows={4} required className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all resize-none" placeholder="Dites-m'en plus sur votre projet..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSending || isSuccess}
                className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg group ${
                  isSuccess ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                }`}
              >
                {isSending ? 'Envoi en cours...' : isSuccess ? 'Message envoyé !' : 'Envoyer le message'}
                {isSuccess ? (
                  <CheckCircle size={18} className="animate-bounce" />
                ) : (
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-mono italic">
            const date = new Date(&quot;{new Date().getFullYear()}&quot;);
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-all duration-300 hover:scale-125" title="GitHub">
                <GitHubIcon size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-all duration-300 hover:scale-125" title="LinkedIn">
                <LinkedInIcon size={20} />
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
              <Globe size={16} />
              <span className="text-sm">Disponible pour missions freelance</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
