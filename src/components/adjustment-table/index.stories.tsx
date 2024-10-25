import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { type ColumnDef, type Row, type Table } from '@tanstack/react-table';

import { getProductAdjustmentListMock } from '@/lib/__mocks__/product/index';

import { columns } from './columns';
import ExpandableView from './expandable-view';
import { AdjustmentTable } from './index';

const meta = {
    component: AdjustmentTable,
    args: {
        meta: {
            adjustmentTable: {
                updateData: (rowIndex, columnId, value) => {
                    fn();
                },
            },
        },
    },
} satisfies Meta<typeof AdjustmentTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
    args: {
        data: getProductAdjustmentListMock(10),
        columns: columns as ColumnDef<Record<string, unknown>, any>[],
        expandableView: ExpandableView as unknown as React.FC<{
            row: Row<Record<string, unknown>>;
            table: Table<Record<string, unknown>>;
        }>,

        autoResetPageIndex: false,
    },
};
