import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Landing } from "./pages";
import { Signup, Login, Logout, ReqAuth } from "./app/auth";
import Home from "./app/home/Home";
import Decks from "./app/decks/Decks";
import DeckHome from "./app/decks/home/DeckHome";
import ItemHome from "./app/items/home/ItemHome";
import Review from "./app/review/Review";
import ReviewNew from "./app/review/new/ReviewNew";

import { NavBar, Footer } from "./components";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
          <Route path="/study" component={ReqAuth(Home)} />
          <Route exact path="/decks" component={ReqAuth(Decks)} />
          <Route exact path="/decks/:deckId" component={ReqAuth(DeckHome)} />
          <Route exact path="/items/:itemId" component={ReqAuth(ItemHome)} />
          <Route exact path="/sessions/new" component={ReqAuth(ReviewNew)} />
          <Route exact path="/sessions/:sessionId" component={ReqAuth(Review)} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
