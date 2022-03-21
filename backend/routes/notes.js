const express = require("express");
const { protected } = require("../middleware/authMiddlware.js");
const { getTicketNotes } = require("../controllers/noteController");

const router = express.Router({mergeParams: true});

router.route("/").get(protected, getTicketNotes);

module.exports = router;