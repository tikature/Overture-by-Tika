import AmbientStage from "@/components/layout/AmbientStage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import TypingEffect from "@/components/sections/TypingEffect";
import StageCard from "@/components/sections/StageCard";
import TechTicker from "@/components/sections/TechTicker";
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
                  asChild
                >
                  <a href="#projects" className="inline-flex items-center justify-center space-x-2.5">
                    <LucideCompass className="w-4 h-4" />
                    <span>Explore Productions</span>
                  </a>
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  asChild
                >
                  <a href={siteConfig.resume} download className="inline-flex items-center justify-center space-x-2">
                    <LucideScroll className="w-4 h-4" />
                    <span>Download Resume / CV</span>
                  </a>
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
            />
            <p className="text-center text-softCream">About section placeholder</p>
          </div>
        </section>

        {/* Productions */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-darkCream/20 bg-darkBurgundy/20 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="THE PLAYBILL" title="Featured Productions & Acts" />
            <p className="text-center text-softCream">Productions grid placeholder</p>
          </div>
        </section>

        {/* Repertoire */}
        <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="MASTERCLASS & REPERTOIRE" title="Technical Proficiency" />
            <p className="text-center text-softCream">Repertoire placeholder</p>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-darkCream/20 bg-darkBurgundy/20 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="THE JOURNEY" title="Experience" />
            <p className="text-center text-softCream">Experience timeline placeholder</p>
          </div>
        </section>

        {/* Laurels */}
        <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="THE HALL OF FAME" title="Laurels" />
            <p className="text-center text-softCream">Certificates placeholder</p>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-darkCream/20 bg-darkBurgundy/20 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading eyebrow="CRITICS' REVIEWS" title="Testimonials" />
            <p className="text-center text-softCream">Reviews placeholder (hidden when empty)</p>
          </div>
        </section>

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