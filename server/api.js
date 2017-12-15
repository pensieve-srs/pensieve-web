const express = require("express");
const AuthController = require("./controllers/authentication");
const ItemController = require("./controllers/items");
const SessionController = require("./controllers/sessions");
const DeckController = require("./controllers/decks");

const api = express.Router();

api.get("/test", function(req, res) {
  return res.status(200).json({ message: "t pain" });
});

api.post("/users/signup", AuthController.signupUser);

api.post("/users/login", AuthController.loginUser);

api.get("/api/decks", AuthController.authenticateUser, DeckController.getDecks);

api.get("/api/items/:item_id", AuthController.authenticateUser, ItemController.getItem);

api.put("/api/items/:item_id", AuthController.authenticateUser, ItemController.editItem);

api.delete("/api/items/:item_id", AuthController.authenticateUser, ItemController.deleteItem); //

api.post("/api/items", AuthController.authenticateUser, ItemController.createItem);

api.post("/api/items/:item_id/review", AuthController.authenticateUser, ItemController.reviewItem);

api.post("/api/items/:item_id/reset", AuthController.authenticateUser, ItemController.resetItem);

api.get("/api/decks", AuthController.authenticateUser, DeckController.getDecks);

api.post("/api/decks", AuthController.authenticateUser, DeckController.createDeck);

api.get("/api/decks/:deck_id", AuthController.authenticateUser, DeckController.getDeck);

api.put("/api/decks/:deck_id", AuthController.authenticateUser, DeckController.editDeck);

api.post("/api/decks/:deck_id/reset", AuthController.authenticateUser, DeckController.resetDeck);

api.delete("/api/decks/:deck_id", AuthController.authenticateUser, DeckController.deleteDeck);

api.get("/api/sessions/:session_id", AuthController.authenticateUser, SessionController.getSession);

// api.post("/api/sessions", AuthController.authenticateUser, SessionController.createSession);

// api.get("/api/study_types", AuthController.authenticateUser, SessionController.getStudyTypes);

module.exports = api;
