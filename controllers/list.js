const List = require("../models/list");
const User = require("../models/user");
const csvParser = require("csv-parser");
const fs = require("fs");

const createList = async (req, res) => {
  try {
    const { title, customProperties } = req.body;
    const newList = new List({ title, customProperties });
    await newList.save();
    res.status(201).json({
      success: true,
      message: "List created successfully",
      data: newList,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const addUsersFromCSV = async (req, res) => {
  const { listId } = req.params;
  const results = [];
  const errors = [];
  let addedCount = 0;

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    const stream = fs
      .createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (data) => {
        results.push(data);
        if (results.length > 10000) {
          stream.pause();
          processChunk(results.splice(0, results.length));
          stream.resume();
        }
      })
      .on("end", async () => {
        if (results.length > 0) {
          await processChunk(results);
        }
        const totalCount = await User.countDocuments({ listId: listId });
        res.status(200).json({
          success: true,
          message: "Users processed from CSV",
          addedCount,
          errorCount: errors.length,
          totalCount,
          errors,
        });
      });

    const processChunk = async (chunk) => {
      for (let row of chunk) {
        const { name, email, ...customProps } = row;
        if (!name || !email) {
          errors.push({ ...row, error: "Name and email are required" });
          continue;
        }

        try {
          const properties = new Map();
          list.customProperties.forEach((prop) => {
            properties.set(
              prop.title,
              customProps[prop.title] || prop.fallbackValue
            );
          });

          const user = new User({
            name,
            email,
            properties: properties,
            listId: listId,
          });

          await user.save();
          addedCount++;
        } catch (err) {
          errors.push({ ...row, error: err.message });
        }
      }
    };
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createList,
  addUsersFromCSV,
};
