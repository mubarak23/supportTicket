const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require('../models/ticketModel')

// @Desc Get all user Tickets
// @Route GET /api/tickets
// @Access Protected
const getTickets = asyncHandler(async (req, res) => {
    // get user id from the protected middleware
    const user = await User.findById(req.user.id)
    console.log(req.user.id)
    if(!user){
      res.status(401)
      throw new Error('User not Found')
    }
    const tickets = await Ticket.find({user: user.id})
  res.status(200).json(tickets);
});

// @Desc Get Single Ticket Details
// @Route GET /api/tickets/:id
// @Access Protected
const getTicket = asyncHandler(async (req, res) => {
  console.log(req.user.id);
    const user = await User.findById(req.user.id)
    if(!user){
      res.status(401)
      throw new Error('User not Found')
    }
  const ticket = await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(404)
    throw new Error('Ticket Not Found')
  }  
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }
  res.status(201).json(ticket);
})


// @Desc Create new user Ticket
// @Route POST /api/tickets
// @Access Protected
const createTicket = asyncHandler(async (req, res) => {
  const { product, description} = req.body
  if(!product && !description){
    res.status(400)
    throw new Error('Please a product and Description')
  }
  // the user exist on the system
    const user = await User.findById(req.user.id)
    if(!user){
      res.status(401)
      throw new Error('User not Found')
    }
    
    // create a new ticket
    const newTicket = await Ticket.create({
      product,
      description,
      user: req.user.id,
      status: 'new'
    })

  res.status(201).json(newTicket);
});

// @Desc Delete a Ticket 
// @Route DELETE /api/tickets/:id
// @Access Protected
const deleteTicket = asyncHandler(async (req, res) => {
  console.log(req.user.id);
    const user = await User.findById(req.user.id)
    if(!user){
      res.status(401)
      throw new Error('User not Found')
    }
  const ticket = await Ticket.findById(req.params.id)
  if(!ticket){
    res.status(404)
    throw new Error('Ticket Not Found')
  }  
  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Not Authorized')
  }
  await ticket.remove()

  res.status(201).json({success: true});
})


module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket
};
