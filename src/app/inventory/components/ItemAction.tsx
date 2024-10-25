import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';

export const ItemActions = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (action: string) => {
        console.log(action);
        // Add your logic here for each action
        handleClose();
    };
    return (
        <div>
            <Button
                sx={{
                    color: '#344054',
                    fontWeight: 600,
                    border: '1px solid #D0D5DD',
                    fontSize: '14px',
                    textTransform: 'none',
                }}
                endIcon={<ArrowDropDownIcon />}
                onClick={handleClick}
            >
                Item Actions
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiPaper-root': {
                        width: anchorEl ? anchorEl.clientWidth : undefined,
                    },
                }}
            >
                <MenuItem onClick={() => handleMenuItemClick('Bulk Add')}>
                    Bulk Add
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Receive Item')}>
                    Receive Item
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Bulk Receive')}>
                    Bulk Receive
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Adjust Stock')}>
                    Adjust Stock
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Set Min/Max')}>
                    Set Min/Max
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Move Item')}>
                    Move Item
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Transfer Item')}>
                    Transfer Item
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Generate QR')}>
                    Generate QR
                </MenuItem>
            </Menu>
        </div>
    );
};

export default ItemActions;
