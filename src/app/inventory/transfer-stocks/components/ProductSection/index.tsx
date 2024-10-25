import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Box, CircularProgress } from '@mui/material';
import type React from 'react';

import { type Product } from '@/lib/redux/products/types';

import AutcompleteSelectAndSearchOption from '../../../../../components/AutocompleteSelectAndSearchOption';
import { StyledPurpleOutlinedButton } from '../styles';
import { type TransferStocksTableData } from '../table/types';

interface ProductSectionProps {
    products: Product[];
    setProductsToTransfer: React.Dispatch<
        React.SetStateAction<TransferStocksTableData[]>
    >;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setFiedlValue: any;
    fieldValue: any;
}

const ProductSection = ({
    products,
    setProductsToTransfer,
    setQuery,
    setFiedlValue,
    fieldValue,
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
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    px: '30px',
                }}
            >
                <AutcompleteSelectAndSearchOption
                    placeholder='Search Items'
                    shouldRenderAddNewOption={false}
                    autoCompleteOptions={(Array.isArray(products)
                        ? products
                        : []
                    ).map((option: any) => ({
                        label: option?.product?.name,
                        value: option?.product?.uuid,
                    }))}
                    setSearchQuery={setQuery}
                    setFieldValue={setFiedlValue}
                    fieldValue={fieldValue}
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
