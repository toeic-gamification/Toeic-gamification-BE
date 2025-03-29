const mongoose = require("mongoose");

const VocabularySchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  meaning: { type: String, required: true },
  category: { type: String },
});

const Vocabulary = mongoose.model("Vocabulary", VocabularySchema);
module.exports = Vocabulary;
