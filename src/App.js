import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { ContextProvider } from "./Context";

export default function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <div className="px-16 py-8 max-w-6xl mx-auto">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ContextProvider>
  );
}
