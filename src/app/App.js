import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Landing, NotFound } from "../pages";
import { Signup, Login, Logout, ReqAuth } from "./auth";
import { Decks, DeckHome, DeckNew } from "./decks";
import Account from "./account/Account";
import Home from "./home/Home";
import CardHome from "./cards/home/CardHome";
import Review from "./review/Review";

import { NavBar, Footer } from "../components";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar className="App-navbar" />
          <div className="App-content my-5">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/signup" component={Signup} />
              <Route path="/study" component={ReqAuth(Home)} />

              <Route path="/account" component={ReqAuth(Account)} />
              <Route exact path="/decks" component={ReqAuth(Decks)} />
              <Route exact path="/decks/new" component={ReqAuth(DeckNew)} />
              <Route exact path="/decks/:deckId" component={ReqAuth(DeckHome)} />
              <Route exact path="/cards/:cardId" component={ReqAuth(CardHome)} />
              <Route exact path="/sessions/:sessionId" component={ReqAuth(Review)} />
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
