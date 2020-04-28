import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Movie } from "./pages";
import { Navbar } from "./components/Navbar";
import { ContextProvider } from "./Context";

export default function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <div className="max-w-6xl mx-auto px-8">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/movie/:id" component={Movie} />
            </Switch>
          </div>
        </div>
      </Router>
    </ContextProvider>
  );
}
