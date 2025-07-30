import { createSlice } from '@reduxjs/toolkit';

const likesInfoSlice = createSlice({
  name: 'likesInfo',
  initialState: {
    likesItemList: [],
  },
  reducers: {
    setLikesItemList: (state, action) => {
      state.likesItemList = action.payload;
    },
  },
});

export const { setLikesItemList } = likesInfoSlice.actions;
export default likesInfoSlice.reducer;
