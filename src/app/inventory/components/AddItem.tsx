import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    IconButton,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ItemDialogProps {
    open: boolean;
    handleClose: () => void;
}

const StyledWhiteButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
    borderRadius: '8px',
}));
const StyledPurpleButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    borderRadius: '8px',
}));

const StyledTypographyLabel = styled(Typography)(({ theme }) => ({
    fontWeight: '500',
    color: '#344054',
    marginBottom: '4px',
}));
const StyledTextfieLdSmall = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        fontWeight: 500,
        padding: '8px',
        borderRadius: '8px',
        fontSize: '16px',
        border: '1px solid #D0D5DD',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
    },
}));

export const AddItemDialog = ({ open, handleClose }: ItemDialogProps) => {
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [nameError, setNameError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const router = useRouter();

    const handleProductTypeChange = (event: SelectChangeEvent<string>) => {
        setProductType(event.target.value as string);
        setTypeError(false);
    };

    const handleCreate = () => {
        if (!productName) {
            setNameError(true);
        }
        if (!productType) {
            setTypeError(true);
        }
        if (productName && productType) {
            const queryParams = new URLSearchParams({
                type: productType,
                name: productName,
            }).toString();
            router.push(`/inventory/item/create?${queryParams}`);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth='lg'
            sx={{ borderRadius: '20px' }}
        >
            <DialogTitle>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <StyledTypographyLabel sx={{ fontSize: '18px' }}>
                        New Product
                    </StyledTypographyLabel>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box component='form'>
                    <StyledTypographyLabel>Product Name</StyledTypographyLabel>
                    <StyledTextfieLdSmall
                        required
                        fullWidth
                        value={productName}
                        onChange={(e) => {
                            setProductName(e.target.value);
                            setNameError(false);
                        }}
                        error={nameError}
                        helperText={nameError ? 'Name is required' : ''}
                    />
                    <FormControl
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        error={typeError}
                    >
                        <StyledTypographyLabel>
                            Product Type
                        </StyledTypographyLabel>
                        <Select
                            required
                            value={productType}
                            onChange={handleProductTypeChange}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                },
                                '& .MuiSelect-outlined': {
                                    padding: '8px',
                                    borderRadius: '8px',
                                    border: '1px solid #D0D5DD',
                                },
                            }}
                        >
                            <MenuItem value='stocked'>Stocked</MenuItem>
                            <MenuItem value='non_stocked'>Non Stocked</MenuItem>
                            <MenuItem value='serialized'>Serialized</MenuItem>
                            <MenuItem value='services'>Service</MenuItem>
                        </Select>
                        {typeError && (
                            <FormHelperText>Type is required</FormHelperText>
                        )}
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '10px',
                        mt: '20px',
                    }}
                >
                    <StyledWhiteButton onClick={handleClose} variant='outlined'>
                        Cancel
                    </StyledWhiteButton>
                    <StyledPurpleButton
                        disabled={!productName || !productType}
                        onClick={handleCreate}
                        variant='contained'
                    >
                        Create
                    </StyledPurpleButton>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
