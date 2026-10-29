import { useState, useEffect } from "react";

function App() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Translation: 4 fields
  const [langFrom, setLangFrom] = useState("English");
  const [langTo, setLangTo] = useState("Traditional Chinese");
  const [originalContent, setOriginalContent] = useState("");
  const [translatedContent, setTranslatedContent] = useState("");

  const search = async () => {
    setIsLoading(true);

    let data;

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + import.meta.env.VITE_LLM_API_KEY,
          },
          body: JSON.stringify({
            model: "openrouter/free",
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "vocabulary",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    phonetic: {
                      type: "string",
                      description: "IPA pronunciation",
                    },
                    meaning: {
                      type: "string",
                      description: "Meaning of the word in Traditional Chinese",
                    },
                    partOfSpeech: {
                      type: "string",
                      description: "English part of speech",
                    },
                    example: {
                      type: "string",
                      description: "One short english example sentence",
                    },
                  },
                  required: ["phonetic", "meaning", "partOfSpeech", "example"],
                  additionalProperties: false,
                },
              },
            },
            messages: [
              {
                role: "system",
                content: `You are an English teacher`,
              },
              {
                role: "user",
                content: word,
              },
            ],
          }),
        },
      );
      data = await response.json();
    } catch (e) {
      setError("API Request to OpenRouter has failed");
    }

    try {
      if (data) setDefinition(JSON.parse(data.choices[0].message.content));
    } catch (e) {
      setError("Failed to decode the JSON payload: " + JSON.stringify(data));
    }

    setIsLoading(false);
  };

  return (
    <div className="p-4 text-center min-h-screen bg-slate-200">
      <h1 className="text-center text-4xl font-bold my-8">Vocab App</h1>
      <div className="flex gap-2">
        <input
          type="text"
          className="bg-white w-full rounded-lg p-4 text-2xl disabled:bg-gray-100"
          value={word}
          onInput={(e) => {
            setWord(e.target.value);
          }}
          disabled={isLoading}
        />
        <button
          className="bg-black px-4 py-2 text-2xl text-white rounded-lg disabled:bg-gray-400"
          onClick={search}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Query"}
        </button>
      </div>

      {error && (
        <div className="bg-red-200 p-4 rounded-lg text-red-500 mt-4">
          {error}
        </div>
      )}

      {definition && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-lg p-2">
            <strong>音標</strong>
            <p>{definition.phonetic}</p>
          </div>
          <div className="bg-white rounded-lg p-2">
            <strong>意思</strong>
            <p>{definition.meaning}</p>
          </div>
          <div className="bg-white rounded-lg p-2">
            <strong>詞性</strong>
            <p>{definition.partOfSpeech}</p>
          </div>
          <div className="bg-white rounded-lg p-2">
            <strong>例句</strong>
            <p>{definition.example}</p>
          </div>
        </div>
      )}

      <hr className="border-slate-300 my-8" />

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
          <button>
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
      <button className="bg-slate-700 text-white text-lg w-full mt-4 py-3 px-8 rounded-lg shadow-lg hover:bg-slate-800 transition">
        Translate
      </button>
    </div>
  );
}

export default App;
