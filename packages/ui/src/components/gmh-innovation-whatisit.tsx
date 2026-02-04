"use client";

import {
  Card,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui";

export function WhatIsItSection() {
  return (
    <div className="py-20" >
    <div className="w-full container mx-auto px-4">
      <h2 className="text-5xl md:text-6xl font-serif text-white text-center mb-16">What is it?</h2>
      <div>
      <Card className="p-8 bg-white/10 backdrop-blur-sm shadow-2xl border-white/20">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white mb-4">
              Intro headline to hook and read at the module
            </h3>
            <p className="text-white/90 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="capability-1" className="bg-white/10 rounded border-none">
                <AccordionTrigger className="px-3 py-3 text-sm text-white hover:no-underline [&>svg]:text-white">
                  Capability lorem
                </AccordionTrigger>
                <AccordionContent className="px-3 text-white/80">
                  Details about capability lorem go here.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="capability-2" className="bg-white/10 rounded border-none">
                <AccordionTrigger className="px-3 py-3 text-sm text-white hover:no-underline [&>svg]:text-white">
                  Capability ipsum
                </AccordionTrigger>
                <AccordionContent className="px-3 text-white/80">
                  Details about capability ipsum go here.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="capability-3" className="bg-white/10 rounded border-none">
                <AccordionTrigger className="px-3 py-3 text-sm text-white hover:no-underline [&>svg]:text-white">
                  Capability dolor
                </AccordionTrigger>
                <AccordionContent className="px-3 text-white/80">
                  Details about capability dolor go here.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-6 bg-[#AA9868] text-white p-4 rounded inline-block">
              <p className="text-sm">Special feature highlight</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-8 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#AA9868]/20 to-white/10"></div>
            <div className="relative z-10 text-center">
              <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <div className="w-24 h-24 bg-gradient-to-br from-[#AA9868] to-white rounded-full"></div>
              </div>
              <p className="text-white/80">Visual representation</p>
            </div>
          </div>
        </div>
      </Card>
      </div>
    </div>
    </div> 
  );
}