import { QRCodeCanvas } from "qrcode.react";
import { Document, Page, pdf, PDFDownloadLink } from "@react-pdf/renderer";

const MyDocument = () => {
  const qrCodeData = "https://www.example.com";
  const fileName = "example.pdf";

  const handleDownload = async () => {
    <PDFDownloadLink document={<Document />} fileName="test.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>;
  };

  return (
    <Document>
      <Page>
        <QRCodeCanvas value={qrCodeData} />
      </Page>
      <button onClick={handleDownload}>Download PDF</button>
    </Document>
  );
};

export default MyDocument;
