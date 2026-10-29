import { useState, useEffect } from "react";

function App() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
            messages: [
              {
                role: "system",
                content: `You are an English teacher, return only in JSON format, and one JSON object. Format: 
              {
                "phonetic": "<phonetic>",
                "meaning": "<meaning in traditional chinese>",
                "partOfSpeech": "<partOfSpeech>",
                "example": "<example>"
              }
              `,
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
    </div>
  );
}

export default App;
