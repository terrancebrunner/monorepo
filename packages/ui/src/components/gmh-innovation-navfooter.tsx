"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function NavigationFooter() {
  return (
    <div className="bg-[#5A6C7D] py-6 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white hover:text-[#AA9868] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>PREV</span>
          </motion.button>

          <div className="flex items-center gap-4">
            <span className="text-white text-sm">ALL INNOVATIONS</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((dot) => (
                <motion.div
                  key={dot}
                  whileHover={{ scale: 1.3 }}
                  className={`w-2 h-2 rounded-full ${dot === 3 ? "bg-[#AA9868]" : "bg-white/50"} cursor-pointer`}
                ></motion.div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white hover:text-[#AA9868] transition-colors"
          >
            <span>NEXT</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}