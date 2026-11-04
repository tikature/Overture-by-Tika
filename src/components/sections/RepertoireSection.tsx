import AcademicTimeline from "./AcademicTimeline";
import SkillBars from "./SkillBars";

export default function RepertoireSection() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block text-xs uppercase tracking-[0.25em] text-darkCream font-opera font-bold mb-2">
            MASTERCLASS & REPERTOIRE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream font-display">
            Technical Proficiency
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Academic Lineage */}
          <div className="lg:col-span-5">
            <h3 className="text-cream font-bold text-lg mb-6 font-opera uppercase tracking-wider">
              Academic Lineage
            </h3>
            <AcademicTimeline />
          </div>
          
          {/* Right: Technical Proficiency */}
          <div className="lg:col-span-7">
            <h3 className="text-cream font-bold text-lg mb-6 font-opera uppercase tracking-wider">
              Technical Proficiency
            </h3>
            <SkillBars />
          </div>
        </div>
      </div>
    </section>
  );
}