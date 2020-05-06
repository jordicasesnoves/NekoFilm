import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";

import { ContextProvider, Context } from "./Context";

import { HomePage } from "./pages/HomePage";
import { MoviePage } from "./pages/MoviePage";
import { TVShowPage } from "./pages/TVShowPage";
import { LogInPage } from "./pages/LogInPage";

import { Navbar } from "./components/Navbar";
import { SignUpPage } from "./pages/SignUpPage";
import { MediaPageContainer } from "./components/MediaPageContainer";

const PrivatedRoute = ({ ...props }) => {
  const { state } = useContext(Context);
  return state.loggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};

const AuthRoute = ({ ...props }) => {
  const { state } = useContext(Context);
  return state.loggedIn ? <Redirect to="/" /> : <Route {...props} />;
};

export default function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="bg-gray-100">
          {/* Content Container */}
          <div className="">
            <Switch>
              <PrivatedRoute exact path="/">
                <Navbar />
                <HomePage />
              </PrivatedRoute>

              <PrivatedRoute path="/movie/:id">
                <Navbar />
                <MediaPageContainer>
                  <MoviePage />
                </MediaPageContainer>
              </PrivatedRoute>

              <PrivatedRoute path="/show/:id">
                <Navbar />
                <MediaPageContainer>
                  <TVShowPage />
                </MediaPageContainer>
              </PrivatedRoute>

              <AuthRoute exact path="/login" component={LogInPage} />
              <AuthRoute exact path="/signup" component={SignUpPage} />
              <Route path="*">Error 404. Page not found.</Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ContextProvider>
  );
}
