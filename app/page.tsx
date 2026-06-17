"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logo42 from "./components/Logo42";

/* ── useReveal: IntersectionObserver → ajoute .visible ── */
function useReveal(selector: string, options?: IntersectionObserverInit) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "-60px", ...options });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

/* ── data ── */
const NAV_LINKS = [
  { label: "Concept",  href: "#concept"  },
  { label: "Formules", href: "#formules" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "Contact",  href: "#contact"  },
];

const PILLARS = [
  { num: "01", title: "Flexibilité",          body: "Vos séances s'adaptent à vos horaires, vos déplacements, votre fatigue. Aucun cadre rigide — votre plan suit votre vraie semaine." },
  { num: "02", title: "Suivi Précis",          body: "Chaque séance est analysée : allure, cardio, ressenti. Les données guident les décisions — jamais l'intuition seule." },
  { num: "03", title: "Adaptation Permanente", body: "Le plan évolue chaque semaine selon vos retours. Une blessure, un voyage, une forme exceptionnelle — tout est recalibré." },
  { num: "04", title: "Accompagnement Pro",    body: "Un coach diplômé, joignable, qui connaît votre dossier. Pas un algorithme — une personne qui vous accompagne dans la durée." },
];

const FORMULES = [
  { num:"N°01", tag:"Entrée", name:"PROGRESSION", price:"89€/mois", cta:"COMMENCER", featured:false,
    sub:"L'essentiel pour progresser avec un plan d'entraînement personnalisé et un suivi professionnel.",
    features:[
      "Entretien initial de découverte",
      "Programme d'entraînement 100% personnalisé",
      "Running, Trail, HYROX ou Triathlon",
      "Synchronisation avec votre montre GPS",
      "Analyse des données via application (FC, allures, RPE, charge...)",
      "Plateforme de suivi smartphone & ordinateur",
      "Ajustement bi-mensuel du programme",
      "Assistance via WhatsApp",
      "Réponse sous 48h ouvrées",
    ]},
  { num:"N°02", tag:"Évolutif", name:"PERFORMANCE", price:"109€/mois", cta:"CHOISIR", featured:false,
    sub:"Un accompagnement renforcé pour optimiser votre progression et rester pleinement encadré.",
    features:[
      "Tous les avantages de la formule Progression",
      "Ajustements hebdomadaires du programme",
      "1 entretien téléphonique individuel par mois",
      "Assistance prioritaire via WhatsApp",
      "Réponse sous 24h ouvrées",
      "Accompagnement par des coachs de haut niveau",
    ]},
  { num:"N°03", tag:"Signature·Premium", name:"PREMIUM", price:"149€/mois", cta:"POSTULER", featured:true,
    sub:"L'accompagnement le plus complet pour atteindre vos objectifs les plus ambitieux.",
    features:[
      "Tous les avantages de la formule Performance",
      "Analyse avancée de la performance et du suivi",
      "Préparation personnalisée des compétitions",
      "Assistance VIP via WhatsApp",
      "Réponse sous 12h ouvrées",
      "2 entretiens téléphoniques individuels par mois",
      "1 visioconférence thématique par mois",
      "Accompagnement par des coachs et sportifs de haut niveau",
    ]},
];

