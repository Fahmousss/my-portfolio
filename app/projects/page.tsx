import ContentLayout from "@/components/content-layout";
import { ProjectsSection } from "@/components/project-section";
import React from "react";

export default function ProjectsPage() {
  return (
    <ContentLayout currentPage="projects">
      <ProjectsSection />
    </ContentLayout>
  );
}
