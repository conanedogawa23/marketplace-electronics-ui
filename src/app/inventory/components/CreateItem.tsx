import { Close, PhotoCamera } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputLabel,
    MenuItem,
    RadioGroup,
    Select,
    styled,
    Switch,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';

interface ItemDialogProps {
    open: boolean;
    handleClose: () => void;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    backgroundColor: 'transparent', // No background for the group
    '& .MuiToggleButton-root': {
        border: 'none',
        borderRadius: theme.shape.borderRadius,
        marginRight: theme.spacing(1),
        color: theme.palette.grey[600],
        fontSize: 12,
        fontWeight: 500,
        '&.Mui-selected': {
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            backgroundColor: 'transparent',
        },
    },
}));

export function CreateItemDialog({ open, handleClose }: ItemDialogProps) {
    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
                <DialogTitle>
                    Create Item
                    <IconButton
                        aria-label='close'
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <IconButton color='primary'>
                                <InfoIcon />
                            </IconButton>
                            <StyledToggleButtonGroup exclusive>
                                <ToggleButton
                                    value='bundle'
                                    sx={{
                                        color: 'green !important',
                                        '&.Mui-selected': {
                                            color: 'darkgreen',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    Bundle
                                </ToggleButton>
                                <ToggleButton
                                    value='favorite'
                                    sx={{
                                        color: 'orange !important',
                                        '&.Mui-selected': {
                                            color: 'darkorange',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    Favorite
                                </ToggleButton>
                                <ToggleButton
                                    value='discontinued'
                                    sx={{
                                        color: 'red !important',
                                        '&.Mui-selected': {
                                            color: 'darkred',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    Discontinued
                                </ToggleButton>
                                <ToggleButton
                                    value='custom'
                                    sx={{
                                        color: 'blue !important',
                                        '&.Mui-selected': {
                                            color: 'darkblue',
                                            fontWeight: 'bold',
                                        },
                                    }}
                                >
                                    Custom Item
                                </ToggleButton>
                            </StyledToggleButtonGroup>
                        </Box>

                        <TextField
                            fullWidth
                            label='Search Products or Bundle'
                            placeholder="e.g., 'White Tannoy Bracket', 'Laser Projector'"
                            variant='outlined'
                            sx={{ mb: 2 }}
                        />

                        <RadioGroup row>
                            <FormControlLabel
                                control={<Checkbox />}
                                label='Physical Item'
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label='Labor Item'
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label='Sub-Contract Labor'
                            />
                        </RadioGroup>

                        <Button
                            variant='contained'
                            component='label'
                            startIcon={<PhotoCamera />}
                            sx={{ mb: 2 }}
                        >
                            Upload
                            <input type='file' hidden />
                        </Button>

                        <TextField
                            fullWidth
                            label='Manufacturer Name'
                            variant='outlined'
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label='Product Model'
                            variant='outlined'
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label='Short Description'
                            variant='outlined'
                            sx={{ mb: 2 }}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Category</InputLabel>
                            <Select label='Category'>
                                <MenuItem value='category1'>
                                    Category 1
                                </MenuItem>
                                <MenuItem value='category2'>
                                    Category 2
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <Typography variant='subtitle1' sx={{ mb: 2 }}>
                            Product Pricing
                        </Typography>
                        <TextField
                            fullWidth
                            label='MSRP'
                            variant='outlined'
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            fullWidth
                            label='MAP'
                            variant='outlined'
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            fullWidth
                            label='Cost'
                            variant='outlined'
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            fullWidth
                            label='Sell Price'
                            variant='outlined'
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            fullWidth
                            label='Shipping Cost'
                            variant='outlined'
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            fullWidth
                            label='Shipping Price'
                            variant='outlined'
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            fullWidth
                            label='Quantity'
                            variant='outlined'
                            sx={{ mb: 2 }}
                        />

                        <Typography variant='subtitle1' sx={{ mt: 2, mb: 1 }}>
                            Integrate/ Labor
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Design/Engineering</InputLabel>
                                <Select label='Design/Engineering'>
                                    <MenuItem value='option1'>
                                        Option 1
                                    </MenuItem>
                                    <MenuItem value='option2'>
                                        Option 2
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Installation</InputLabel>
                                <Select label='Installation'>
                                    <MenuItem value='option1'>
                                        Option 1
                                    </MenuItem>
                                    <MenuItem value='option2'>
                                        Option 2
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Training</InputLabel>
                                <Select label='Training'>
                                    <MenuItem value='option1'>
                                        Option 1
                                    </MenuItem>
                                    <MenuItem value='option2'>
                                        Option 2
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Programming</InputLabel>
                                <Select label='Programming'>
                                    <MenuItem value='option1'>
                                        Option 1
                                    </MenuItem>
                                    <MenuItem value='option2'>
                                        Option 2
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Additional Information */}
                        <Typography
                            variant='h4'
                            sx={{
                                mt: 2,
                                mb: 1,
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            Additional Information
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                label='Room'
                                variant='outlined'
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label='System'
                                variant='outlined'
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label='Tag'
                                variant='outlined'
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            label='Phase'
                            variant='outlined'
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            label='Internal Notes (for team)'
                            variant='outlined'
                            minRows={3}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            label='External Notes (for reports)'
                            variant='outlined'
                            minRows={3}
                            sx={{ mb: 2 }}
                        />

                        {/* Options / Upgrade / Tool */}
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch />}
                                label='HIDE. This item will be invisible in proposals, but the math applies.'
                            />
                            <FormControlLabel
                                control={<Switch />}
                                label='OMIT FROM PACKAGES. Ignore the item in Service Package Pricing Calculation.'
                            />
                            <FormControlLabel
                                control={<Switch />}
                                label='ASSET/SERIAL # TRACKING. Track this item through installation & support.'
                            />
                        </FormGroup>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleClose}
                        variant='contained'
                        color='primary'
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
