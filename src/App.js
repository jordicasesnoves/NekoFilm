import React, { useState } from "react";
import "./App.css";

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
    <div>
      <div style={{ marginBottom: "32px" }}>
        <input
          placeholder="Nombre de la pelicula"
          type="text"
          value={value}
          onKeyDown={keyPress}
          onChange={handleChange}
          style={{
            height: "48px",
            width: "356px",
            fontSize: "24px",
          }}
        ></input>
      </div>

      <ListOfMovies keyword={keyword} />
    </div>
  );
}
