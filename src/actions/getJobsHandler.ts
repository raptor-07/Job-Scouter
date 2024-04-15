"use server";

import { pdfToText } from "@/libs/pdf-to-text";
import { config } from "dotenv";
import { openAiHandler } from "./oAiHandler";
import { fetchLinkedInJobs } from "./fetchLinkedInJobs";
config();

export const getJobsHandler = async (formData: FormData) => {
    const resumePdf = formData.get("resume") as File;

    const textFromPdf: any = await pdfToText(resumePdf);

    const oAiResponse: {
        keywords: string[];
        market_info: string;
    } = await openAiHandler(textFromPdf);

    const jobs: any = await fetchLinkedInJobs(oAiResponse.keywords);

    const cleanedJobs = jobs.map((job: any) => {
        return {
            title: job.job_title,
            description: job.company_name,
            company_link: job.linkedin_company_url_cleaned,
            job_link: job.linkedin_job_url_cleaned,
            location: job.job_location,
        };
    });

    const mergedData = {
        jobs: cleanedJobs,
        market_info: oAiResponse.market_info,
    };

    return mergedData;
};