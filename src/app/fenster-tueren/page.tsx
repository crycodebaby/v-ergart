// src/app/fenster-und-tueren/page.tsx
import { ShowroomDashboard } from "@/components/ShowroomDashboard";
import CTA from "@/components/CTA";
import { HandwerkskammerCard } from "@/components/HandwerkskammerCard";

export default function FensterTuerenDashboardPage() {
  return (
    <>
      <ShowroomDashboard />
      <div className="container mx-auto px-4">
        <HandwerkskammerCard />
      </div>
      <CTA />
    </>
  );
}
