const Item = require("../models/item");
const Review = require("../models/review");
const SM2 = require("./sm2");

const onSuccess = res => item => res.status(200).json({ item });

const onError = res => error => res.status(500).json({ error });

const getItem = (req, res) => {
  const itemId = req.params.item_id;
  const userId = req.user._id;

  Item.findOne({ _id: itemId, user: userId })
    .populate("deck")
    .then(onSuccess(res), onError(res));
};

const createItem = (req, res) => {
  const deckId = req.body.deck_id;
  const userId = req.user._id;

  const item = new Item({
    user: userId,
    front: req.body.front,
    back: req.body.back,
    deck: deckId,
  });

  item.save().then(onSuccess(res), onError(res));
};

const editItem = (req, res) => {
  const { front, back } = req.body;
  const query = { _id: req.params.item_id };
  const update = { front, back };

  Object.keys(update).forEach(key => update[key] === undefined && delete update[key]);

  Item.findOneAndUpdate(query, update, { new: true }).then(onSuccess(res), onError(res));
};

const deleteItem = (req, res) => {
  Item.remove({ _id: req.params.item_id }).then(onSuccess(res), onError(res));
};

// Implements the SM2 algorithm created by Peter Wozniak
// @see https://www.supermemo.com/english/ol/sm2.html
const reviewItem = (req, res) => {
  const value = req.body.value;
  const itemId = req.params.item_id;

  const review = new Review({
    item: itemId,
    user: req.user._id,
    value: req.params.value,
  });

  review.save();

  Item.findById(itemId).then(item => {
    const grade = SM2.getGrade(value);
    item.reviewedAt = new Date();
    if (grade < 3) {
      item.repetitions = 0;
      item.interval = 0;
    } else {
      item.repetitions = item.repetitions + 1;
      item.EF = SM2.getEF(item.EF, grade);
      item.interval = SM2.getNextInterval(item, grade);
    }
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + item.interval);
    item.nextReviewDate = nextReviewDate;

    item.save().then(onSuccess(res), onError(res));
  });
};

const resetItem = (req, res) => {
  const userId = req.user._id;
  const itemId = req.params.item_id;

  Item.findOne({ _id: itemId, user: userId })
    .populate("deck")
    .then(item => {
      item.repetitions = 0;
      item.EF = 2.5;
      item.nextReviewDate = undefined;
      item.interval = undefined;
      item.reviewedAt = undefined;

      item.save().then(onSuccess(res), onError(res));
    });
};

module.exports = { getItem, createItem, editItem, deleteItem, reviewItem, resetItem };
