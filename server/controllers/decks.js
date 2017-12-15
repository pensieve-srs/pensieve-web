const Deck = require("../models/deck");
const Item = require("../models/item");
const Session = require("../models/session");
const shuffle = require("../helpers/shuffle");

const onSuccess = res => deck => res.status(200).json({ deck });

const onError = res => error => res.status(500).json({ error });

function getDecks(req, res) {
  Deck.find({ user: req.user._id }).then(decks => res.status(200).json({ decks }), onError(res));
}

function getDeck(req, res) {
  const deckId = req.params.deck_id;
  const userId = req.user._id;

  Item.find({ user: userId, deck: deckId }).then(items => {
    Deck.findOne({ _id: deckId, user: userId }).then(response => {
      return res.status(200).json({ deck: { ...response.toObject(), items } });
    }, onError(res));
  });
}

function createDeck(req, res) {
  const userId = req.user._id;

  const deck = new Deck({
    user: userId,
    title: req.body.title,
    description: req.body.description,
  });

  deck.save().then(onSuccess(res), onError(res));
}

function editDeck(req, res) {
  const deckId = req.params.deck_id;
  const userId = req.user._id;

  Item.find({ deck: deckId, user: userId }).then(items => {
    Deck.findOneAndUpdate(
      { _id: deckId, user: userId },
      { title: req.body.title, description: req.body.description },
      { new: true },
    ).then(response => {
      return res.status(200).json({ deck: { ...response.toObject(), items } });
    }, onError(res));
  });
}

function studyDeck(req, res) {
  const deckId = req.params.deck_id;
  const userId = req.user._id;

  Item.find({ user: userId, deck: deckId })
    .populate("deck")
    .then(items => {
      const sortedItems = shuffle(items);
      const itemIds = sortedItems.map(item => item._id);

      const session = new Session({
        user: userId,
        type: "deck",
        items: itemIds,
      });

      session.save().then(response => {
        response.items = sortedItems;
        return res.status(200).json({ session: response });
      }, onError(res));
    });
}

function deleteDeck(req, res) {
  const deckId = req.params.deck_id;
  const userId = req.user._id;

  Item.remove({ deck: deckId, user: userId }).then(items => {
    Deck.remove({ _id: deckId, user: userId }).then(onSuccess(res), onError(res));
  });
}

function resetDeck(req, res) {
  const deckId = req.params.deck_id;
  const userId = req.user._id;

  Item.update(
    { deck: deckId, user: userId },
    {
      $set: {
        repetitions: 0,
        EF: 2.5,
      },
      $unset: {
        nextReviewDate: 1,
        interval: 1,
        reviewedAt: 1,
      },
    },
    { multi: true, new: true },
  ).then(() => {
    Item.find({ deck: deckId, user: userId }).then(items => {
      Deck.findOne({ _id: deckId, user: userId }).then(response => {
        return res.status(200).json({ deck: { ...response.toObject(), items } });
      }, onError(res));
    });
  }, onError(res));
}

module.exports = { getDecks, getDeck, createDeck, editDeck, deleteDeck, resetDeck, studyDeck };
