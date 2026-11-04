import React from "react";
import { siteConfig } from "@/data/site";
import ContactForm from "@/components/sections/ContactForm";
import SectionHeading from "@/components/ui/SectionHeading";
import { LucideGithub, LucideLinkedin, LucideMail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="BACKSTAGE INQUIRIES & COMMISSION"
          title={
            <>Send a Dispatch <span className="italic text-darkCream font-serif">to the Maestro</span></>
          }
        >
          Commission a premier digital stage, propose a principal engineering engagement, or discuss an artistic collaboration.
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* Email */}
            <div>
              <h3 className="text-cream font-opera uppercase tracking-wider text-xs font-bold mb-3">Direct Correspondence</h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center space-x-2 text-ivoryCream hover:text-cream transition-colors"
              >
                <LucideMail className="w-5 h-5" />
                <span className="font-body">{siteConfig.email}</span>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-cream font-opera uppercase tracking-wider text-xs font-bold mb-3">Connect Backstage</h3>
              <div className="flex flex-col space-y-3">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-ivoryCream hover:text-cream transition-colors"
                >
                  <LucideGithub className="w-5 h-5" />
                  <span className="font-body">GitHub</span>
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-ivoryCream hover:text-cream transition-colors"
                >
                  <LucideLinkedin className="w-5 h-5" />
                  <span className="font-body">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-obsidianBurgundy/80 border border-darkCream/20 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-cream animate-pulse" />
                <span className="text-xs font-opera uppercase tracking-wider text-cream font-bold">Status</span>
              </div>
              <p className="text-softCream/80 text-sm font-body">{siteConfig.availability}</p>
            </div>

            {/* Location */}
            {siteConfig.location && (
              <div className="bg-obsidianBurgundy/80 border border-darkCream/20 p-4 rounded-2xl backdrop-blur-md">
                <p className="text-xs font-opera uppercase tracking-wider text-darkCream font-bold mb-2">Location</p>
                <p className="text-softCream/80 text-sm font-body">{siteConfig.location}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}