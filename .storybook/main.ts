import type { StorybookConfig } from '@storybook/nextjs';
import { resolve } from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/addon-themes',
    ],

    framework: {
        name: '@storybook/nextjs',
        options: {
            image: 'eager',
            nextConfigPath: resolve(__dirname, '../next.config.js'),
        },
    },

    docs: {},

    staticDirs: ['../public'],

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
};
export default config;
