const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    deck: { type: Schema.Types.ObjectId, ref: "Deck" },
    front: { type: String, required: true },
    back: { type: String },
    title: { type: String }, // deprecated
    description: { type: String }, // deprecated
    reviewedAt: { type: Date }, // last review timestamp
    interval: { type: Number }, // review interval (in days)
    EF: { type: Number, default: 2.5 }, // SM-2 easiness factor
    nextReviewDate: { type: Date },
    repetitions: { type: Number, default: 0 }, // number of review repetitions
  },
  { timestamps: true },
);

module.exports = mongoose.model("Item", ItemSchema);
