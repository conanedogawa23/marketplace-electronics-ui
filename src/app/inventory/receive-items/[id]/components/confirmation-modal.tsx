import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    IconButton,
    Modal,
    Stack,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import ArrowDownIcon from 'public/assets/arrow-down-icon.png';

export type ReceiveItemDynamicPageConfirmationModalProps = {
    open: boolean;
    handleClose: () => void;
    count: number;
    handleConfirm?: () => void;
    firstProductName: string;
};

const ReceiveItemDynamicPageConfirmationModal: React.FC<
    ReceiveItemDynamicPageConfirmationModalProps
> = ({ open, handleClose, count, handleConfirm, firstProductName }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box
                sx={{
                    position: 'absolute' as const,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 485,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 6,
                    outline: 'none',
                    borderRadius: '8px',
                }}
            >
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Image src={ArrowDownIcon} alt='Arrow Icon' />
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <Typography
                    fontSize={18}
                    fontWeight={600}
                    lineHeight={'28px'}
                    mt={4}
                >
                    Receive {firstProductName}{' '}
                    {count > 1
                        ? `+ ${count - 1} ${count - 1 > 1 ? 'items' : 'item'}`
                        : ''}
                    ?
                </Typography>
                <Typography
                    fontWeight={400}
                    fontSize={14}
                    lineHeight={'20px'}
                    sx={(theme) => ({
                        color: theme.customColors?.text.tertiary.light,
                    })}
                >
                    Do you want to make the changes?
                </Typography>
                <Stack
                    direction={'row'}
                    mt={8}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    gap={3}
                >
                    <Button
                        color='inherit'
                        sx={(theme) => ({
                            flex: 1,
                            borderColor:
                                theme.customColors?.border.primary.light,
                        })}
                        variant='outlined'
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color='secondary'
                        sx={{ flex: 1 }}
                        variant='contained'
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ReceiveItemDynamicPageConfirmationModal;
