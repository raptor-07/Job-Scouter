"use client";

import React from "react";
import { HoverEffect } from "@/components/ui/jobs/card-hover";
import { GlowingStarsBackground } from "@/components/ui/jobs/glowing-bg";
import {
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/jobs/glowing-dots";
import { DotBackground } from "@/components/ui/dot-background";

const Page = () => {
  return (
    <div>
      <DotBackground>
        <div className="flex min-h-[85vh] py-20 items-center justify-center antialiased">
          <GlowingStarsBackground>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[40vw] sm:min-w-[80vw] flex flex-col items-center">
              <GlowingStarsDescription className="-translate-y-5/18 text-nowrap opacity-70 mr-[70px]">
                Drag the file into this area or click to upload
              </GlowingStarsDescription>
              <GlowingStarsTitle>Let us have your resume</GlowingStarsTitle>
            </div>
          </GlowingStarsBackground>
        </div>
        <div className="max-w-7xl mx-auto px-8">
          <HoverEffect items={projects} />
        </div>
      </DotBackground>
    </div>
  );
};

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    company_link: "https://stripe.com",
    job_link: "https://stripe.com/jobs",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    company_link: "https://netflix.com",
    job_link: "https://netflix.com/jobs",
  },
  {
    title: "Apple",
    description:
      "A multinational technology company that specializes in consumer electronics, computer software, and online services.",
    company_link: "https://apple.com",
    job_link: "https://apple.com/jobs",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    company_link: "https://amazon.com",
    job_link: "https://amazon.com/jobs",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    company_link: "https://microsoft.com",
    job_link: "https://microsoft.com/jobs",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.",
    company_link: "https://google.com",
    job_link: "https://google.com/jobs",
  },
];

export default Page;
