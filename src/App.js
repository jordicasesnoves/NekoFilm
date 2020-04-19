import React, { useState } from "react";

import ListOfMovies from "./components/ListOfMovies";

export default function App() {
  const [keyword, setKeyword] = useState("simpsons");
  const [value, setValue] = useState("");

  function keyPress(e) {
    if (e.keyCode === 13) {
      setKeyword(e.target.value);
    }
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="px-16 py-8 bg-gray-100 ">
      <div className="w-64 pb-8 text-gray-700">
        <input
          className="w-full shadow appearance-none border rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Search movies, tv shows..."
          type="text"
          value={value}
          onKeyDown={keyPress}
          onChange={handleChange}
        />
      </div>

      <ListOfMovies keyword={keyword} />
    </div>
  );
}
