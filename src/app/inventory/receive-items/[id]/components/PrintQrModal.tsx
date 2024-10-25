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

import AvatarIcon from '../../../../../../public/assets/Avatar.png';

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
    uuid: string;
    serializedProducts: string[];
    serialized: boolean;
    isChecked: boolean;
    handleMainCheckboxChange: (uuid: string) => void;
    handleSerializedCheckboxChange: (
        productUuid: string,
        serializedUuid: string,
    ) => void;
    selectedSerializedProducts: string[];
}
const FrameRowComponent: React.FC<FrameRowComponentProps> = ({
    name,
    sku,
    uuid,
    serializedProducts,
    serialized,
    isChecked,
    handleMainCheckboxChange,
    handleSerializedCheckboxChange,
    selectedSerializedProducts,
}) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    paddingY: '12px',
                    paddingX: '20px',
                }}
            >
                <Checkbox
                    color='secondary'
                    id={uuid}
                    checked={isChecked}
                    onChange={() => handleMainCheckboxChange(uuid)}
                />
                <Image src={AvatarIcon} alt='Icon' width={50} />
                <Box>
                    <StyledTypography>{name}</StyledTypography>
                    <StyledFadedTypography>{sku}</StyledFadedTypography>
                </Box>
            </Box>

            <Box sx={{ paddingX: '20px', my: 2 }}>
                <Grid sx={{ mt: 1 }} container spacing={5}>
                    {serialized && (
                        <>
                            {serializedProducts.map((product, index) => (
                                <StyledGrid key={index} item xs={4}>
                                    <CheckBoxBtnComponent
                                        number={product}
                                        uuid={product}
                                        checked={selectedSerializedProducts.includes(
                                            product,
                                        )}
                                        onChange={() =>
                                            handleSerializedCheckboxChange(
                                                uuid,
                                                product,
                                            )
                                        }
                                    />
                                </StyledGrid>
                            ))}
                        </>
                    )}
                </Grid>
            </Box>
            <Divider />
        </>
    );
};
interface CheckBoxBtnComponentProps {
    number: string;
    uuid: string;
    onChange: () => void;
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
                // id={uuid}
                checked={checked}
                onChange={onChange}
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

interface ModalComponentProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    headerTypographyContent: string;
    productsData: any;
}
const PrintDownLoadModal: React.FC<ModalComponentProps> = ({
    open,
    setOpen,
    headerTypographyContent,
    productsData,
}) => {
    const [qrCodesData, setQrCodesData] = useState<any>([]);

    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [selectedSerializedProducts, setSelectedSerializedProducts] =
        useState<string[]>([]);
    const handleMainCheckboxChange = (uuid: string) => {
        setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.includes(uuid)
                ? prevSelectedProducts.filter((id) => id !== uuid)
                : [...prevSelectedProducts, uuid],
        );

        const product = productsData.find(
            (product: any) => product.uuid === uuid,
        );
        if (product && product.serializedProducts) {
            setSelectedSerializedProducts((prevSelectedSerializedProducts) =>
                prevSelectedSerializedProducts.includes(
                    product.serializedProducts[0],
                )
                    ? prevSelectedSerializedProducts.filter(
                          (id) => !product.serializedProducts.includes(id),
                      )
                    : [
                          ...prevSelectedSerializedProducts,
                          ...product.serializedProducts,
                      ],
            );
        }
    };
    const handleSerializedCheckboxChange = (
        productUuid: string,
        serializedUuid: string,
    ) => {
        setSelectedSerializedProducts((prevSelectedSerializedProducts) =>
            prevSelectedSerializedProducts.includes(serializedUuid)
                ? prevSelectedSerializedProducts.filter(
                      (id) => id !== serializedUuid,
                  )
                : [...prevSelectedSerializedProducts, serializedUuid],
        );
    };
    const [generateQrCode] = useGenerateQrCodeMutation();
    const handleGenerateQrCode = async () => {
        const qrInputs: QrInputs = {
            qrInput: productsData
                .filter(
                    (product: any) =>
                        selectedProducts.includes(product.uuid) ||
                        selectedSerializedProducts.some((id) =>
                            product.serializedProducts?.includes(id),
                        ),
                )
                .map((product: any) => ({
                    serializeIds: product.serializedProducts
                        ? product.serializedProducts
                              .filter((id: string) =>
                                  selectedSerializedProducts.includes(id),
                              )
                              .map((id: string) => ({ id }))
                        : [],
                    sku: product.sku,
                    type: product.serialized ? 'serialized' : 'nonserialized',
                    uuid: product.uuid,
                    name: product.name,
                })),
        };

        const response = await generateQrCode(qrInputs);
        if (response?.data) {
            const qrCodes = response.data.map((data: any) => ({
                qrCode: data.qrCode,
                name: data.name,
                sku: data.sku,
                type: data.type,
                serialNo: data.serialNo,
            }));
            setQrCodesData(qrCodes);
        }
    };
    const downloadQRCode = (base64Image: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = base64Image;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    useEffect(() => {
        if (qrCodesData.length > 0) {
            qrCodesData.forEach((qrCode: any) => {
                let fileName = `${qrCode.name}_${qrCode.sku}`;
                if (qrCode.serialNo) {
                    fileName = `${qrCode.name}_${qrCode.sku}_${qrCode.serialNo}`;
                }
                downloadQRCode(qrCode.qrCode, fileName);
            });
        }
    }, [qrCodesData]);

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
                    {productsData.map((product: any, index: any) => (
                        <Box key={index} sx={{ width: '100%' }}>
                            <FrameRowComponent
                                name={product.name}
                                sku={product.sku}
                                uuid={product.uuid}
                                serializedProducts={product.serializedProducts}
                                serialized={product.serialized}
                                isChecked={selectedProducts.includes(
                                    product.uuid,
                                )}
                                handleMainCheckboxChange={
                                    handleMainCheckboxChange
                                }
                                handleSerializedCheckboxChange={
                                    handleSerializedCheckboxChange
                                }
                                selectedSerializedProducts={
                                    selectedSerializedProducts
                                }
                            />
                        </Box>
                    ))}
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
