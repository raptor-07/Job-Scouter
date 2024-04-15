"use server";

import { promises as fs } from 'fs'; // To save the file temporarily
import { v4 as uuidv4 } from 'uuid'; // To generate a unique filename
import PDFParser from 'pdf2json'; // To parse the pdf

export const pdfToText = async (file: File) => {

    const fileName = uuidv4();
    const tempFilePath = `/tmp/${fileName}.pdf`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(tempFilePath, fileBuffer);

    const pdfParser = new (PDFParser as any)(null, 1);

    pdfParser.on('pdfParser_dataError', (errData: any) =>
        console.log(errData.parserError)
    );

    let parsedText = 'Begin: ';

    const textPromise = new Promise((resolve, reject) => {
        pdfParser.on('pdfParser_dataReady', () => {
            parsedText = parsedText + (pdfParser as any).getRawTextContent();
            resolve(parsedText);
        });
    });

    pdfParser.loadPDF(tempFilePath);

    const result = await textPromise;

    console.log(result);

    return result;
}