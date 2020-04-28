import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ContextProvider } from "./Context";

import { HomePage } from "./pages/HomePage";
import { MoviePage } from "./pages/MoviePage";
import { ShowPage } from "./pages/ShowPage";

import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <div className="max-w-6xl mx-auto px-8">
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/movie/:id" component={MoviePage} />
              <Route path="/show/:id" component={ShowPage} />
            </Switch>
          </div>
        </div>
      </Router>
    </ContextProvider>
  );
}
