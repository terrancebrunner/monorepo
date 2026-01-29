import { InnovationCard } from './gmh-innovations-card';
import { MessageSquareHeart, Camera } from 'lucide-react';

export function InnovationsSection() {
  return (
    <div className="flex flex-col gap-4 items-center justify-start max-w-6xl overflow-visible p-0 relative w-full mt-20">
      <div className="flex flex-col gap-12 items-center justify-start max-w-6xl overflow-visible pb-20 pt-0 px-8 relative w-full">
        <div className="flex flex-wrap gap-12 items-start justify-center p-0 relative max-w-4xl">
          <InnovationCard
            title="EQUIP"
            description={
              <>
                <span className="font-bold text-[#033C5A]">EQUIP is for trainers and supervisors</span>
                <span className="text-gray-600"> to improve the quality of their teams's psychosocial and mental health helping skills.</span>
              </>
            }
            imageFilter="from-blue-600/60 to-blue-800/80"
            icon={<MessageSquareHeart />}
          />
          <InnovationCard
            title="PhotoVoice™"
            description={
              <>
                <span className="font-bold text-[#033C5A]">Photography and digital storytelling</span>
                <span className="text-gray-600"> to address stigma in the context of mental health.</span>
              </>
            }
            imageFilter="from-blue-700/60 to-indigo-800/80"
            icon={<Camera />}
          />
        </div>
      </div>
    </div>
  );
}
