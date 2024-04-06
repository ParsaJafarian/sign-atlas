"use client";

import ASLTranslator from "@/components/ASLTranslator";
import { useState } from "react";

const TranslatorDemo: React.FC = () => {
  const [sentence, setSentence] = useState<string>("");
  let lastCategory: string = "";
  let count = 0;
  function getCategory(category: string) {
    // "Unsure" means there is a hand but below threshold
    // letters are letters
    // "None" means no hand was detected

    if (category === lastCategory) count += 1;
    else count = 1;
    lastCategory = category;

    if (count > 10 && category !== "None" && category !== "Unsure") {
      count = 0;
      setSentence((prevSentence) => {
        return prevSentence + category;
      });
    } else if (count > 10) {
      count = 0;
    }
  }

  return (
    <>
      <ASLTranslator getCategory={getCategory} confidenceThreshold={0.85} />
      <div style={{ color: "red", width: "100%" }}>{sentence}</div>
    </>
  );
};

export default TranslatorDemo;
