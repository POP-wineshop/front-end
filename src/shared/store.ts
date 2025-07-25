import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/entities/client/user/model/userSlice';
import wineReducer from '@/entities/client/wine/model/wineSlice';
// import cartReducer from '@/entities/client/cart/model/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    wine: wineReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
