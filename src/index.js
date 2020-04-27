import React from "react";
import ReactDOM from "react-dom";

// Import tailwindcss postcss's build
import "./assets/main.css";
// Import AnimateCSS library
import "./assets/animate.css";
import "./assets/index.css";

import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "https://nekofilm-api.now.sh/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
