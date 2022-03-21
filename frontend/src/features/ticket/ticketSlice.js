/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";


const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create New Ticket
export const createTicket = createAsyncThunk('/ticket',
  async(ticketData, thunkAPI) => {
    try{
      const token = thunkAPI.getState().auth.user.token
      
      return await ticketService.createTicket(ticketData, token);
    }catch(error){
      const message = (error.response && error.response.data
         && error.response.data.message) || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get All User Ticket
export const getAllTickets = createAsyncThunk('/ticket/getAll',
  async(_, thunkAPI) => {
    try{
      const token = thunkAPI.getState().auth.user.token
      
      return await ticketService.getAllUserTickets(token);
    }catch(error){
      const message = (error.response && error.response.data
         && error.response.data.message) || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get Single Ticket Details
export const getTicket = createAsyncThunk('/ticket/get',
  async(ticketId, thunkAPI) => {
    try{
      const token = thunkAPI.getState().auth.user.token
      
      return await ticketService.getTicket(ticketId, token);
    }catch(error){
      const message = (error.response && error.response.data
         && error.response.data.message) || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
  }
)

export const closeTicket = createAsyncThunk(
  "/ticket/close",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.tickets = []
      state.ticket = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.map((ticket) => ticket._id === action.payload._id
        ? (ticket.status = 'closed') : ticket );
      });
  }
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer