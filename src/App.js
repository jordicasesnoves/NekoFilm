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
    <div className="px-16 py-8 bg-gray-100">
      <div className="w-56 pb-8">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Nombre de la pelicula"
          type="text"
          value={value}
          onKeyDown={keyPress}
          onChange={handleChange}
        ></input>
      </div>

      <ListOfMovies keyword={keyword} />
    </div>
  );
}
