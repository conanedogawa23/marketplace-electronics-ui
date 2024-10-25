'use client';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

import { AddItemDialog } from './AddItem';

export const EndSlot = () => {
    const [open, setOpen] = useState<boolean>(false);
    const toggleAddItem = () => setOpen(!open);
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 1,
            }}
        >
            <Button
                variant='contained'
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                    backgroundColor: '#C255D9',
                    color: '#fff',
                    textTransform: 'none',
                    borderRadius: '8px',
                }}
                onClick={toggleAddItem}
            >
                Add Item
            </Button>
            {/* <ItemActions /> */}
            <Button
                variant='outlined'
                sx={{
                    border: '1px solid #D0D5DD',
                    padding: '6px',
                }}
            >
                <ViewWeekOutlinedIcon
                    sx={{
                        color: '#344054',
                    }}
                />
            </Button>
            <AddItemDialog open={open} handleClose={toggleAddItem} />
        </Box>
    );
};
