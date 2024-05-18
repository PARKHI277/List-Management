const express = require("express");
const router = express.Router();
const listController = require("../controllers/list");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

/*
Description - router to create List
Body - title and custom properties
Method - POST
*/
router.post("/create-list", listController.createList);

/*
Description - router to add users via csv
params - id (list id)
Method - POST
*/
router.post(
  "/add-users/:listId",
  upload.single("file"),
  listController.addUsersFromCSV
);

module.exports = router;
