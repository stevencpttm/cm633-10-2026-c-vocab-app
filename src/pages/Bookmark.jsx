import { useState, useEffect } from "react";
import { getBookmarks } from "../bookmarks";

function Bookmark() {
  const [words, setWords] = useState(getBookmarks());
  const [story, setStory] = useState("");

  const generate = async () => {
    const response = await fetch(
      `https://openrouter.ai/api/v1/chat/completions`,
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
              content: `Please write a short story containing these words: ${words.join(", ")}, in the generated story, please use <strong class="bg-yellow-300"></strong> tag to wrap the required words. Do not output any markdown syntax.`,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    setStory(data.choices[0].message.content);
  };

  return (
    <>
      <ul className="grid grid-cols-3 gap-2 mb-8">
        {words.map((word, index) => {
          return (
            <li key={index} className="py-4 px-2 bg-slate-50 rounded-lg">
              {word}
            </li>
          );
        })}
      </ul>

      <button
        className="bg-blue-600 text-white px-4 py-2 text-center rounded-lg text-lg hover:scale-105 hover:bg-blue-700 transition shadow"
        onClick={generate}
      >
        Generate a story with these words
      </button>

      <div
        className="bg-slate-100 p-4 text-base mt-4 rounded-lg text-left border border-slate-300"
        dangerouslySetInnerHTML={{ __html: story }}
      ></div>
    </>
  );
}

export default Bookmark;
