import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readLikesItemList } from '../../api/likesInfo/likesInfoApi';

const fetchLikesItemList = createAsyncThunk(
  'likesInfo/fetchLikesItemList',
  async () => {
    return await readLikesItemList();
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchLikesItemList.fulfilled, (state, action) => {
      state.likesItemList = action.payload;
    });
  },
});

export const { setLikesItemList } = likesInfoSlice.actions;
export default likesInfoSlice.reducer;
export { fetchLikesItemList };
// ...existing code...
