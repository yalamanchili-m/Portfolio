import { MotionConfig } from "framer-motion";
import { NavBar } from "@/components/layout/NavBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { EducationSection } from "@/components/sections/EducationSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { HorizontalExperienceTimeline } from "@/components/sections/HorizontalExperienceTimeline";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { BeyondTechSection } from "@/components/sections/BeyondTechSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Single-page modern editorial portfolio. Full-width 1440px frame with
 * the section flow: Hero → Education → Projects → Experience →
 * Certifications → Beyond Tech → Contact. Reduced motion
 * is honored globally via MotionConfig.
 */
export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <NavBar />

      <main id="main">
        <Hero />
        {/* "About" gathers the supporting sections behind one anchor. */}
        <div id="about" className="scroll-mt-24">
          <EducationSection />
        </div>
        <ProjectsSection />
        <HorizontalExperienceTimeline />
        <CertificationsSection />
        <BeyondTechSection />
        <ContactSection />
      </main>

      <SiteFooter />
    </MotionConfig>
  );
}
