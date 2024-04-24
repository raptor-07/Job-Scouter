"use server";

export const fetchJobs = async (keywords: string[]) => {
    const rapidApiKey = process.env.RAPID_API_KEY;
    const searchTerms = keywords.slice(0, 4).join('%20');
    const url = `https://jsearch.p.rapidapi.com/search?query=${searchTerms}`;

    try {
        const headers = new Headers();
        headers.append('content-type', 'application/json');
        headers.append('X-RapidAPI-Key', rapidApiKey || '');
        headers.append('X-RapidAPI-Host', 'jsearch.p.rapidapi.com');

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        const result = await response.json();

        console.log(result);

        return result;
    } catch (error) {
        console.error(error);
    }
}