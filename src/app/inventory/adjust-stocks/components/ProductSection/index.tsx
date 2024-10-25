import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Box, CircularProgress } from '@mui/material';

import Autocomplete from '@/components/Autocomplete';

import { type Location } from '@/lib/redux/locations/types';
import { type Product } from '@/lib/redux/products/types';

import { StyledPurpleOutlinedButton } from '../styles';
import { type AdjustmentTableDataType } from '../table/types';

interface ProductSectionProps {
    isLoadingProducts: boolean;
    productData: Product[];
    warehouseLocations?: Location[];
    setProductsToAdjust: React.Dispatch<
        React.SetStateAction<AdjustmentTableDataType[]>
    >;
    setQuery: (query: string) => void;
}

export const ProductSection = ({
    isLoadingProducts,
    productData,
    warehouseLocations,
    setProductsToAdjust,
    setQuery,
}: ProductSectionProps) => {
    const Loading = (
        <Box
            sx={{
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress color='secondary' />
        </Box>
    );

    return isLoadingProducts ? (
        Loading
    ) : (
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Autocomplete
                    options={productData}
                    getOptionLabel={
                        (product) => product.name // + ' ' + product.uuid
                    }
                    onChange={(event, newValue) => {
                        setProductsToAdjust((prev) => {
                            if (!newValue) return prev;

                            if (
                                prev.some((obj) => obj.uuid === newValue.uuid)
                            ) {
                                return prev;
                            }
                            return [
                                ...prev,
                                {
                                    ...newValue,
                                    deleteSerialNumbers: false,
                                    serialsToAdd: [],
                                    serialsToRemove: [],
                                    locations: warehouseLocations || [],

                                    subLocation: '',

                                    initialQuantity: newValue.quantity,
                                    changedQuantity: 0,
                                    finalQuantity: newValue.quantity,
                                },
                            ] satisfies AdjustmentTableDataType[];
                        });
                    }}
                    onInputChange={(event, newInputValue) => {
                        setQuery(newInputValue);
                    }}
                    isOptionEqualToValue={(option, value) => {
                        return option?.uuid === value?.uuid;
                    }}
                />
                <StyledPurpleOutlinedButton
                    startIcon={<QrCodeScannerIcon sx={{ color: '#AB41C2' }} />}
                >
                    Scan
                </StyledPurpleOutlinedButton>
            </Box>
        </Box>
    );
};

export default ProductSection;
