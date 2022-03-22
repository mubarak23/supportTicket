
import axios from "axios";

const API_URL = "/api/ticket/";


// Get All Ticket notes
const getTicketNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + ticketId + '/notes', config);
  return response.data;
};

// Add note to a Ticket
const AddTicketNote = async (ticketId, text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + ticketId + '/notes', {text}, config);
  return response.data;
};

const noteService = {
  getTicketNotes,
  AddTicketNote
}

export default noteService