import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

import { GRAPHQL_TAGS } from './graphQLTags';
import { type RootState } from './store';

export const graphQLBaseAPI = createApi({
    reducerPath: 'graphQL-base-API',
    tagTypes: Object.values(GRAPHQL_TAGS),
    endpoints: () => ({}),

    baseQuery: graphqlRequestBaseQuery({
        url: process.env.API_ENDPOINT ?? 'http://localhost:4000/graphql',
        prepareHeaders: (headers, { getState }) => {
            const AUTH_TOKEN =
                (getState() as RootState).authSlice.token ??
                localStorage.getItem('token');

            if (AUTH_TOKEN) {
                headers.set('Authorization', `Bearer ${AUTH_TOKEN}`);
            }

            return headers;
        },
    }),
});
