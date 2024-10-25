import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type React from 'react';
import { useRef, useState } from 'react';

const StyledWhiteButton = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
}));

import { type FilterProps } from '../Filter/model';
import Filter from '../Filter/Filter';

// Ensure you have this component

const StocksFilter: React.FC<FilterProps> = ({ 
    filterGroups,
    isGlobalSearchEnabled,
    isExpandable,
    handleSelectedFilter
}) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [openOfficeDropdown, setOpenOfficeDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const options = [
        'All Locations',
        'ui_marketplaceminated Integration',
        'ii_Cameron St. Warehouse',
        'ui_marketplaceminated Integration - Pittsburgh, PA',
    ];

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpenOfficeDropdown(false);
    };

    const handleOfficeDropdown = () => {
        setOpenOfficeDropdown((prevOpen) => !prevOpen);
    };

    const handleCloseOfficeDropdown = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpenOfficeDropdown(false);
    };

    return (
        <div>
            <ButtonGroup
                ref={anchorRef}
                aria-label='Button group with a nested menu'
            >
                <StyledWhiteButton
                    variant='outlined'
                    size='medium'
                    aria-controls={
                        openOfficeDropdown ? 'split-button-menu' : undefined
                    }
                    aria-expanded={openOfficeDropdown ? 'true' : undefined}
                    aria-label='select merge strategy'
                    aria-haspopup='menu'
                    onClick={handleOfficeDropdown}
                >
                    Filter
                    <ArrowDropDownIcon />
                </StyledWhiteButton>
            </ButtonGroup>
            <Popper
                sx={{ zIndex: 3 }}
                open={openOfficeDropdown}
                anchorEl={anchorRef.current}
                transition
                disablePortal
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
                        <Paper>
                            <ClickAwayListener
                                onClickAway={handleCloseOfficeDropdown}
                            >
                                {/* <MenuList id='split-button-menu' autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) =>
                                                handleMenuItemClick(
                                                    event,
                                                    index,
                                                )
                                            }
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList> */}
                                <Filter
                                    filterGroups={filterGroups}
                                    isGlobalSearchEnabled={isGlobalSearchEnabled}
                                    isExpandable={isExpandable}
                                    handleSelectedFilter={handleSelectedFilter}
                                />
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default StocksFilter;
