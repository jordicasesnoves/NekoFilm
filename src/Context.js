import React, { useState } from "react";

const initialState = {
  mediaType: 1,
  movieKeyword: "kill bill",
  showKeyword: "",
};

const Context = React.createContext(initialState);

const ContextProvider = (props) => {
  const [state, setState] = useState(initialState);
  return (
    <Context.Provider value={{ state, setState }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
