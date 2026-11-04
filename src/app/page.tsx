import AmbientStage from "@/components/layout/AmbientStage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import TypingEffect from "@/components/sections/TypingEffect";
import StageCard from "@/components/sections/StageCard";
import TechTicker from "@/components/sections/TechTicker";
import ProductionsGrid from "@/components/sections/ProductionsGrid";
import RepertoireSection from "@/components/sections/RepertoireSection";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import LaurelsGrid from "@/components/sections/LaurelsGrid";
import Button from "@/components/ui/Button";
import { LucideCompass, LucideScroll, LucideGithub, LucideLinkedin, LucideMail, LucideInstagram, LucideVideo } from "lucide-react";

export default function HomePage() {
  const socialLinks = [
    { href: siteConfig.github, icon: LucideGithub, label: "GitHub", show: true },
    { href: siteConfig.linkedin, icon: LucideLinkedin, label: "LinkedIn", show: true },
    { href: `mailto:${siteConfig.email}`, icon: LucideMail, label: "Email", show: true },
    { href: siteConfig.instagram, icon: LucideInstagram, label: "Instagram", show: !!siteConfig.instagram },
    { href: siteConfig.tiktok, icon: LucideVideo, label: "TikTok", show: !!siteConfig.tiktok },
  ];

  return (
    <>
      <AmbientStage />
      <Navbar />
      <main className="relative z-10 pt-28">
        {/* Hero / Overture */}
        <section id="home" className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 relative">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-darkBurgundy/60 border border-darkCream/30 backdrop-blur-md shadow-[0_0_15px_rgba(128,0,32,0.4)]">
                <span className="w-2 h-2 rounded-full bg-cream shadow-[0_0_8px_#FFF5E1]"></span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-ivoryCream font-opera font-bold">Frontend Developer • Software Engineer</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-cream font-display tracking-tight leading-[1.15]">
                Hi, I&apos;m <span className="font-opera bg-gradient-to-r from-cream via-ivoryCream to-darkCream bg-clip-text text-transparent">{siteConfig.displayName.toUpperCase()}</span>
              </h1>
              <p className="text-softCream/85 text-sm sm:text-base leading-relaxed max-w-xl font-body">
                {siteConfig.description}
              </p>
              
              {/* Typing effect */}
              <TypingEffect />
              
              {/* CTAs and Socials */}
              <div className="flex flex-wrap items-center gap-4 pt-3 w-full">
                <Button
                  variant="primary"
                  size="md"
                  href="#projects"
                >
                  <LucideCompass className="w-4 h-4 mr-2.5" />
                  <span>Explore Productions</span>
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  href={siteConfig.resume}
                >
                  <LucideScroll className="w-4 h-4 mr-2" />
                  <span>Download Resume / CV</span>
                </Button>
                
                {/* Social Badges Pill Group */}
                <div className="flex items-center space-x-2 bg-obsidianBurgundy/90 border border-darkCream/25 rounded-full px-3 py-2 shadow-lg">
                  {socialLinks.map((social, idx) =>
                    social.show && (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-warmCream/80 hover:text-cream hover:bg-darkBurgundy/60 transition-colors"
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
            
            {/* Hero Right Column: Stage Card */}
            <div className="lg:col-span-5 flex justify-center relative pt-6 pb-2">
              <StageCard />
            </div>
          </div>
        </section>

        {/* Technical Ensemble */}
        <TechTicker />

        {/* About / The Stage */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative proscenium-arch">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="PROSCENIUM & VISION"
              title={
                <>The Story Behind <span className="italic text-darkCream font-serif">the Stage</span></>
              }
            >
              Years of conducting complex frontend architectures as a dramatic theatrical overture. Every layout is a stage, every interaction a cue, and every release an ovation.
            </SectionHeading>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Stats left */}
              <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-4">
                {/* These are TODO stats from CONTENT.md */}
                <div className="bg-obsidianBurgundy/80 border border-darkCream/20 p-5 rounded-2xl backdrop-blur-md hover:border-darkCream transition-all group shadow-lg">
                  <span className="text-3xl sm:text-4xl font-extrabold text-cream font-display group-hover:text-ivoryCream transition-colors">3+</span>
                  <p className="text-xs uppercase tracking-wider text-warmCream/70 mt-1 font-opera font-semibold">Years on Stage</p>
                </div>
                <div className="bg-obsidianBurgundy/80 border border-darkCream/20 p-5 rounded-2xl backdrop-blur-md hover:border-darkCream transition-all group shadow-lg">
                  <span className="text-3xl sm:text-4xl font-extrabold text-cream font-display group-hover:text-ivoryCream transition-colors">50+</span>
                  <p className="text-xs uppercase tracking-wider text-warmCream/70 mt-1 font-opera font-semibold">Productions Staged</p>
                </div>
                <div className="bg-obsidianBurgundy/80 border border-darkCream/20 p-5 rounded-2xl backdrop-blur-md hover:border-darkCream transition-all group shadow-lg">
                  <span className="text-3xl sm:text-4xl font-extrabold text-cream font-display group-hover:text-ivoryCream transition-colors">20+</span>
                  <p className="text-xs uppercase tracking-wider text-warmCream/70 mt-1 font-opera font-semibold">Standing Ovations</p>
                </div>
                <div className="bg-obsidianBurgundy/80 border border-darkCream/20 p-5 rounded-2xl backdrop-blur-md hover:border-darkCream transition-all group shadow-lg">
                  <span className="text-3xl sm:text-4xl font-extrabold text-cream font-display group-hover:text-ivoryCream transition-colors">24/7</span>
                  <p className="text-xs uppercase tracking-wider text-warmCream/70 mt-1 font-opera font-semibold">Backstage Readiness</p>
                </div>
              </div>
              
              {/* Arch SVG */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center relative my-8 lg:my-0">
                <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-burgundy/20 blur-[100px] pointer-events-none" />
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                  <svg
                    className="w-full h-auto filter drop-shadow-[0_0_35px_rgba(128,0,32,0.4)]"
                    fill="none"
                    viewBox="0 0 500 420"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id="archDrapeBurgundy"
                        x1="250"
                        x2="250"
                        y1="40"
                        y2="360"
                      >
                        <stop stopColor="#9B1D30" />
                        <stop offset="0.5" stopColor="#800020" />
                        <stop offset="1" stopColor="#3B0A12" />
                      </linearGradient>
                      <linearGradient id="creamTrimGrad" x1="0" x2="1" y1="0" y2="0">
                        <stop stopColor="#DCC8A3" />
                        <stop offset="0.5" stopColor="#FFF5E1" />
                        <stop offset="1" stopColor="#DCC8A3" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 40 380 L 40 220 A 210 210 0 0 1 460 220 L 460 380"
                      fill="none"
                      stroke="url(#creamTrimGrad)"
                      strokeWidth="6"
                    />
                    <path
                      d="M 60 380 L 60 220 A 190 190 0 0 1 440 220 L 440 380"
                      fill="none"
                      stroke="#5E0F1A"
                      strokeWidth="3"
                    />
                    <polygon
                      fill="#FFF5E1"
                      points="250,8 270,35 230,35"
                      stroke="#DCC8A3"
                      strokeWidth="1.5"
                    />
                    <circle cx="250" cy="22" fill="#800020" r="5" />
                    <path
                      d="M 60 160 Q 150 140 250 180 Q 350 140 440 160 L 440 360 C 370 300 330 240 310 180 C 270 230 230 230 190 180 C 170 240 130 300 60 360 Z"
                      fill="url(#archDrapeBurgundy)"
                      stroke="#DCC8A3"
                      strokeWidth="1.5"
                    />
                    <line stroke="#DCC8A3" strokeWidth="1.5" x1="250" x2="250" y1="60" y2="130" />
                    <ellipse cx="250" cy="132" fill="#FFF5E1" rx="36" ry="7" />
                    <ellipse cx="250" cy="150" fill="#DCC8A3" rx="22" ry="5" />
                    <polygon fill="#FFF5E1" points="250,156 246,175 254,175" />
                    <polygon fill="#FFF5E1" points="230,138 227,152 233,152" />
                    <polygon fill="#FFF5E1" points="270,138 267,152 273,152" />
                    <circle cx="250" cy="124" fill="#FFF5E1" r="3.5" />
                    <circle cx="235" cy="126" fill="#F7ECD4" r="3" />
                    <circle cx="265" cy="126" fill="#F7ECD4" r="3" />
                    <rect
                      fill="#24070D"
                      height="24"
                      rx="4"
                      stroke="#DCC8A3"
                      strokeWidth="2"
                      width="440"
                      x="30"
                      y="380"
                    />
                    <line stroke="#FFF5E1" strokeWidth="1.5" x1="40" x2="460" y1="384" y2="384" />
                  </svg>
                </div>
                <p className="text-xs uppercase tracking-[0.25em] text-darkCream font-opera font-bold mt-2">
                  OPÉRA GARNIER • STAGECRAFT & MASTERY
                </p>
              </div>
              
              {/* Principles right */}
              <div className="lg:col-span-3 flex flex-col space-y-5">
                <div className="bg-obsidianBurgundy/80 border border-darkCream/20 p-6 rounded-2xl backdrop-blur-md hover:border-darkCream transition-all shadow-lg">
                  <h3 className="text-cream font-bold text-base mb-2 font-opera flex items-center">
                    <svg aria-hidden="true" className="lucide lucide-sparkles w-4 h-4 mr-2 text-wineRed" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                      <path d="M20 2v4"></path>
                      <path d="M22 4h-4"></path>
                      <circle cx="4" cy="20" r="2"></circle>
                    </svg>
                    Directing the Interaction
                  </h3>
                  <p className="text-softCream/80 text-xs sm:text-sm leading-relaxed font-body">
                    Treating user journeys as scripted scenes where visual hierarchy, fluid micro-interactions, and flawless speed deliver undeniable drama.
                  </p>
                </div>
                <div className="bg-obsidianBurgundy/80 border border-darkCream/20 p-6 rounded-2xl backdrop-blur-md hover:border-darkCream transition-all shadow-lg">
                  <h3 className="text-cream font-bold text-base mb-2 font-opera flex items-center">
                    <svg aria-hidden="true" className="lucide lucide-target w-4 h-4 mr-2 text-wineRed" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    Stagecraft & Precision
                  </h3>
                  <p className="text-softCream/80 text-xs sm:text-sm leading-relaxed font-body">
                    Behind the velvet curtains lies rigorous engineering: maintainable component architecture, strict type safety, and impeccable performance standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Productions */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-darkCream/20 bg-darkBurgundy/20 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="THE PLAYBILL" title="Featured Productions & Acts" />
            <ProductionsGrid />
          </div>
        </section>

        {/* Repertoire */}
        <RepertoireSection />

        {/* Experience */}
        <ExperienceTimeline />

        {/* Laurels */}
        <LaurelsGrid />

        {/* Reviews */}
        {false && (
          <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-darkCream/20 bg-darkBurgundy/20 relative">
            <div className="max-w-7xl mx-auto">
              <SectionHeading eyebrow="CRITICS' REVIEWS" title="Testimonials" />
              <p className="text-center text-softCream">Reviews placeholder (hidden when empty)</p>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="BACKSTAGE INQUIRIES & COMMISSION" title="Send a Dispatch to the Maestro" />
            <p className="text-center text-softCream">Contact form placeholder</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}