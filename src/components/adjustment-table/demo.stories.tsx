import type { Meta, StoryObj } from '@storybook/react';

import { DemoAdjustmentTable } from './demo';

const meta = {
    component: DemoAdjustmentTable,
} satisfies Meta<typeof DemoAdjustmentTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
