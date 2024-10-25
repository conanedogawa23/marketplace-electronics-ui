import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export type ReceiveItemDynamicPageHeaderProps = {
    onSubmit: () => void;
    isSubmitting: boolean;
    onCancel: () => void;
};

const ReceiveItemDynamicPageHeader: React.FC<
    ReceiveItemDynamicPageHeaderProps
> = ({ onSubmit, isSubmitting, onCancel }) => {
    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={8}
        >
            <Typography fontWeight={500} fontSize={'20px'} lineHeight={'30px'}>
                Receive Items
            </Typography>
            <Box
                flex={1}
                display={'flex'}
                justifyContent={'flex-end'}
                gap={'1rem'}
            >
                <Button
                    variant='outlined'
                    color='inherit'
                    sx={(theme) => ({
                        color: 'black',
                        borderColor: theme.customColors?.border.primary.light,
                    })}
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={onSubmit}
                >
                    {isSubmitting ? 'Loading...' : 'Done'}
                </Button>
            </Box>
        </Box>
    );
};

export default ReceiveItemDynamicPageHeader;
