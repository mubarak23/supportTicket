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
      console.log(token)
      return await ticketService.createTicket(ticketData, token);
    }catch(error){
      const message = (error.response && error.response.data
         && error.response.data.message) || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
  }
)


export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer