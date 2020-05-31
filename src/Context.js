import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import moment from "moment";

// functions
const tokenExpired = (token) => {
  let decoded = jwt_decode(token);
  return moment.unix(decoded.exp).isBefore();
};

// Initialize

let token = localStorage.getItem("token") || null;
let decoded = null;

// if the token exists, decode it and check if it has expired
if (token) {
  decoded = jwt_decode(token);
  if (tokenExpired(token)) {
    // If the token has expired, remove it (auto log out)
    localStorage.removeItem("token");
    token = null;
  }
}

const initialSearchState = {
  mediaType: 1,
  movieKeyword: "",
  showKeyword: "",
};

const initialState = {
  ...initialSearchState,
  loggedIn: !!token,
  decodedToken: decoded,
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

export { Context, ContextProvider, initialSearchState };
