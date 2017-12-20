import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Landing } from "../pages/landing";
import { Signup, Login, Logout, ReqAuth } from "./auth";
import { Decks, DeckHome, DeckNew } from "./decks";
import Home from "./home/Home";
import ItemHome from "./items/home/ItemHome";
import Review from "./review/Review";

import { NavBar, Footer } from "../components";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <div className="py-5 my-5">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/signup" component={Signup} />
              <Route path="/study" component={ReqAuth(Home)} />

              <Route exact path="/decks" component={ReqAuth(Decks)} />
              <Route exact path="/decks/new" component={ReqAuth(DeckNew)} />
              <Route exact path="/decks/:deckId" component={ReqAuth(DeckHome)} />
              <Route exact path="/items/:itemId" component={ReqAuth(ItemHome)} />
              <Route exact path="/sessions/:sessionId" component={ReqAuth(Review)} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
