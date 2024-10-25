import { Box } from '@mui/material';
import { type Meta, type StoryFn } from '@storybook/react';

import { Sidebar } from './Sidebar';

export default {
    title: 'Components/Sidebar',
    component: Sidebar,
} as Meta;

// TODO: Add Redux compatibility
// https://storybook.js.org/tutorials/intro-to-storybook/react/en/data/

const Template: StoryFn = (args) => (
    <Box sx={{ width: 250, borderRight: '1px solid rgba(0,0,0,0.2)' }}>
        <Sidebar {...args} />
    </Box>
);

export const DefaultSidebar = Template.bind({});
