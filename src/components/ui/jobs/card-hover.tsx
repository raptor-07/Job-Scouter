"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Card } from "./card";
import { CardDescription } from "./card-description";
import { CardTitle } from "./card-title";
import { IconLink } from "@tabler/icons-react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    company_link: string;
    job_link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 py-10", className)}>
      {items.map((item, idx) => (
        <div
          key={item?.company_link}
          className="relative group block p-6 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-purple-400/[0.2] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle item={item}>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <div className=" text-primary-500 dark:text-fuchsia-50 opacity-90">
              <a
                className="flex items-center justify-start mt-9"
                href={item.job_link}
              >
                <p className=" text-s mr-2">View job</p>
                <IconLink stroke={2} />
              </a>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};
