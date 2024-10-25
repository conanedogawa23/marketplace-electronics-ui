/* Core */
import { graphQLBaseAPI } from './graphQLBaseAPI';
import { restBaseApi } from './restBaseAPI';
import { userApi } from './user';

const middleware = [
    userApi.middleware,
    graphQLBaseAPI.middleware,
    restBaseApi.middleware,
];

export { middleware };
