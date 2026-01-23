"use client";

import { motion } from "motion/react";
import { Card } from "./ui";
import { User, Quote } from "lucide-react";

export function UserStorySection() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto ">
        <h2 className="text-5xl md:text-6xl font-serif text-white text-center mb-16">Who has used it?</h2>

        <div>
          <Card className="p-8 bg-white/10 backdrop-blur-sm shadow-2xl overflow-hidden relative border-white/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#AA9868]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#033C5A]/10 rounded-full blur-3xl"></div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Quote className="w-8 h-8 text-[#AA9868]" />
                  <h3 className="text-white">
                    I want to tell about User Story
                  </h3>
                </div>

                <p className="text-white/90 mb-4 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <p className="text-white/90 mb-4 leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>

                <p className="text-white/90 mb-6 leading-relaxed">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>

                <div className="bg-[#AA9868] text-white p-4 rounded-lg inline-block">
                  <p className="text-sm italic">
                    "This innovation has transformed the way we approach our
                    daily challenges and significantly improved our workflow
                    efficiency."
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="bg-gradient-to-br from-[#033C5A] to-[#AA9868] w-48 h-48 rounded-full flex items-center justify-center shadow-2xl mb-6">
                  <User className="w-24 h-24 text-white" />
                </div>

                <div className="text-center">
                  <h4 className="text-white mb-2">Sarah Johnson</h4>
                  <p className="text-white/80">Senior Product Manager</p>
                  <p className="text-sm text-[#AA9868] mt-2">
                    Technology Solutions Inc.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}