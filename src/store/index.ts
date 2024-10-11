import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { newsApi } from './services/newsApi.ts';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(newsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
