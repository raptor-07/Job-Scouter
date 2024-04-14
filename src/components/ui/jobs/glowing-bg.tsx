"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { Illustration } from "./glowing-dots";

export const GlowingStarsBackground = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseEnter(true);
      }}
      onMouseLeave={() => {
        setMouseEnter(false);
      }}
      className={cn(
        "bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 max-w-md min-h-[60vh] min-w-[30vw] rounded-xl border border-[#eaeaea] dark:border-neutral-600 relative",
        className
      )}
    >
      <Illustration mouseEnter={mouseEnter} />
      {children}
    </div>
  );
};
