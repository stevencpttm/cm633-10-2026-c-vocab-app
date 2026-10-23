import { useState, useEffect } from "react";

// !!!UNSAFE!!!
const API_KEY = "";

function App() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const search = async () => {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
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
  };

  return (
    <div className="p-4 text-center min-h-screen bg-slate-200">
      <h1 className="text-center text-4xl font-bold my-8">Vocab App</h1>
      <div className="flex gap-2">
        <input
          type="text"
          className="bg-white w-full rounded-lg p-4 text-2xl"
          value={word}
          onInput={(e) => {
            setWord(e.target.value);
          }}
        />
        <button
          className="bg-black px-4 py-2 text-2xl text-white rounded-lg"
          onClick={search}
        >
          Query
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg mt-4">
        <h4 className="italic text-slate-400">Definition</h4>
        <p className="text-left my-4">{definition}</p>
      </div>
    </div>
  );
}

export default App;
