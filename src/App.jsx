import { useState, useEffect } from "react";

function App() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = async () => {
    setIsLoading(true);

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
              content: `You are an English teacher, please give me the definition of the following vocabulary: ${word}`,
            },
          ],
        }),
      },
    );
    const data = await response.json();

    setDefinition(data.choices[0].message.content);

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
      {definition && (
        <div className="bg-white p-4 rounded-lg mt-4">
          <h4 className="italic text-slate-400">Definition</h4>
          <p className="text-left my-4">{definition}</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white rounded-lg p-2">
          <strong>音標</strong>
          <p>word.phonetic</p>
        </div>
        <div className="bg-white rounded-lg p-2">
          <strong>意思</strong>
          <p>word.meaning</p>
        </div>
        <div className="bg-white rounded-lg p-2">
          <strong>詞性</strong>
          <p>word.partOfSpeech</p>
        </div>
        <div className="bg-white rounded-lg p-2">
          <strong>例句</strong>
          <p>word.example</p>
        </div>
      </div>
    </div>
  );
}

export default App;
