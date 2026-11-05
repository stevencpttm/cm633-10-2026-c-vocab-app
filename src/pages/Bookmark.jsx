import { useState, useEffect } from "react";

function Bookmark() {
  const [words, setWords] = useState([
    "apple",
    "orange",
    "keyboard",
    "mouse",
    "water",
    "monitor",
    "paper",
    "speaker",
  ]);

  return (
    <>
      <ul className="grid grid-cols-3 gap-2">
        {words.map((word, index) => {
          return (
            <li key={index} className="py-4 px-2 bg-slate-50 rounded-lg">
              {word}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Bookmark;