const TEMOIGNAGES = [
  {
    photo: null,
    prenom: "ElHocine",
    nom: "Zourkane",
    niveau: "ÉLITE",
    perfs: [
      { distance: "1500m", chrono: "3:37:57" },
      { distance: "10K", chrono: "29:56" },
      { distance: "Semi", chrono: "1:06:17" },
    ],
    quote: "Avant 42 Run Club, je stagnais. Le plan était construit pour moi, semaine après semaine — pas une méthode générique. En quelques mois j'ai descendu mon chrono sur 10K et explosé mon record sur semi. Le suivi fait toute la différence.",
  },
  {
    photo: null,
    prenom: "Clémence",
    nom: "Calvin",
    niveau: "ÉLITE",
    perfs: [
      { distance: "10K", chrono: "31:20" },
      { distance: "Semi", chrono: "1:09:54" },
      { distance: "Marathon", chrono: "2:25:24" },
    ],
    quote: "Concilier haut niveau et vie de tous les jours demande une rigueur sans faille. 42 Run Club m'a offert un plan ajusté à chaque cycle, sans jamais sacrifier la récupération. Mon record sur marathon en est la preuve : le travail bien dosé paie toujours.",
  },
  {
    photo: null,
    prenom: "Prénom",
    nom: "NOM",
    niveau: "ÉLITE",
    perfs: [{ distance: "Trail", chrono: "X:XX:XX" }],
    quote: "Témoignage à venir.",
  },
  {
    photo: null,
    prenom: "Prénom",
    nom: "NOM",
    niveau: "AMATEUR",
    perfs: [{ distance: "Semi", chrono: "X:XX:XX" }],
    quote: "Témoignage à venir.",
  },
];

