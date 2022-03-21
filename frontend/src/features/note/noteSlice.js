/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";


const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};



// Get All Ticket Notes
export const getTicketNotes = createAsyncThunk('/notes/getAll',
  async(ticketId, thunkAPI) => {
    try{
      const token = thunkAPI.getState().auth.user.token
      
      return await noteService.getTicketNotes(ticketId, token);
    }catch(error){
      const message = (error.response && error.response.data
         && error.response.data.message) || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
  }
)


export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicketNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getTicketNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
})

export const { reset } = noteSlice
export default noteSlice.reducer