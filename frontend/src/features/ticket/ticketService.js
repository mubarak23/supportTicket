import axios from "axios";


const API_URL = "/api/ticket/";


//create User Ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

// Get All user Ticket
const getAllUserTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get Ticket
const getTicket = async ( ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + ticketId, config);
  return response.data;
};

// Close Ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + ticketId, {status: 'closed'}, config);
  return response.data;
};



const ticketService = {
  createTicket,
  getAllUserTickets,
  getTicket,
  closeTicket,
};

export default ticketService