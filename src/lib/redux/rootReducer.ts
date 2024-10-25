import { combineReducers } from '@reduxjs/toolkit';

import { authSlice } from './auth/slice';
import { graphQLBaseAPI } from './graphQLBaseAPI';
import { restBaseApi } from './restBaseAPI';
import { userApi } from './user';

export const reducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [graphQLBaseAPI.reducerPath]: graphQLBaseAPI.reducer,
    [restBaseApi.reducerPath]: restBaseApi.reducer,

    /* Slices */
    [authSlice.reducerPath]: authSlice.reducer,
});

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['userApi'],
//     blacklist: [],
//     transforms: []
// };

// export const persistedReducer = persistReducer(persistConfig, reducer);
