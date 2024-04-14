import { ReactNode } from "react";

type DotBackgroundProps = {
  children: ReactNode;
};

export function DotBackground({ children }: DotBackgroundProps) {
  return (
    <div className="w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.8] relative">
      <div>{children}</div>
    </div>
  );
}