const GR = "linear-gradient(90deg,#1B3A8C 0%,#2563EB 33%,#E91E8C 66%,#FF6BB5 100%)";
const gText = { background:GR, WebkitBackgroundClip:"text" as const, WebkitTextFillColor:"transparent", backgroundClip:"text" as const };

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useReveal(".reveal");
  useReveal(".reveal-left");
  useReveal(".pillar-bar");

  return (
    <main className="bg-[#08080C] text-white overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav style={{ animation:"nav-drop 0.6s cubic-bezier(0.25,0.1,0.25,1) both" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#08080C]/80 backdrop-blur-md border-b border-white/5">
        <a href="#" aria-label="42 Run Club — Accueil">
          <Image src="/nouveau logo 42.png" alt="42 Run Club" width={52} height={52} className="object-contain" priority />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}
              className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-[#94929E] hover:text-white transition-colors uppercase">
              {l.label}
            </a>
          ))}
          <a href="#contact"
            className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest uppercase px-5 py-2 border border-[#E91E8C] text-[#E91E8C] hover:bg-[#E91E8C] hover:text-white transition-all">
            Rejoindre
          </a>
        </div>
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
        {menuOpen && (
          <div id="mobile-menu" className="absolute top-full left-0 right-0 bg-[#08080C] border-b border-white/5 flex flex-col gap-4 px-6 py-6 md:hidden" role="navigation" aria-label="Menu mobile">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-[#94929E] hover:text-white uppercase">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 overflow-hidden">
        {/* Vidéo de fond */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0 pointer-events-none" style={{ background:"rgba(8,8,12,0.55)", zIndex: 1 }} />
        {/* glows CSS */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 85% 20%, rgba(233,30,140,0.18) 0%, transparent 55%), radial-gradient(ellipse at 10% 75%, rgba(37,99,235,0.15) 0%, transparent 50%)",
          zIndex: 2
        }} />

        <div className="relative text-center max-w-5xl mx-auto" style={{ zIndex: 3 }}>
          {/* Logo */}
          <div className="flex justify-center mb-8"
            style={{ animation:"hero-scale 1s cubic-bezier(0.16,1,0.3,1) both" }}>
            <Image
              src="/nouveau logo 42.png"
              alt="42 Run Club"
              width={500}
              height={500}
              className="object-contain w-[260px] md:w-[380px] lg:w-[440px]"
              priority
              unoptimized
            />
          </div>
          <p className="font-[family-name:var(--font-barlow)] font-bold text-xl md:text-3xl uppercase tracking-wider text-white/90 mb-2"
            style={{ animation:"fade-left 0.7s 0.6s ease both" }}>
            Entraînement sur mesure.
          </p>
          <p className="font-[family-name:var(--font-barlow)] font-bold text-xl md:text-3xl uppercase tracking-wider"
            style={{ ...gText, background:"linear-gradient(90deg,#E91E8C,#FF6BB5)", animation:"fade-right 0.7s 0.75s ease both" }}>
            ROUTE — TRAIL — HYROX — TRIATHLON
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation:"fade-up 0.6s 1s ease both" }}>
            <a href="#formules"
              className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest uppercase px-8 py-4 text-white hover:opacity-90 transition-opacity"
              style={{ background:GR }}>
              Voir les formules →
            </a>
            <a href="#concept"
              className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest uppercase px-8 py-4 border border-white/20 text-white hover:border-white/50 transition-colors">
              Notre approche
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation:"fade-up 0.6s 1.5s ease both" }}>
          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-widest text-[#94929E] uppercase">Défiler</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#94929E" strokeWidth="1.5"
            style={{ animation:"bounce-arrow 1.5s ease-in-out infinite" }}>
            <path d="M8 3v10M3 8l5 5 5-5"/>
          </svg>
        </div>
      </section>

      {/* ── MANIFESTE ── */}
      <section id="concept" className="relative py-24 md:py-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] opacity-60 pointer-events-none"
          style={{ background:"linear-gradient(90deg,transparent,#2563EB,#E91E8C,transparent)" }} />
        <div className="max-w-5xl mx-auto">
          <div className="reveal font-[family-name:var(--font-barlow)] font-extrabold uppercase leading-none"
            style={{ fontSize:"clamp(52px,10vw,110px)", transitionDelay:"0.1s" }}>
            <span style={{ color:"#fff" }}>CHAQUE </span>
            <span style={gText}>ATHLÈTE </span>
            <span style={{ color:"#fff" }}>EST UNIQUE.</span>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { tag:"01 Concept",    text:"Un accompagnement 100% personnalisé, entièrement à distance — chaque plan est construit pour un seul coureur, jamais dupliqué.", accent:"#2563EB", delay:"0.1s" },
              { tag:"02 Philosophie",text:"Adapté au niveau, aux objectifs, au mode de vie, aux sensations. L'entraînement suit l'athlète — pas l'inverse.",                 accent:"#E91E8C", delay:"0.2s" },
              { tag:"03 Promesse",   text:"Progresser efficacement, éviter les erreurs, atteindre ses objectifs — 5K, marathon trail, Hyrox ou triathlon.",                                    accent:"#FF6BB5", delay:"0.3s" },
            ].map((item) => (
              <div key={item.tag} className="reveal border-t pt-6" style={{ borderColor:item.accent, transitionDelay:item.delay }}>
                <p className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest uppercase mb-4" style={{ color:item.accent }}>{item.tag}</p>
                <p className="font-[family-name:var(--font-barlow)] font-bold uppercase text-sm md:text-base leading-relaxed text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILIERS ── */}
      <section className="py-24 md:py-32 px-6 bg-[#2C2A38]/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal font-[family-name:var(--font-barlow)] font-extrabold uppercase text-4xl md:text-6xl text-white mb-16" style={{ transitionDelay:"0.1s" }}>4 Piliers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PILLARS.map((p, i) => (
              <div key={p.num} className="reveal relative p-8 border border-white/10 hover:border-white/25 hover:translate-x-1 transition-all group"
                style={{ background:"#0E0D14", transitionDelay:`${i*0.08}s` }}>
                <div className="pillar-bar absolute top-0 left-0 w-1 h-full"
                  style={{ background:"linear-gradient(180deg,#2563EB,#E91E8C)" }} />
                <p className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-[#94929E] uppercase mb-4">Pilier {p.num}</p>
                <h3 className="font-[family-name:var(--font-barlow)] font-extrabold uppercase text-2xl md:text-3xl text-white mb-4">{p.title}</h3>
                <p className="font-[family-name:var(--font-barlow)] font-bold uppercase text-sm leading-relaxed text-readable">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULES ── */}
      <section id="formules" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal font-[family-name:var(--font-barlow)] font-extrabold uppercase text-4xl md:text-6xl text-white mb-4" style={{ transitionDelay:"0.1s" }}>Les Formules</h2>
          <p className="reveal font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-[#94929E] uppercase mb-16" style={{ transitionDelay:"0.15s" }}>
            Trois niveaux · Du plan personnalisé au coaching haut de gamme · Engagement mensuel
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {FORMULES.map((f, i) => (
              <div key={f.num} className="reveal relative flex flex-col p-8 border hover:-translate-y-1.5 transition-all"
                style={{
                  ...(f.featured ? { background:"linear-gradient(135deg,#1B3A8C15,#E91E8C15)", borderColor:"#2563EB55" } : { background:"#0E0D14", borderColor:"rgba(255,255,255,0.1)" }),
                  transitionDelay:`${i*0.1}s`,
                }}>
                {f.featured && <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background:GR }} />}
                <p className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-[#94929E] uppercase mb-6">{f.num} · {f.tag}</p>
                <h3 className="font-[family-name:var(--font-barlow)] font-extrabold uppercase leading-none mb-2"
                  style={{ fontSize:"clamp(32px,5vw,52px)", ...(f.featured ? { background:"linear-gradient(90deg,#E91E8C,#FF6BB5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" } : { color:"#fff" }) }}>
                  {f.name}
                </h3>
                <p className="font-[family-name:var(--font-barlow)] font-bold text-2xl text-white mb-4">{f.price}</p>
                <p className="font-[family-name:var(--font-barlow)] font-bold uppercase text-sm leading-relaxed text-readable mb-8 flex-1">{f.sub}</p>
                <ul className="space-y-3 mb-10">
                  {f.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <span style={{ color:"#E91E8C" }} className="text-xs flex-shrink-0 mt-0.5">◆</span>
                      <span className="font-[family-name:var(--font-jetbrains)] text-xs tracking-wider text-white/70 uppercase">{feat}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact"
                  className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest uppercase px-6 py-4 text-center hover:opacity-90 transition-opacity"
                  style={f.featured ? { background:GR, color:"#fff" } : { border:"1px solid rgba(255,255,255,0.2)", color:"#fff" }}>
                  {f.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section id="temoignages" className="py-24 md:py-32 px-6 bg-[#2C2A38]/20">
        <div className="max-w-6xl mx-auto">
          <p className="reveal font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-[#94929E] uppercase mb-4">Ils courent avec nous</p>
          <h2 className="reveal font-[family-name:var(--font-barlow)] font-extrabold uppercase text-4xl md:text-6xl text-white mb-16" style={{ transitionDelay:"0.1s" }}>Témoignages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} className="reveal flex flex-col gap-6 border border-white/10 p-8 hover:border-white/20 transition-colors"
                style={{ transitionDelay:`${i*0.1}s` }}>
                {/* Header : photo + identité */}
                <div className="flex items-center gap-5">
                  {/* Photo */}
                  <div className="relative shrink-0 w-16 h-16 rounded-full overflow-hidden border border-white/10">
                    {t.photo ? (
                      <Image src={t.photo} alt={`${t.prenom} ${t.nom}`} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"
                        style={{ background:"linear-gradient(135deg,#1B3A8C,#E91E8C)" }}>
                        <span className="font-[family-name:var(--font-barlow)] font-extrabold text-xl text-white">
                          {t.prenom[0]}{t.nom[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Identité */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-barlow)] font-extrabold uppercase text-white text-lg leading-none">
                        {t.prenom} {t.nom}
                      </span>
                      <span className="font-[family-name:var(--font-jetbrains)] text-[9px] tracking-widest uppercase px-2 py-0.5 shrink-0"
                        style={t.niveau === "ÉLITE"
                          ? { background:"linear-gradient(90deg,#1B3A8C,#2563EB)", color:"#fff" }
                          : { border:"1px solid rgba(255,255,255,0.15)", color:"#94929E" }}>
                        {t.niveau}
                      </span>
                    </div>
                    {/* Meilleures perfs */}
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                      {t.perfs.map((p, j) => (
                        <div key={j} className="flex items-baseline gap-2">
                          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-widest text-[#94929E] uppercase">{p.distance}</span>
                          <span className="font-[family-name:var(--font-barlow)] font-extrabold uppercase leading-none"
                            style={{ fontSize:"clamp(18px,3vw,26px)", background:"linear-gradient(90deg,#E91E8C,#FF6BB5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                            {p.chrono}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Séparateur */}
                <div className="h-px w-full" style={{ background:"linear-gradient(90deg,rgba(233,30,140,0.4),transparent)" }} />
                {/* Citation */}
                <p className="font-[family-name:var(--font-barlow)] font-bold text-white/80 text-base md:text-lg leading-relaxed uppercase">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-24 md:py-40 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[150px] pointer-events-none opacity-10"
          style={{ background:"#E91E8C", animation:"glow-right 6s ease-in-out infinite" }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="reveal font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-[#94929E] uppercase mb-8">Prêt à progresser ?</p>
          <h2 className="reveal font-[family-name:var(--font-barlow)] font-extrabold uppercase leading-none mb-8"
            style={{ fontSize:"clamp(40px,8vw,100px)", background:"linear-gradient(90deg,#fff 0%,#fff 50%,#E91E8C 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", transitionDelay:"0.1s" }}>
            Démarrons ensemble.
          </h2>
          <p className="reveal font-[family-name:var(--font-barlow)] font-bold uppercase text-readable text-lg mb-12 max-w-xl mx-auto" style={{ transitionDelay:"0.2s" }}>
            Choisis ta formule et envoie-nous un message. On te répond sous 24h.
          </p>
          <form className="reveal flex flex-col gap-4 max-w-lg mx-auto text-left" style={{ transitionDelay:"0.3s" }} onSubmit={(e) => e.preventDefault()} aria-label="Formulaire de contact">
            <div className="flex flex-col gap-1">
              <label htmlFor="prenom" className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-widest uppercase text-[#94929E]">Prénom <span aria-hidden="true" className="text-[#E91E8C]">*</span></label>
              <input id="prenom" type="text" placeholder="ALESSIO" required autoComplete="given-name"
                className="bg-transparent border border-white/10 outline-none px-6 py-4 font-[family-name:var(--font-jetbrains)] text-xs tracking-widest uppercase text-white placeholder-[#94929E]/50 transition-colors" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-widest uppercase text-[#94929E]">Email <span aria-hidden="true" className="text-[#E91E8C]">*</span></label>
              <input id="email" type="email" placeholder="TON@EMAIL.COM" required autoComplete="email"
                className="bg-transparent border border-white/10 outline-none px-6 py-4 font-[family-name:var(--font-jetbrains)] text-xs tracking-widest uppercase text-white placeholder-[#94929E]/50 transition-colors" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="formule" className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-widest uppercase text-[#94929E]">Formule souhaitée</label>
              <select id="formule" className="bg-[#08080C] border border-white/10 outline-none px-6 py-4 font-[family-name:var(--font-jetbrains)] text-xs tracking-widest uppercase text-[#94929E] transition-colors">
                <option value="">— Choisir —</option>
                <option value="progression">Progression</option>
                <option value="performance">Performance</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="objectif" className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-widest uppercase text-[#94929E]">Ton objectif de course</label>
              <textarea id="objectif" placeholder="MARATHON EN MOINS DE 4H..." rows={4}
                className="bg-transparent border border-white/10 outline-none px-6 py-4 font-[family-name:var(--font-jetbrains)] text-xs tracking-widest uppercase text-white placeholder-[#94929E]/50 transition-colors resize-none" />
            </div>
            <button type="submit"
              className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest uppercase px-8 py-5 text-white hover:opacity-90 transition-opacity mt-2"
              style={{ background:GR }}
              aria-label="Envoyer le formulaire de contact">
              Envoyer →
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Image src="/nouveau logo 42.png" alt="42 Run Club" width={40} height={40} className="object-contain" unoptimized />
        <p className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-[#94929E] uppercase">Entraînement sur mesure. Route — Trail — Hyrox — Triathlon.</p>
      </footer>
    </main>
  );
}
