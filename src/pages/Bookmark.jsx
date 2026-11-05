import { useState, useEffect } from "react";
import { getBookmarks } from "../bookmarks";

function Bookmark() {
  const [words, setWords] = useState(getBookmarks());

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

      <button className="bg-blue-600 text-white px-4 py-2 text-center rounded-lg text-lg hover:scale-105 hover:bg-blue-700 transition shadow">
        Generate a story with these words
      </button>

      <div className="bg-slate-100 p-4 text-base mt-4 rounded-lg text-left border border-slate-300">
        Lorem ipsum...
      </div>
    </>
  );
}

export default Bookmark;
