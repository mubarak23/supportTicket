const express = require("express");
const { protected } = require("../middleware/authMiddlware.js");
const {
  getTicketNotes,
  addTicketNote,
} = require("../controllers/noteController");

const router = express.Router({mergeParams: true});

router.route("/")
  .get(protected, getTicketNotes)
  .post(protected, addTicketNote);

module.exports = router;