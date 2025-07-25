import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WineData, WineListQuery, WineState } from './wineTypes';

const initialState: WineState = {
  wineList: [],
  filter: {},
  loading: false,
  error: null,
};

const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {
    setWineList(state, action: PayloadAction<WineData[]>) {
      state.wineList = action.payload;
    },
    setFilter(state, action: PayloadAction<WineListQuery>) {
      state.filter = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setWineList, setFilter, setLoading, setError } =
  wineSlice.actions;
export default wineSlice.reducer;
