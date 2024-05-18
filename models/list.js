const mongoose = require("mongoose");

const CustomPropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  fallbackValue: { type: String, required: true },
});

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    customProperties: [CustomPropertySchema],
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
