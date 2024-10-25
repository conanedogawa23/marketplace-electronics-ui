import { Box } from '@mui/material';

import { useReceiveItemColumns } from '@/app/inventory/receive-items/[id]/components/columns/index';

import { AdjustmentTable } from '@/components/adjustment-table';
import { useSkipper } from '@/components/adjustment-table/useSkipper';

import { ExpandableView } from '../expandable-view';
import { type ReceiveItemTableDataType } from './types';

export type ReceiveItemDynamicPageTable = {
    data: ReceiveItemTableDataType[];
    setData: React.Dispatch<React.SetStateAction<ReceiveItemTableDataType[]>>;
    selectedWarehouse: string;
    errors?: Record<
        string,
        Partial<Record<keyof ReceiveItemTableDataType, string>>
    >;
};

export const ReceiveItemDynamicPageTable: React.FC<
    ReceiveItemDynamicPageTable
> = ({ data, setData, selectedWarehouse, errors }) => {
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

    const columns = useReceiveItemColumns(selectedWarehouse);

    return (
        <Box
            width='100%'
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 3,
            }}
        >
            <Box
                sx={{
                    width: '80%',
                    overflow: 'auto',
                    maxHeight: '600px',
                }}
            >
                <AdjustmentTable
                    data={data}
                    columns={columns}
                    expandableView={ExpandableView}
                    autoResetPageIndex={autoResetPageIndex}
                    meta={{
                        adjustmentTable: {
                            errors,
                            updateData: (rowIndex, columnId, value) => {
                                // Skip page index reset until after next rerender
                                skipAutoResetPageIndex();

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
                            deleteRow: (rowId) => {
                                // Skip page index reset until after next rerender
                                skipAutoResetPageIndex();

                                setData((old) =>
                                    old.filter((row) => row.uuid !== rowId),
                                );
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default ReceiveItemDynamicPageTable;
