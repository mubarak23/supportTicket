const express = require("express");
const { protected } = require("../middleware/authMiddlware.js");
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket  } = require("../controllers/ticketController");


const router = express.Router();

// Re-route into note route
const noteRouter = require('./notes')
router.use('/:ticketId/notes', noteRouter)

router.route("/")
.get(protected, getTickets)
.post(protected, createTicket)

router.route('/:id')
.get( protected, getTicket)
.delete(protected, deleteTicket)
.put(protected, updateTicket)
module.exports = router;
