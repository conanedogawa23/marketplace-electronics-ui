import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Grid,
    Modal,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';

import { useGenerateQrCodeMutation } from '@/lib/redux/inventory/index';
import { type QrInputs } from '@/lib/redux/inventory/types';

import AvatarIcon from '../../../../../public/assets/Avatar.png';

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontWeight: '500',
    color: '#344054',
    marginBottom: '4px',
}));
const StyledFadedTypography = styled(Typography)(({ theme }) => ({
    color: '#667085',
    fontWeight: '600',
}));

interface FrameRowComponentProps {
    name: string;
    sku: string;
}
const FrameRowComponent: React.FC<FrameRowComponentProps> = ({ name, sku }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                paddingY: '25px',
                paddingX: '20px',
            }}
        >
            {/* <Checkbox color='secondary' /> */}
            <Image src={AvatarIcon} alt='Icon' width={50} />
            <Box>
                <StyledTypography>{name}</StyledTypography>
                <StyledFadedTypography>{sku}</StyledFadedTypography>
            </Box>
        </Box>
    );
};
interface CheckBoxBtnComponentProps {
    number: string;
    uuid: string;
    onChange: (uuid: string) => void;
    checked: boolean;
}
const CheckBoxBtnComponent: React.FC<CheckBoxBtnComponentProps> = ({
    number,
    uuid,
    onChange,
    checked,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid #D0D5DD',
                width: '100%',
                paddingRight: '8px',
                borderRadius: '8px',
            }}
        >
            <Checkbox
                color='secondary'
                id={uuid}
                checked={checked}
                onChange={() => onChange(uuid)}
            />
            <Typography sx={{ opacity: '0.6' }}>{number}</Typography>
        </Box>
    );
};
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
const StyledWhiteButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
}));
const StyledPurpleButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
}));
const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));
interface SerializedProduct {
    number: string;
    uuid: string;
}
interface ModalComponentProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    headerTypographyContent: string;
    productData: {
        name: string;
        uuid: string;
        sku: string;
        serializedProducts?: SerializedProduct[];
    };
    typeOfProduct: string;
}
const PrintDownLoadModal: React.FC<ModalComponentProps> = ({
    open,
    setOpen,
    headerTypographyContent,
    productData,
    typeOfProduct,
}) => {
    console.log('productData', productData);
    console.log('typeOfProduct', typeOfProduct);
    const [qrCodes, setQrCodes] = useState<string[]>([]);
    const [selectedSerializedProducts, setSelectedSerializedProducts] =
        useState<string[]>([]);
    const downloadQRCode = (base64Image: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = base64Image;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const [generateQrCode] = useGenerateQrCodeMutation();
    const handleGenerateQrCode = async () => {
        if (!productData.serializedProducts) return;
        const selectedProducts = productData?.serializedProducts.filter(
            (product) => selectedSerializedProducts.includes(product.uuid),
        );
        const qrInputs: QrInputs = {
            qrInput: [
                {
                    serializeIds: selectedProducts?.map((product) => ({
                        id: product.number,
                        uuid: product.uuid,
                    })),
                    sku: productData.sku,
                    type: typeOfProduct,
                    uuid: productData.uuid,
                    name: productData.name,
                },
            ],
        };
        const response = await generateQrCode(qrInputs);
        console.log('response', response);
        if (response?.data) {
            const qrCodes = response.data.map((data: any) => data.qrCode);
            setQrCodes(qrCodes);
        }
    };
    useEffect(() => {
        if (qrCodes.length > 0) {
            qrCodes.forEach((qrCode, index) => {
                let fileName = `${productData.name}_${productData.sku}`;
                if ((productData.serializedProducts ?? []).length > 0) {
                    const productNumber =
                        productData.serializedProducts?.[index]?.number ?? '';
                    fileName = `${productData.name}_${productData.sku}_${productNumber}`;
                }
                downloadQRCode(qrCode, fileName);
            });
        }
    }, [qrCodes]);
    const handleCheckboxChange = (uuid: string) => {
        setSelectedSerializedProducts((prevSelectedProducts) =>
            prevSelectedProducts.includes(uuid)
                ? prevSelectedProducts.filter((id) => id !== uuid)
                : [...prevSelectedProducts, uuid],
        );
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
                        <Typography
                            variant='subtitle1'
                            sx={{ fontWeight: 600 }}
                        >
                            {headerTypographyContent}
                        </Typography>

                        <Button
                            size='small'
                            sx={{ color: '#98A2B3' }}
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon />
                        </Button>
                    </Box>
                    <Divider sx={{ marginY: '16px' }} />

                    <FrameRowComponent
                        name={productData.name}
                        sku={productData.sku}
                    />
                    {typeOfProduct === 'serialized' && (
                        <Box sx={{ paddingX: '20px', my: 2, mt: 3 }}>
                            <Grid sx={{ mt: 1 }} container spacing={2}>
                                {productData.serializedProducts &&
                                    productData.serializedProducts.map(
                                        (product) => (
                                            <StyledGrid
                                                item
                                                xs={4}
                                                key={product.uuid}
                                            >
                                                <CheckBoxBtnComponent
                                                    number={product.number}
                                                    uuid={product.uuid}
                                                    onChange={
                                                        handleCheckboxChange
                                                    }
                                                    checked={selectedSerializedProducts.includes(
                                                        product.uuid,
                                                    )}
                                                />
                                            </StyledGrid>
                                        ),
                                    )}
                            </Grid>
                        </Box>
                    )}

                    <Divider />

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '10px',
                            mt: 2,
                        }}
                    >
                        <StyledWhiteButton onClick={() => setOpen(false)}>
                            Cancel
                        </StyledWhiteButton>
                        <StyledPurpleButton
                            variant='contained'
                            onClick={handleGenerateQrCode}
                        >
                            Apply
                        </StyledPurpleButton>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default PrintDownLoadModal;
