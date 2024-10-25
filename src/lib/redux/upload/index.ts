import { restBaseApi } from '../restBaseAPI';
import { type UploadImageAPIResponse } from './types';

export const uploadFileAPI = restBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<string, FormData>({
            query: (body) => ({
                url: 'files/upload',
                method: 'POST',
                body,
            }),
            transformResponse: (response: UploadImageAPIResponse) => {
                return response.data.uploadedAttachments[0];
            },
        }),
    }),
});

export const { useUploadFileMutation } = uploadFileAPI;
