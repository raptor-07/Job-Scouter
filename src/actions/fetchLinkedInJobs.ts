"use server";

import '@/envConfig';

export const fetchLinkedInJobs = async (keywords: string[]) => {
    const url = 'https://linkedin-jobs-search.p.rapidapi.com/';
    const rapidApiKey = process.env.RAPID_API_KEY;
    const searchTerms = keywords.slice(0, 4).join(' ');



    try {
        const headers = new Headers();
        headers.append('content-type', 'application/json');
        headers.append('X-RapidAPI-Key', rapidApiKey || '');
        headers.append('X-RapidAPI-Host', 'linkedin-jobs-search.p.rapidapi.com');

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                search_terms: searchTerms,
                location: 'Bengaluru, KA',
                page: '1'
            })
        });
        const result = await response.json();

        // console.log(result);

        return result;
    } catch (error) {
        console.error(error);
    }
}