"use client";

import { AuroraBackground } from "@/components/ui/landing-page/aurora-background";
import { motion } from "framer-motion";
import {
  HeroHighlight,
  Highlight,
} from "@/components/ui/landing-page/hero-highlight";
import { Button } from "@/components/ui/landing-page/moving-border";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <HeroHighlight>
        <div className="flex flex-col items-center justify-center">
          <motion.h1
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 1.8, // Increase the duration to 1 second
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto min-w-[100%]"
          >
            <p>
              Scout your next big job with{" "}
              <Highlight className="text-black dark:text-white">
                Job Scouter
              </Highlight>
            </p>
          </motion.h1>
          <motion.div 
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 7, // Increase the duration to 1 second
            ease: [0.5, 0.0, 0.2, 1],
          }}
          className="mt-8">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-violet-300  ease-in-out"
            >
              TRY FOR FREE
            </Button>
          </motion.div>
        </div>
      </HeroHighlight>
    </div>
  );
}
