import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const options = [
    { label: 'Create a merge commit', checked: false },
    { label: 'Squash and merge', checked: false },
    { label: 'Rebase and merge', checked: false },
];
const StyledCheckbox = styled(Checkbox)(() => ({
    color: '#D0D5DD',
    '&.Mui-checked': {
        color: '#C255D9',
    },
    '& .MuiSvgIcon-root': {
        fontSize: 26,
    },
}));
const StyledWhiteButton = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
    borderRadius: '8px',
    fontSize: '16px',
}));

export default function SplitButton() {
    const [open, setOpen] = React.useState(false);
    const [checkedOptions, setCheckedOptions] = React.useState(options);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };

    const handleCheckboxChange = (index: number) => {
        const newCheckedOptions = [...checkedOptions];
        newCheckedOptions[index].checked = !newCheckedOptions[index].checked;
        setCheckedOptions(newCheckedOptions);
    };

    return (
        <React.Fragment>
            <ButtonGroup
                ref={anchorRef}
                aria-label='Button group with a nested menu'
            >
                <StyledWhiteButton
                    variant='outlined'
                    size='medium'
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label='select merge strategy'
                    aria-haspopup='menu'
                    onClick={handleToggle}
                >
                    Filter
                    <ArrowDropDownIcon />
                </StyledWhiteButton>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 3,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                        }}
                    >
                        <Paper
                            sx={{
                                borderRadius: '8px',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id='split-button-menu'>
                                    {checkedOptions.map((option, index) => (
                                        <MenuItem key={option.label}>
                                            <StyledCheckbox
                                                checked={option.checked}
                                                onChange={() =>
                                                    handleCheckboxChange(index)
                                                }
                                            />
                                            <Typography>
                                                {option.label}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
