import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  LanguageInitialStateType,
  fetchLanguages,
} from "../../redux/languageSlice/languageSlice";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import English from "../../assets/pdf/gfEn.pdf";
import Bengal from "../../assets/pdf/gfBe.pdf";
import Gujrat from "../../assets/pdf/gfGj.pdf";
import Hindi from "../../assets/pdf/gfHn.pdf";
import Kannada from "../../assets/pdf/gfKa.pdf";
import Marathi from "../../assets/pdf/gfMa.pdf";
import Odia from "../../assets/pdf/gfOd.pdf";
import Punjabi from "../../assets/pdf/gfPb.pdf";
import Tamil from "../../assets/pdf/gfTa.pdf";
import Telgu from "../../assets/pdf/gfTe.pdf";
import Navbar from "../../components/Navbar";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

type PDFFile = string | File | null;

const CardsPage = () => {
  const appDisaptch = useDispatch<AppDispatch>();
  const langSelector = useSelector<RootState>(
    (state) => state.languageSlice
  ) as LanguageInitialStateType;

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [currentLang, setCurrentLang] = useState("EN");
  const [currentFile, setCurrentFile] = useState<PDFFile>(English);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  useEffect(() => {
    appDisaptch(fetchLanguages());
  }, []);

  useEffect(() => {
    console.log(currentFile);
    console.log("hello");
  }, [currentFile]);

  const handleCurrentFile = (name: string) => {
    console.log(name);

    switch (name) {
      case "EN":
        setCurrentFile(English);
        setCurrentLang("EN");
        break;
      case "BE":
        setCurrentFile(Bengal);
        setCurrentLang("BE");
        break;
      case "GJ":
        setCurrentFile(Gujrat);
        setCurrentLang("GJ");
        break;
      case "HN":
        setCurrentFile(Hindi);
        setCurrentLang("HN");
        break;
      case "KA":
        setCurrentFile(Kannada);
        setCurrentLang("KA");
        break;
      case "MA":
        setCurrentFile(Marathi);
        setCurrentLang("MA");
        break;
      case "OD":
        setCurrentFile(Odia);
        setCurrentLang("OD");
      case "PB":
        setCurrentFile(Punjabi);
        setCurrentLang("PB");
        break;
      case "TA":
        setCurrentFile(Tamil);
        setCurrentLang("TA");
        break;
      case "TE":
        setCurrentFile(Telgu);
        setCurrentLang("TE");
        break;
      default:
        setCurrentFile(English);
        setCurrentLang("EN");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-between mx-10 my-5">
        <h1 className="text-4xl font-semibold text-pink-400">
          Gluten-Free Cards
        </h1>
        <details className="dropdown dropdown-bottom dropdown-end">
          <summary className="m-1 btn text-pink-400">{currentLang}</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            {langSelector.data.data.map((it) => (
              <li>
                <a
                  onClick={() => {
                    handleCurrentFile(it.language);
                  }}
                >
                  {it.languagename}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Document
          file={currentFile}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              scale={1.4}
              className="text-sm"
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          ))}
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
};

export default CardsPage;
