const express = require("express");
const router = express.Router();
const listController = require("../controllers/list");

/*
Description - router to List
Body - title and custom properties
Method - POST
*/
router.post("/create-list", listController.createList);

module.exports = router;
