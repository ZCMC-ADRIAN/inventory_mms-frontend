import React from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';

const DocxGenerator = () => {
  const generateDocx = () => {
    fetch('/PAR.docx')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch template file');
        }
        return res.arrayBuffer();
      })
      .then((buffer) => {
        // Load the template with PizZip
        const zip = new PizZip(buffer);

        // Data array containing objects to fill the placeholders in the template
        const dataArray = [
          {
            quantity: '1',
            unit: 'Unit',
            desc: 'Computer Desktop',
            property: '2022-01-10-0001',
            date: '08-02-2023',
            amount: '55000'
          }
          // Add more data objects as needed
        ];

        // Create a new instance of the Docxtemplater for each data object
        const outputArray = dataArray.map((data) => {
          const doc = new Docxtemplater();
          doc.loadZip(zip);
          doc.setData(data);
          doc.render();
          return doc.getZip().generate({ type: 'uint8array' });
        });

        // Combine the generated sections into a single DOCX file
        const combinedOutputBuffer = new PizZip();
        outputArray.forEach((outputBuffer) => {
          combinedOutputBuffer.load(outputBuffer);
        });

        const combinedBlob = new Blob([combinedOutputBuffer.generate({ type: 'uint8array' })], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        // Save the combined file using FileSaver.js
        saveAs(combinedBlob, 'combined_output.docx');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={generateDocx}>Generate DOCX</button>
    </div>
  );
};

export default DocxGenerator;
