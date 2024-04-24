"use server";

import { pdfToText } from "@/libs/pdf-to-text";
import { config } from "dotenv";
import { openAiHandler } from "./oAiHandler";
import { fetchLinkedInJobs } from "./fetchLinkedInJobs";
import { fetchJobs } from "./fetchJobs";
config();

export const getJobsHandler = async (formData: FormData) => {
    const resumePdf = formData.get("resume") as File;

    const textFromPdf: any = await pdfToText(resumePdf);

    const oAiResponse: {
        keywords: string[];
        market_info: string;
    } = await openAiHandler(textFromPdf);

    const jobsA: any = await fetchLinkedInJobs(oAiResponse.keywords);

    const cleanedJobsA = jobsA.map((job: any) => {
        return {
            title: job.job_title,
            description: job.company_name,
            company_link: job.linkedin_company_url_cleaned,
            job_link: job.linkedin_job_url_cleaned,
            location: job.job_location,
            platform: "LinkedIn",
        };
    });

    console.log("response from Li API: \n", cleanedJobsA);

    const jobsB = await fetchJobs(oAiResponse.keywords);

    const cleanedJobsB = jobsB.data.map((job: any) => {
        return {
            title: job.job_title,
            description: job.employer_name,
            company_link: '',
            job_link: job.job_apply_link,
            location: `${job.job_city}, ${job.job_country}`,
            platform: job.employer_logo,
        };
    });

    console.log("response from Jobs API: \n", cleanedJobsB);

    let mergedJobs = [...cleanedJobsA, ...cleanedJobsB];

    const mergedData = {
        jobs: mergedJobs,
        market_info: oAiResponse.market_info,
    };

    return mergedData;
};