"use server";
import OpenAI, { ClientOptions } from "openai";
import '@/envConfig';

const key = process.env.OPEN_AI_KEY;
let openai: OpenAI;

if (key) {
    const options: ClientOptions = {
        apiKey: key
    };
    openai = new OpenAI(options);
}
export const openAiHandler = async (text: string) => {


    try {
        const systemContent = `You are a resume summarizer, skills keywords extractor specific to coding, and software-related resumes. You will receive a series of text extracted from a resume including their name, projects, experience, technical skills, contributions, and so on. This content can be unique to every resume. The following are the set of tasks you need to perform: 1. Generate 10 keywords that best describe the user\'s technical skills. 2. Create a summary of the job market situation for these skills based on your latest training data cutoff. You should strictly only reply in the following template: keywords: <insert skills here> market_info: <insert data here> Example: resume text words: \" Hurmxxxaan Ahxxxmed +91 89xxxxxx3|contxxxxactme.hurmxxxxaan@xxxxxgmail.com|LinkedIn|GitHub Education Nagarjuna College of Engineering and TechnologyBengaluru, KA Bachelor of Engineering in Computer Science Aug. 2020 \u2013 June 2024 \u2022GPA: 9.04 Freelance Experience Stokastix - Algorithmic Trading Bot|NestJS, Postgres, React, MUIDec 2023 \u2013 Present \u2022Implemented an authentication server that issues authentication and refresh JWT tokens \u2022Developed a REST API that absorbs the Trading View APIto render candle stick charts on the frontend \u2022End users can input constraints; The trades are auto-executed by the trading algorithm; The order status is published by a push service onto the user\u2019s telegram chat using the Telegram bot API Projects Ordinal Trackers|NextJS, ExpressJS, MUI, Prisma(Postgres)Feb. 2024 \u2013 Mar. 2024 \u2022Full Stack End to End Tracking of Ordinal Inscriptions on Bitcoin Mainnet \u2022Data Pipeline to trace inscriptions on chain and transform them to get collection Ids and Slugs through third party APIs \u2022Utilized server actions to perform CRUD operations on Postgres Cluster \u2022Deployed a CRON job service to track floor price and alert users on telegram through Bot Father FanaTicks - Novel Ticket Distribution|React, Solidity, Tailwind, NodeJSOct. 2023 \u2013 Nov. 2023 \u2022Ticketing Platform that distributes tickets based on \u201Dproof-of-interest\u201D, Enables artists to sell their own tickets via open APIs \u2022Developed a full-stack DApp; Deployed smart contract on Eth, expressJS serving a REST API with React as the frontend \u2022Dockerized the DApp and deployed it on open zk-based chain Quivo - AI Salesman|React, LangChain, ExpressJS, MongoDB, Chrome ExtensionOct. 2023 \u2013 Nov. 2023 \u2022Quivo is a B2B AI Salesman that bridges the \u201Dhuman gap\u201D between buyers and sellers using AI agents \u2022LangChain is used to create complex routed chains that are mounted to an AI agent \u2022Developed a chrome extension to serve as interface for authentication and service \u2022Developed a http server that serves the output from the AI agent to the Frontend Technical Skills Languages: JavaScript\/Typescript, Java, Python, C, Solidity Frameworks\/Libraries: React, NextJS, Shadcn\/ui, TailwindCSS, MaterialUI, NestJS, ExpressJS, FastAPI, Django, LangChain Technology, Tools: Git, Docker, Postman, Postgres, MySQL, Prisma, typeORM, MongoDB, Mongoose, wireshark\/tcpdump, curl, bash, linux, vim\/neovim, VS Code Contributions\/Achievements EthIndia Hackathon2023 \u2022Developed a REST API, which enables on chain interaction driven smart contract \u2022Voted 17th\/480 international teams Google Cloud Next2022 \u2022Volunteer at Google Cloud Next 2022 \u2022Attendee and participant Open Source Contributor \u2022HelioViewer.org, BeyondMafia \u2022GitHub\" response: keywords: React, NextJS, NestJS, Git, Docker, Postman, Postgres, linux, Prisma, vim. market_info: I can see that you are well versed in web technologies like NextJS. NextJS is a new full stack frameworks that is aggressively being adopted by early stage startups. You are familiar with pre built UI libraries like MaterialUI and Shadcn\/ui which enables you to pair it with modern framework like react and nextJS. Overall the market is healthy and in demand for professionals like you. <Place some stats based on job market> More Instructions: Only reply in JSON format with the following schema and reply nothing else along with it. The user is only going to give you lots of texts(starts with \'Begin:\') from the resume. This response should be compatible with JSON.parse(). { keywords: string[] ; market_info: string; }`;

        const completion = await openai.chat.completions.create({
            messages: [{ "role": "system", "content": systemContent },
            { "role": "user", "content": text }],
            model: "gpt-3.5-turbo",
        });

        console.log(completion.choices[0].message.content);
        const result = completion.choices[0].message.content !== null ? JSON.parse(completion.choices[0].message.content) : null;

        if (result === null) {
            return { keywords: [], market_info: "" };
        }

        return result;
    } catch (error) {
        console.error(`Error occurred: ${error}`);

        return { keywords: [], market_info: "" };
    }
}