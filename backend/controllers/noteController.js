const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel")

// @Desc Get all Ticket Notes
// @Route GET /api/tickets/:ticketId/notes
// @Access Private
const getTicketNotes = asyncHandler(async (req, res) => {
  // get user id from the protected middleware
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error ('User Not Authorized')
  }
  const notes = await Note.find({ticket: req.params.ticketId})
  res.status(200).json(notes);
});

// @Desc add to a Ticket
// @Route POST /api/tickets/:ticketId/notes
// @Access Protected private
const addTicketNote = asyncHandler(async (req, res) => {
  console.log(req.user.id);
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
    // add note to a ticket
    const addNote = await Note.create({ 
      ticket: req.params.ticketId,
      user: req.user.id,
      text: req.body.text,
      isStaff: false
    }); 

  res.status(201).json(addNote);
});


module.exports = {
  getTicketNotes,
  addTicketNote,
};
