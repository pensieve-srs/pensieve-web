import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Landing, NotFound } from "../pages";
import { Signup, Login, Logout, ReqAuth } from "./auth";
import { Decks, DeckHome, DeckNew } from "./decks";
import Account from "./account/Account";
import Home from "./home/Home";
import CardHome from "./cards/home/CardHome";
import Review from "./review/Review";
import ReviewNew from "./review/new/ReviewNew";

import { NavBar, Footer, ErrorHandler } from "../components";
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
              <Route path="/login" component={ErrorHandler(Login)} />
              <Route path="/logout" component={Logout} />
              <Route path="/signup" component={ErrorHandler(Signup)} />
              <Route path="/study" component={ReqAuth(ErrorHandler(Home))} />

              <Route path="/account" component={ReqAuth(ErrorHandler(Account))} />
              <Route exact path="/decks" component={ReqAuth(ErrorHandler(Decks))} />
              <Route exact path="/decks/new" component={ReqAuth(ErrorHandler(DeckNew))} />
              <Route exact path="/decks/:deckId" component={ReqAuth(ErrorHandler(DeckHome))} />
              <Route exact path="/cards/:cardId" component={ReqAuth(ErrorHandler(CardHome))} />
              <Route exact path="/sessions/new" component={ReqAuth(ErrorHandler(ReviewNew))} />
              <Route exact path="/sessions/:sessionId" component={ReqAuth(ErrorHandler(Review))} />
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
