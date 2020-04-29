import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ContextProvider } from "./Context";

import { HomePage } from "./pages/HomePage";
import { MoviePage } from "./pages/MoviePage";
import { TVShowPage } from "./pages/TVShowPage";

import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="bg-gray-100">
          <Navbar />

          {/* Content Container */}
          <div className="max-w-6xl min-h-screen mx-auto px-8 py-16">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/movie/:id" component={MoviePage} />
              <Route path="/show/:id" component={TVShowPage} />
            </Switch>
          </div>
        </div>
      </Router>
    </ContextProvider>
  );
}
