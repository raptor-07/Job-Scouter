"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { CardContainer } from "@/components/ui/jobs/card-container";
import { GlowingStarsBackground } from "@/components/ui/jobs/glowing-bg";
import {
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/jobs/glowing-dots";
import { DotBackground } from "@/components/ui/dot-background";
import { TextWriter } from "@/components/ui/jobs/text-writer";
import { getJobsHandler } from "@/actions/getJobsHandler";

const Page = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [jobs, setJobs] = useState<any[]>([]);
  const [words, setWords] = useState<string>("");

  const scrollRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("mergedData") || "{}"
    );
    if (localStorageData.jobs && localStorageData.market_info) {
      setJobs(localStorageData.jobs);
      setWords(localStorageData.market_info);
      setLoading(true);
    }
  }, []);

  React.useEffect(() => {
    if (loading && scrollRef.current) {
      const top =
        scrollRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }, [loading]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      setLoading(false);
      setJobs([]);
      setWords("");

      //empty local storage as well
      localStorage.clear();

      let files = Array.from(e.dataTransfer.files);
      console.log(files);
      files = files.filter((file: File) => file.type === "application/pdf");

      if (files.length === 0) {
        alert("Please upload a PDF file again.");
        return;
      }
      const formData = new FormData();
      formData.append("resume", files[0]);

      const bodyElement = document.querySelector("body");
      if (bodyElement) {
        bodyElement.style.filter = "blur(6px)";
      }

      const mergedData = await getJobsHandler(formData);
      if (bodyElement) {
        bodyElement.style.filter = "none";
      }
      setJobs(mergedData.jobs);
      setWords(mergedData.market_info);
      setLoading(true);

      //save data to local storage
      localStorage.setItem("mergedData", JSON.stringify(mergedData));
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLoading(false);
      setJobs([]);
      setWords("");

      //empty local storage as well
      localStorage.clear();

      let files = Array.from(e.target.files);
      console.log(files);
      files = files.filter((file: File) => file.type === "application/pdf");
      if (files.length === 0) {
        alert("Please upload a PDF file again.");
        return;
      }
      const formData = new FormData();
      formData.append("resume", files[0]);

      const bodyElement = document.querySelector("body");
      if (bodyElement) {
        bodyElement.style.filter = "blur(6px)";
      }

      const mergedData = await getJobsHandler(formData);
      if (bodyElement) {
        bodyElement.style.filter = "none";
      }
      setJobs(mergedData.jobs);
      setWords(mergedData.market_info);
      setLoading(true);

      //save data to local storage
      localStorage.setItem("mergedData", JSON.stringify(mergedData));
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <DotBackground>
        <div
          className="flex min-h-[100vh] py-20 items-center justify-center antialiased p-0 m-0"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <GlowingStarsBackground>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[40vw] sm:min-w-[80vw] flex flex-col items-center">
              <GlowingStarsDescription className="-translate-y-5/18 text-nowrap opacity-70 mr-[70px]">
                Drag the file into this area or click to upload
              </GlowingStarsDescription>
              <GlowingStarsTitle>Let us have your resume</GlowingStarsTitle>
            </div>
          </GlowingStarsBackground>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          accept=".pdf"
          onChange={handleFileSelect}
        />
        {loading && (
          <div ref={scrollRef}>
            <TextWriter words={words} />
            <div className="max-w-7xl mx-auto px-8">
              <CardContainer items={jobs} />
            </div>
          </div>
        )}
      </DotBackground>
    </div>
  );
};

export default Page;
