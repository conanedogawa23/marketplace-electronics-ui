import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import type React from 'react';
import { useSelector } from 'react-redux';

import { getFirstWarehouseName } from '@/lib/redux/warehouse/selector';

import ArrowDownIcon from '../../../../public/assets/arrow-down-icon.png';

interface StocksConfirmationModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    itemDescription: string;
    questionText: string;
    setUpdateProductPayload?: (value: any) => void;
    products?: any;
    setWarehouse?: (value: any) => void;
}

const AddLocationModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 3,
};

const StyledWhiteButton = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
}));

const StyledPurpleButton = styled(Button)(() => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
}));

const StyledTypography = styled(Typography)(() => ({
    fontWeight: '500',
    color: '#344054',
    marginBottom: '4px',
}));

export const StocksConfirmationModal: React.FC<
    StocksConfirmationModalProps
> = ({
    open,
    setOpen,
    itemDescription,
    questionText,
    products,
    setUpdateProductPayload,
    setWarehouse,
}) => {
    const warehouseName = useSelector((state: any) =>
        getFirstWarehouseName(state),
    );

    const confirmAdjustStockUpdate = () => {
        if (products.length > 0) {
            const productUpdateRequestPayload = products.map((product: any) => {
                const serialNumbers =
                    product.changedQuantity < 0
                        ? product.serialsToRemove
                        : product.serialsToAdd;
                const serializedCheck =
                    product.serialsToAdd.length > 0 ||
                    product.serialsToRemove.length > 0;
                return {
                    uuid: product.uuid,
                    quantity: product.changedQuantity,
                    fromLocation: '',
                    toLocation: product.subLocation,
                    deleteSerialNumbers: product.changedQuantity < 0,
                    serialNumbers: serialNumbers,
                    serialized: serializedCheck,
                };
            });
            if (setUpdateProductPayload)
                setUpdateProductPayload(productUpdateRequestPayload);
        }
        setOpen(false);
        if (setWarehouse) setWarehouse(warehouseName);
    };

    return (
        <Box>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={AddLocationModalStyle}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Image src={ArrowDownIcon} alt='Arrow Icon' />
                        <Button
                            size='small'
                            sx={{ color: '#98A2B3' }}
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon />
                        </Button>
                    </Box>
                    {products?.length > 0 && (
                        <StyledTypography variant='h5' sx={{ mt: 3 }}>
                            {`Adjust ${products[0]?.name} ${products.length > 0 ? '+1' : ''} products Qty?`}
                        </StyledTypography>
                    )}
                    <StyledTypography variant='h6' sx={{ opacity: '0.6' }}>
                        {questionText}
                    </StyledTypography>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={6}>
                            <StyledWhiteButton
                                sx={{ width: '100%' }}
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </StyledWhiteButton>
                        </Grid>
                        <Grid item xs={6}>
                            <StyledPurpleButton
                                sx={{ width: '100%' }}
                                variant='contained'
                                onClick={confirmAdjustStockUpdate}
                            >
                                Confirm
                            </StyledPurpleButton>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
};

export default StocksConfirmationModal;
