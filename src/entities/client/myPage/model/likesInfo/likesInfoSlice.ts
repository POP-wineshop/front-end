import { createSlice } from '@reduxjs/toolkit';

const likesInfoSlice = createSlice({
  name: 'likesInfo',
  initialState: {
    likesItems: [],
  },
  reducers: {
    setLikesItems: (state, action) => {
      state.likesItems = action.payload;
    },
  },
});

export const { setLikesItems } = likesInfoSlice.actions;
export default likesInfoSlice.reducer;
