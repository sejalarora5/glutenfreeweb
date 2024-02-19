import { useState } from "react";
import Navbar from "../../components/Navbar";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import type { PDFDocumentProxy } from "pdfjs-dist";
import RTI from "../../assets/pdf/right-to-information.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const RTIPage = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="flex flex-row justify-between mx-10 my-5">
        <h2 className="mt-14 mb-5 text-4xl text-secondary text-start mx-14">
          Right To Information
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl h-full overflow-auto">
          <Document file={RTI} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                scale={1.4}
                className="text-sm"
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={500}
              />
            ))}
          </Document>
        </div>
        <p className="text-center ml-4 mt-5">
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
};

export default RTIPage;
