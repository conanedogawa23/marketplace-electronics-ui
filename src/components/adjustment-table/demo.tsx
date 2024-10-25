import { useState } from 'react';

import { getProductAdjustmentListMock } from '@/lib/__mocks__/product/index';

import { AdjustmentTable } from '.';
import { columns } from './columns';
import { ExpandableView } from './expandable-view';
import { useSkipper } from './useSkipper';

export function DemoAdjustmentTable() {
    const [data, setData] = useState(() => getProductAdjustmentListMock(20));

    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

    return (
        <AdjustmentTable
            data={data}
            columns={columns}
            expandableView={ExpandableView}
            autoResetPageIndex={autoResetPageIndex}
            meta={{
                adjustmentTable: {
                    deleteRow: (rowId) => {
                        // Skip page index reset until after next rerender
                        skipAutoResetPageIndex();

                        console.log('delete triggered');
                        setData((old) =>
                            old.filter((row) => row.uuid !== rowId),
                        );
                    },
                    updateData: (rowIndex, columnId, value) => {
                        // Skip page index reset until after next rerender
                        skipAutoResetPageIndex();

                        // console.log('update triggered');
                        setData((old) =>
                            old.map((row, index) => {
                                if (index === rowIndex) {
                                    return {
                                        ...old[rowIndex],
                                        [columnId]: value,
                                    };
                                }
                                return row;
                            }),
                        );
                    },
                },
            }}
        />
    );
}

export default DemoAdjustmentTable;
