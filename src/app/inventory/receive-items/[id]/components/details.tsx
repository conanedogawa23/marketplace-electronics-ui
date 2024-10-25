import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import PrintQrModal from "./PrintQrModal";

export type ReceiveItemDynamicPageDetailsProps = {
    receivingOrderId: string;
    setReceivingOrderId: React.Dispatch<React.SetStateAction<string>>;
    note: string;
    setNote: React.Dispatch<React.SetStateAction<string>>;
    productsData: any;
};

const ReceiveItemDynamicPageDetails: React.FC<
    ReceiveItemDynamicPageDetailsProps
> = ({
    receivingOrderId,
    setReceivingOrderId,
    note,
    setNote,
    productsData,
}) => {
    const [openPrintQrModal, setOpenPrintQrModal] = useState(false);
    const handleOpenPrintModal = () => {
        setOpenPrintQrModal(true);
    };

    return (
        <Box
            px={8}
            py={4}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Box display={'flex'} gap={6}>
                <Stack>
                    <Typography
                        fontWeight={500}
                        fontSize={14}
                        lineHeight={'30px'}
                        mb={1}
                        sx={(theme) => ({
                            color: theme.customColors?.text.secondary.light,
                        })}
                    >
                        Receiving Order
                    </Typography>
                    <TextField
                        placeholder='R0-1256'
                        size='small'
                        value={receivingOrderId}
                        onChange={(e) => {
                            setReceivingOrderId(e.target.value);
                        }}
                    />
                </Stack>
                <Stack>
                    <Typography
                        fontWeight={500}
                        fontSize={14}
                        lineHeight={'30px'}
                        mb={1}
                        sx={(theme) => ({
                            color: theme.customColors?.text.secondary.light,
                        })}
                    >
                        Add note
                    </Typography>
                    <TextField
                        placeholder='R0-1256'
                        size='small'
                        value={note}
                        onChange={(e) => {
                            setNote(e.target.value);
                        }}
                    />
                </Stack>
            </Box>
            <Stack>
                <Box
                    mr={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Button
                        onClick={handleOpenPrintModal}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            color: '#C255D9',
                            backgroundColor: 'transparent',
                            textAlign: 'center',
                        }}
                    >
                        <CloudDownloadOutlinedIcon sx={{ mr: 2 }} /> Download QR
                        Labels
                    </Button>
                    <PrintQrModal
                        open={openPrintQrModal}
                        setOpen={setOpenPrintQrModal}
                        headerTypographyContent='Print QR Labels'
                        productsData={productsData}
                    />
                </Box>
            </Stack>
        </Box>
    );
};

export default ReceiveItemDynamicPageDetails;
