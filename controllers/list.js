const List = require("../models/list");
const User = require("../models/user");

const createList = async (req, res) => {
  try {
    const { title, customProperties } = req.body;
    const newList = new List({ title, customProperties });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createList,
};
