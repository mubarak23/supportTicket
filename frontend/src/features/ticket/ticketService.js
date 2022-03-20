import axios from "axios";


const API_URL = "/api/ticket";


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

const ticketService = {
  createTicket,
  getAllUserTickets,
};

export default ticketService