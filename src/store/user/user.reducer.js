import { createSlice }  from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: null,
};


// with createSlice (reduxjs/toolkit) we've generated reducer and actions and types 
export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      //looks like mutation but under the hood it generates a new object 
      state.currentUser = action.payload; 
    },
  },
})

export const { setCurrentUser } = userSlice.actions;

// the reducer function that gets generated from the createSlice
export const userReducer = userSlice.reducer;
