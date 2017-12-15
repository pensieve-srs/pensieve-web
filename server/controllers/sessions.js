// const Item = require("../models/item");
const Session = require("../models/session");
// const ItemController = require("./items");
// const shuffle = require("../helpers/shuffle");

// const SESSION_TYPES = {
//   STUDY: "study",
//   LEARN: "learn",
//   REVIEW: "review",
//   DECK: "deck",
// };

const REVIEW_SESSION_SIZE = 15;
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

// export async function createSession(req, res) {
//   const userId = req.user._id;
//   const deckId = req.body.deckId;
//   let sessionType = req.body.sessionType;
//
//   try {
//     let sessionItems;
//     if (deckId) {
//       // Deck-only review
//       sessionItems = await Item.find({ user: userId, deck: deckId }).populate("deck");
//       sessionType = SESSION_TYPES.DECK;
//     } else if (sessionType === SESSION_TYPES.LEARN) {
//       // Learn session type
//       sessionItems = await ItemController.getNewItemsHelper(userId);
//     } else if (sessionType === SESSION_TYPES.REVIEW) {
//       // Review session type
//       sessionItems = await ItemController.getDueItemsHelper(userId);
//     } else {
//       // Study session type
//       const dueItems = await ItemController.getDueItemsHelper(userId);
//       const newItems = await ItemController.getNewItemsHelper(userId);
//
//       sessionItems = [...dueItems, ...newItems];
//       sessionType = SESSION_TYPES.STUDY;
//     }
//
//     if (sessionItems.length === 0) {
//       return res.status(400).json({
//         message:
//           "No available items to create session. You need to create a couple items to get started.",
//       });
//     }
//
//     const sortedSessionItems = shuffle(sessionItems).slice(0, REVIEW_SESSION_MAX);
//
//     const itemIds = sortedSessionItems.map(item => item._id);
//
//     let session = new Session({ user: userId, type: sessionType, items: itemIds });
//
//     session = await session.save();
//
//     session.items = sortedSessionItems;
//
//     return res.status(200).json({ session });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// }

// function getStudyTypes(req, res) {
//   const userId = req.user._id;
//
//   try {
//     const dueItems = await ItemController.getDueItemsHelper(userId);
//     const newItems = await ItemController.getNewItemsHelper(userId);
//
//     const numDueItems = dueItems.length;
//     const numNewItems = newItems.length;
//
//     return res.status(200).json({
//       study: {
//         size: Math.min(numDueItems + numNewItems, REVIEW_SESSION_MAX),
//         total: numDueItems + numNewItems,
//       },
//       learn: {
//         size: Math.min(numNewItems, REVIEW_SESSION_MAX),
//         total: numNewItems,
//       },
//       review: {
//         size: Math.min(numDueItems, REVIEW_SESSION_MAX),
//         total: numDueItems,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// }

module.exports = { getSession };
