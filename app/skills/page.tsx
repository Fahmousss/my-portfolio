import ContentLayout from "@/components/content-layout";
import { SkillsSection } from "@/components/skill-section";
import React from "react";

export default function SkillsPage() {
  return (
    <ContentLayout currentPage="skills">
      <SkillsSection />
    </ContentLayout>
  );
}
