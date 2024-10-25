import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { REST_TAGS } from './restTags';

// Define a service using a base URL and expected endpoints
export const restBaseApi = createApi({
    reducerPath: 'rest-base-API',
    tagTypes: Object.values(REST_TAGS),
    baseQuery: fetchBaseQuery({
        baseUrl:
            'http://aa8e454d952dc445481fff77ddb8401b-2027329443.us-east-2.elb.amazonaws.com/',
    }),
    endpoints: () => ({}),
});
