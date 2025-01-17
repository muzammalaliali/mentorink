import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventService from './eventService.js'


// use this function in Categories
export const AddSessions = createAsyncThunk("events/AddSessions", async (inputValues, thunkAPI)=>{
    try {
      const response = await eventService.createEvent(inputValues);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

// getting this function in Categories
export const getAllSessions  = createAsyncThunk("events/getAllSessions", async (_, thunkAPI)=>{
  try {
    const response = await eventService.getAllEvent();
      return response;
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});

// getting this function in single category
// export const GetSingleCategory  = createAsyncThunk("categories/GetSingleCategory", async (slug, thunkAPI)=>{
//   try {
//     const response = await categoriesService.getSingleCat(slug);
//       return response;
//   } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//   }
// });

export const GetSingleSession  = createAsyncThunk("events/GetSingleSession", async (eventId, thunkAPI)=>{
  try {
    const response = await eventService.getSingleEvent(eventId);
      return response;
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});


// use this function in UpdateCategory
export const updateSessions = createAsyncThunk("events/updateSessions", async ({eventId}, thunkAPI)=>{
  try {
    const response = await eventService.updateEvent({eventId});
      return response;
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});


// Use this function for deleting categories
export const DeleteSessions  = createAsyncThunk("events/DeleteSessions", async (eventId, thunkAPI)=>{
  try {
    const response = await eventService.deleteEvent(eventId);
      return response;
  } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }
});



const initialState = {
  events: [],
  status: "idle",
  error: null,
};

// user this export in store file, authReducer

export const eventsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
    state.value += action.payload
  },
},

extraReducers: (builder) => {
  builder
  .addCase(AddSessions.pending,(state) => {
    state.status = "loading";
    state.error = null;
  })
  .addCase(AddSessions.fulfilled,(state, action) => {
    state.status = "success";
    state.events = action.payload
  })
  .addCase(AddSessions.rejected,(state, action) => {
    state.status = "failed";
    state.error = action.payload
  })
  .addCase(getAllSessions.pending,(state) => {
    state.status = "loading";
    state.error = null;
  })
  .addCase(getAllSessions.fulfilled,(state, action) => {
    state.status = "success";
    state.events = action.payload
  })
  .addCase(getAllSessions.rejected,(state, action) => {
    state.status = "failed";
    state.error = action.payload
  })
  .addCase(GetSingleSession.pending,(state) => {
    state.status = "loading";
    state.error = null;
  })
  .addCase(GetSingleSession.fulfilled,(state, action) => {
    state.status = "success";
    state.events = action.payload
  })
  .addCase(GetSingleSession.rejected,(state, action) => {
    state.status = "failed";
    state.error = action.payload
  })
  .addCase(updateSessions.pending,(state) => {
    state.status = "loading";
    state.error = null;
  })
  .addCase(updateSessions.fulfilled,(state, action) => {
    state.status = "success";
    state.events = action.payload
  })
  .addCase(updateSessions.rejected,(state, action) => {
    state.status = "failed";
    state.error = action.payload
  })
  .addCase(DeleteSessions.pending,(state) => {
    state.status = "loading";
    state.error = null;
  })
  .addCase(DeleteSessions.fulfilled,(state, action) => {
    state.status = "success";
    state.events = action.payload
  })
  .addCase(DeleteSessions.rejected,(state, action) => {
    state.status = "failed";
    state.error = action.payload
  })
  
}

})

// Action creators are generated for each case reducer function
// export const { incrementByAmount  } = categoriesSlice.actions

export default eventsSlice.reducer