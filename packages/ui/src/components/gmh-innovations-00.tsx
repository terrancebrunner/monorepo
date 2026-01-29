import { InnovationsHero } from './gmh-innovations-hero';
import { InnovationsSection } from './gmh-innovations-section';

function PageLayout() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#033C5A] via-[#00253b] to-[#001a2e] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#AA9868] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-[#AA9868]/30 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Side margins with subtle gradients */}
      <div className="flex flex-row items-center justify-center min-h-screen">
        <div className="w-24 shrink-0 h-full bg-gradient-to-r from-[#033C5A]/50 to-transparent" />
        <div className="min-h-screen w-full relative">
          <InnovationsHero />
          <InnovationsSection />
        </div>
        <div className="w-24 shrink-0 h-full bg-gradient-to-l from-[#033C5A]/50 to-transparent" />
      </div>
    </div>
  );
}

export function Innovations() {
  return (
    <div className="relative size-full">
      <PageLayout />
    </div>
  );
}
