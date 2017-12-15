const Item = require("../models/item");
const Session = require("../models/session");
const shuffle = require("../helpers/shuffle");

const SESSION_TYPES = {
  STUDY: "study",
  LEARN: "learn",
  REVIEW: "review",
  DECK: "deck",
};

const REVIEW_SESSION_MAX = 30;

const onSuccess = res => session => res.status(200).json({ session });

const onError = res => error => res.status(500).json({ error });

function getSession(req, res) {
  const userId = req.user._id;
  const sessionId = req.params.session_id;

  Session.findOne({ _id: sessionId, user: userId })
    .populate({
      path: "items",
      model: "Item",
      populate: { path: "deck", modal: "Deck" },
    })
    .then(onSuccess(res), onError(res));
}

function createSession(req, res) {
  const userId = req.user._id;
  let type = req.body.sessionType;

  let itemQuery;

  if (type === SESSION_TYPES.LEARN) {
    itemQuery = Item.find({ user: userId, repetitions: 0 }).populate("deck");
  } else if (type === SESSION_TYPES.REVIEW) {
    itemQuery = Item.find({ user: userId })
      .populate("deck")
      .where("nextReviewDate")
      .lt(new Date());
  } else {
    // TODO: Needs to be updated
    itemQuery = Item.find({ user: userId })
      .populate("deck")
      .where("nextReviewDate")
      .lt(new Date());
  }

  itemQuery.then(items => {
    if (!items.length > 0) {
      return res.status(400).json({
        message:
          "No available items to create session. You need to create a couple items to get started.",
      });
    }

    const sortedItems = shuffle(items).slice(0, REVIEW_SESSION_MAX);
    const itemIds = sortedItems.map(item => item._id);

    const session = new Session({
      user: userId,
      type: type,
      items: itemIds,
    });

    session.save().then(response => {
      response.items = sortedItems;
      return res.status(200).json({ session: response });
    }, onError(res));
  });
}

function getStudyTypes(req, res) {
  const userId = req.user._id;

  Item.count({ user: userId, repetitions: 0 })
    .populate("deck")
    .then(numDueItems => {
      Item.count({ user: userId })
        .populate("deck")
        .where("nextReviewDate")
        .lt(new Date())
        .then(numNewItems => {
          return res.status(200).json({
            study: {
              size: Math.min(numDueItems + numNewItems, REVIEW_SESSION_MAX),
              total: numDueItems + numNewItems,
            },
            learn: {
              size: Math.min(numNewItems, REVIEW_SESSION_MAX),
              total: numNewItems,
            },
            review: {
              size: Math.min(numDueItems, REVIEW_SESSION_MAX),
              total: numDueItems,
            },
          });
        }, onError(res));
    }, onError(res));
}

module.exports = { getSession, createSession, getStudyTypes };
