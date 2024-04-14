import React from "react";
import { cn } from "@/utils/cn";
import { IconArrowUpRight } from "@tabler/icons-react";

export const CardTitle = ({
  className,
  children,
  item,
}: {
  className?: string;
  children: React.ReactNode;
  item: {
    title: string;
    description: string;
    company_link: string;
    job_link: string;
  };
}) => {
  return (
    <>
      <a href={item.company_link}>
        <h4
          className={cn(
            "text-zinc-100 font-bold tracking-wide mt-4 underline",
            className
          )}
        >
          {children}
          <IconArrowUpRight className="inline-block mb-1" size={16} />
        </h4>
      </a>
    </>
  );
};
