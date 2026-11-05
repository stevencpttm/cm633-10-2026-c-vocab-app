import { useState, useEffect, useRef } from "react";

function Translator() {
  // Translation: 4 fields
  const [langFrom, setLangFrom] = useState("English");
  const [langTo, setLangTo] = useState("Traditional Chinese");
  const [originalContent, setOriginalContent] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");

  const [isTranslationLoading, setIsTranslationLoading] = useState(false);

  const [side, setSide] = useState(1);

  const swap = () => {
    setLangFrom(langTo);
    setLangTo(langFrom);
    setOriginalContent(translatedContent);
    setTranslatedContent("");

    setSide(side + 1);
  };

  useEffect(() => {
    if (originalContent === "") {
      return;
    }

    translate();
    console.log("side");
  }, [side]);

  const translate = async () => {
    setIsTranslationLoading(true);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_LLM_API_KEY,
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "user",
              content: `Translate the following content from [${langFrom}] to [${langTo}]: ${originalContent}`,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    setTranslatedContent(data.choices[0].message.content.trim());

    setIsTranslationLoading(false);
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <div className="bg-white rounded-lg p-4 flex-1">
          <input
            type="text"
            className="p-2 bg-slate-100 rounded-lg w-full text-lg text-center mb-4"
            value={langFrom}
            onInput={(e) => setLangFrom(e.target.value)}
          />
          <textarea
            className="h-48 text-xl outline-none bg-slate-100 focus:bg-slate-200 w-full rounded-lg p-2"
            value={originalContent}
            onInput={(e) => setOriginalContent(e.target.value)}
          ></textarea>
        </div>
        <div className="w-8">
          <button onClick={swap}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
              />
            </svg>
          </button>
        </div>
        <div className="bg-white rounded-lg p-4 flex-1">
          <input
            type="text"
            className="p-2 bg-slate-100 rounded-lg w-full text-lg text-center mb-4"
            value={langTo}
            onInput={(e) => setLangTo(e.target.value)}
          />
          <textarea
            className="h-48 text-xl outline-none bg-slate-100 focus:bg-slate-200 w-full rounded-lg p-2"
            value={translatedContent}
            onInput={(e) => setTranslatedContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      <button
        className="bg-slate-700 text-white text-lg w-full mt-4 py-3 px-8 rounded-lg shadow-lg hover:bg-slate-800 transition disabled:bg-slate-400"
        onClick={translate}
        disabled={isTranslationLoading}
      >
        Translate
      </button>
    </>
  );
}

export default Translator;
