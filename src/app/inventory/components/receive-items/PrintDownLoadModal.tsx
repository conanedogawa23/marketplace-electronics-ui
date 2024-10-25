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

import Autocomplete from '@/components/AutocompleteNew';

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
const FrameRowComponent: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                paddingY: '25px',
                width: '100%',
            }}
        >
            <Checkbox color='secondary' />
            <Image src={AvatarIcon} alt='Icon' width={50} />
            <Box>
                <StyledTypography>Absen A4 Pro X16 Video A11</StyledTypography>
                <StyledFadedTypography>ABC-12345-S-BL</StyledFadedTypography>
            </Box>
        </Box>
    );
};
const CheckBoxBtnComponent: React.FC = () => {
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
            <Checkbox color='secondary' />
            <Typography sx={{ opacity: '0.6' }}>ER-12345-IK</Typography>
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
}
const PrintDownLoadModal: React.FC<ModalComponentProps> = ({
    open,
    setOpen,
    headerTypographyContent,
}) => {
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

                    <FrameRowComponent />
                    <Box sx={{ paddingX: '20px', my: 2 }}>
                        <Autocomplete
                            width='100%'
                            navigateOnSelect={false}
                            options={['Option 1', 'Option 2', 'Option 3']}
                        />

                        <Grid sx={{ mt: 1 }} container spacing={2}>
                            {[...Array(9)].map((_, index) => (
                                <StyledGrid item xs={4} key={index}>
                                    <CheckBoxBtnComponent />
                                </StyledGrid>
                            ))}
                        </Grid>
                    </Box>
                    <Divider />
                    <FrameRowComponent />
                    <Divider />
                    <FrameRowComponent />
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
                        <StyledPurpleButton variant='contained'>
                            Apply
                        </StyledPurpleButton>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default PrintDownLoadModal;
