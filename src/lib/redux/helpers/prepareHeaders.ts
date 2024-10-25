import { type RootState } from '@reduxjs/toolkit/query';

export const prepareHeaders = (state: RootState<any, any, any>) => {
    const mutations = state?.auth?.mutations;
    if (mutations) {
        const loginMutation: any = Object.values(mutations).find(
            (mutation: any) =>
                mutation.endpointName === 'loginUser' &&
                mutation.status === 'fulfilled',
        );

        if (
            loginMutation &&
            loginMutation?.data &&
            loginMutation?.data?.token
        ) {
            return {
                Authorization: `Bearer ${loginMutation.data.token}`,
            };
        }
    }
    return {};
};
