/* Core */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { middleware } from './middleware';

/* Instruments */
import { reducer } from './rootReducer';

export const reduxStore = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
});

setupListeners(reduxStore.dispatch);

export type AppDispatch = typeof reduxStore.dispatch;
export type RootState = ReturnType<typeof reduxStore.getState>;
