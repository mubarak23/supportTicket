const express = require("express");
const { protected } = require("../middleware/authMiddlware.js");
const { getTickets, createTicket, getTicket, deleteTicket } = require("../controllers/ticketController");
const router = express();

router.route("/")
.get(protected, getTickets)
.post(protected, createTicket)

router.route('/:id')
.get( protected, getTicket)
.delete(protected, deleteTicket)
module.exports = router;
