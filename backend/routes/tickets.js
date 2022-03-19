const express = require("express");
const { protected } = require("../middleware/authMiddlware.js");
const { getTickets, createTicket, getTicket } = require("../controllers/ticketController");
const router = express();

router.route("/")
.get(protected, getTickets)
.post(protected, createTicket)

router.get('/:id', protected, getTicket)
module.exports = router;
