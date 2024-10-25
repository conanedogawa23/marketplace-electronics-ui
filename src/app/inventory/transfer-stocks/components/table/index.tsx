import { Box, ThemeProvider } from '@mui/material';

import { settingsTheme } from '@/app/settings/utils/theme';

import { AdjustmentTable } from '@/components/adjustment-table';
import { useSkipper } from '@/components/adjustment-table/useSkipper';

import { columns } from '../columns';
import ExpandableView from '../expandable-view';
import { type TransferStocksTableData } from './types';

export type StockAdjustmentTableProps = {
    data: TransferStocksTableData[];
    setData: React.Dispatch<React.SetStateAction<TransferStocksTableData[]>>;
};
export const StockAdjustmentTable: React.FC<StockAdjustmentTableProps> = ({
    data,
    setData,
}) => {
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

    return (
        <ThemeProvider theme={settingsTheme}>
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
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingX: '30px',
                    }}
                >
                    <AdjustmentTable
                        data={data}
                        columns={columns}
                        expandableView={ExpandableView}
                        autoResetPageIndex={autoResetPageIndex}
                        meta={{
                            adjustmentTable: {
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

                                    console.log('delete row triggered');
                                    setData((old) =>
                                        old.filter((row) => row.uuid !== rowId),
                                    );
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default StockAdjustmentTable;
