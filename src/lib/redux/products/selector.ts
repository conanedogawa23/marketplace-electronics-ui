import { createSelector } from '@reduxjs/toolkit';

import { GRAPHQL_TAGS } from '../graphQLTags';

const seletedApiState = (state: any) => state?.['graphQL-base-API'];

export const productDataInLocation = createSelector(
    [seletedApiState],
    (apiState: any) => {
        let productInLocationKey =
            apiState?.provided?.[GRAPHQL_TAGS?.LocationProducts]?.[
                `${GRAPHQL_TAGS?.LocationProducts}_LIST`
            ];
        if (!productInLocationKey?.length) return;
        productInLocationKey =
            productInLocationKey[productInLocationKey?.length - 1];
        const query = apiState?.queries[productInLocationKey] || [];
        return query?.data;
    },
);

export const fetchProductDataInLocationFilters = createSelector(
    [seletedApiState],
    (apiState: any) => {
        let productInLocationKey =
            apiState?.provided?.[GRAPHQL_TAGS?.LocationProducts]?.[
                `${GRAPHQL_TAGS?.LocationProducts}_LIST`
            ];
        if (!productInLocationKey?.length) return;
        productInLocationKey =
            productInLocationKey[productInLocationKey?.length - 1];
        const query = apiState?.queries[productInLocationKey] || [];
        return query?.originalArgs?.filters;
    },
);
