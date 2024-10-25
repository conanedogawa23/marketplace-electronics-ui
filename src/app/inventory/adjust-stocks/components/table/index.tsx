import { Box, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { settingsTheme } from '@/app/settings/utils/theme';

import { AdjustmentTable } from '@/components/adjustment-table';
import { useSkipper } from '@/components/adjustment-table/useSkipper';

import {
    fetchProductDataInLocationFilters,
    productDataInLocation,
} from '@/lib/redux/products/selector';

import { columns } from '../columns';
import ExpandableView from '../expandable-view';
import { type AdjustmentTableDataType } from './types';

export type StockAdjustmentTableProps = {
    data: AdjustmentTableDataType[];
    setData: React.Dispatch<React.SetStateAction<AdjustmentTableDataType[]>>;
};
export const StockAdjustmentTable: React.FC<StockAdjustmentTableProps> = ({
    data,
    setData,
}) => {
    const getProductDataInLocation = useSelector((state: any) =>
        productDataInLocation(state),
    );
    const getProductDataInLocationFilters = useSelector((state: any) =>
        fetchProductDataInLocationFilters(state),
    );
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

    useEffect(() => {
        if (!getProductDataInLocationFilters) return;
        const { product: productId } = getProductDataInLocationFilters;
        const updatedProductData = data.map((product, index) => {
            if (product.uuid === productId) {
                return {
                    ...product,
                    serializedProducts:
                        getProductDataInLocation?.[index]?.product
                            ?.serializedProducts || product?.serializedProducts,
                    initialQuantity:
                        getProductDataInLocation?.[index]?.quantity || 0,
                    quantity: getProductDataInLocation?.[index]?.quantity || 0,
                    finalQuantity:
                        getProductDataInLocation?.[index]?.quantity || 0,
                };
            }
            return product;
        });
        setData(updatedProductData);
    }, [getProductDataInLocation, getProductDataInLocationFilters]);

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
