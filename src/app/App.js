import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Landing, NotFound, ComingSoon } from "../pages";
import { Signup, Login, Logout, ReqAuth, ResetPassword } from "./auth";
import { Decks, DeckHome, DeckNew } from "./decks";
import Settings from "./settings/Settings";
import CardHome from "./cards/home/CardHome";
import Review from "./review/Review";
import ReviewNew from "./review/new/ReviewNew";

import { NavBar, Footer } from "../components";
import GoogleAnalytics from "../helpers/GoogleAnalytics";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar className="App-navbar" />
          <div className="App-content py-5">
            <Route path="/" component={GoogleAnalytics} />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/signup" component={Signup} />
              <Route path="/reset-password" component={ResetPassword} />

              <Route path="/settings" component={ReqAuth(Settings)} />
              <Route exact path="/decks" component={ReqAuth(Decks)} />
              <Route exact path="/decks/new" component={ReqAuth(DeckNew)} />
              <Route exact path="/decks/:deckId" component={ReqAuth(DeckHome)} />
              <Route exact path="/cards/:cardId" component={ReqAuth(CardHome)} />
              <Route exact path="/sessions/new" component={ReqAuth(ReviewNew)} />
              <Route exact path="/sessions/:sessionId" component={ReqAuth(Review)} />

              <Route path="/about" component={ComingSoon} />
              <Route path="/api" component={ComingSoon} />
              <Route path="/help" component={ComingSoon} />

              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer className="App-footer" />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
