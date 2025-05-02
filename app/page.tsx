"use client";

import { AboutMeSection } from "@/components/about-me-section";
import ContentLayout from "@/components/content-layout";

export default function Home() {
  return (
    <ContentLayout currentPage="about">
      <AboutMeSection />
    </ContentLayout>
  );
}
