/** @type {import('next').NextConfig} */

const APP_BASE_URL = '/inventory';

function getAPIEndpoint() {
    if (process.env.APP_ENV === 'local') {
        return 'http://localhost:4000/graphql';
    }

    if (process.env.APP_ENV === 'development') {
        return 'http://aa8e454d952dc445481fff77ddb8401b-2027329443.us-east-2.elb.amazonaws.com/graphql';
    }
}

const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    env: {
        API_ENDPOINT: getAPIEndpoint(),
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: APP_BASE_URL,
                permanent: true,
            },
            {
                source: '/settings',
                destination: '/settings/users',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
