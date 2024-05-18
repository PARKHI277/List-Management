const express = require("express");
const router = express.Router();
const listController = require("../controllers/list");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Readable } = require("stream");
const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = path.join(__dirname, "../config/uploads");
//     fs.mkdir(uploadDir, { recursive: true }, function (err) {
//       if (err) {
//         console.error("Error creating upload directory:", err);
//         cb(err, null);
//       } else {
//         cb(null, uploadDir);
//       }
//     });
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const upload = multer({ storage: storage });

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
