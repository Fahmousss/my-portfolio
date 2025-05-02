import { ConnectionsSection } from "@/components/connection-section";
import ContentLayout from "@/components/content-layout";
import React from "react";

export default function ConnectionsPage() {
  return (
    <ContentLayout currentPage="connections">
      <ConnectionsSection />
    </ContentLayout>
  );
}
