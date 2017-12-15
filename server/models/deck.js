const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeckSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Deck", DeckSchema);
