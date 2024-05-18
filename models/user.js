const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    properties: {
      type: Map,
      of: String,
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1, listId: 1 }, { unique: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
