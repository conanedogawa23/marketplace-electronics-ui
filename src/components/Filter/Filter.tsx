import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { type FilterProps } from './model';

const Filter: React.FC<FilterProps> = ({ 
    filterGroups,
    isGlobalSearchEnabled,
    isExpandable,
    handleSelectedFilter
}) => {
    const [selectAllStates, setSelectAllStates] = useState<boolean[]>([]);
    const [searchTerms, setSearchTerms] = useState<string[]>(
        new Array(filterGroups.length).fill(''),
    );
    const [globalSearch, setGlobalSearch] = useState('');

    useEffect(() => {
        const initialSelectAllStates = filterGroups.map((group) =>
            group.options.every((option) => option.checked),
        );
        setSelectAllStates(initialSelectAllStates);
    }, [filterGroups]);

    const handleSelectAllChange = (groupIndex: number, checked: boolean) => {
        const newSelectAllStates = [...selectAllStates];
        newSelectAllStates[groupIndex] = checked;
        setSelectAllStates(newSelectAllStates);
        if (checked) {
            handleSelectedFilter?.(filterGroups[groupIndex].groupValue);
        } else {
            handleSelectedFilter?.('activityId');
        }

        filterGroups[groupIndex].options.forEach((option) => {
            option.onChange({
                target: { checked },
            } as unknown as React.ChangeEvent<HTMLInputElement>);
        });
    };

    const handleSearchChange = (
        groupIndex: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const newSearchTerms = [...searchTerms];
        newSearchTerms[groupIndex] = (event.target as HTMLInputElement).value;
        setSearchTerms(newSearchTerms);
    };

    const handleGlobalSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setGlobalSearch(event.target.value);
    };

    const filteredGroups = globalSearch
        ? filterGroups.filter((group) =>
              group.groupName
                  .toLowerCase()
                  .includes(globalSearch.toLowerCase()),
          )
        : filterGroups;

    return (
        <>
        
            {isGlobalSearchEnabled && (
                <Box sx={{ padding: 0.5, outline: 'none' }}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        size='small'
                        placeholder='Search Groups...'
                        value={globalSearch}
                        onChange={handleGlobalSearchChange}
                        sx={{ borderRadius: '50px' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            )}
            {filteredGroups.map((group, index) => (
                <Accordion
                    elevation={0}
                    sx={{
                        '&:before': { display: 'none' },
                        boxShadow: 'none',
                        margin: 0,
                        '&:not(:last-child)': { borderBottom: 0, margin: 0 },
                    }}
                    key={group.groupName}
                >
                    <AccordionSummary
                        sx={{
                            borderBottom: 'none',
                            margin: 0, // remove margin
                            '&:hover': { borderBottom: 'none' },
                            '&.Mui-expanded': { minHeight: 28 },
                            '& > .MuiAccordionSummary-content.Mui-expanded': {
                                margin: '0px',
                            },
                            '& > .MuiAccordionSummary-content': {
                                marginBottom: '0px',
                            },
                        }}
                        expandIcon={isExpandable ? <ExpandMoreIcon /> : null}
                        id={`panel${index}d-header`}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Checkbox
                                checked={selectAllStates[index]}
                                onChange={(e) =>
                                    handleSelectAllChange(
                                        index,
                                        e.target.checked,
                                    )
                                }
                                sx={{ marginRight: 1 }}
                            />
                            <Typography>
                                {group.groupName}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    {/* Search Bar */}
                    {isExpandable && (
                        <Box sx={{ paddingX: 2, paddingY: 0.5 }}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                placeholder='Search...'
                                value={searchTerms[index]}
                                onChange={(e) => handleSearchChange(index, e)}
                                sx={{
                                    marginBottom: 2,
                                    borderRadius: '20px',
                                    marginY: '0px',
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    )}
                    {isExpandable && (
                        <AccordionDetails
                            sx={{
                                paddingTop: 0,
                                paddingLeft: 6,
                                borderTop: 'none',

                                '&:not(:last-child)': {
                                    paddingBottom: 0,
                                    borderBottom: 'none',
                                },
                            }}
                        >
                            <FormControl component='fieldset' variant='standard'>
                                <FormGroup>
                                    {group.options
                                        .filter((option) =>
                                            option.label
                                                ?.toLowerCase()
                                                .includes(
                                                    searchTerms[
                                                        index
                                                    ].toLowerCase(),
                                                ),
                                        )
                                        .map((option) => (
                                            <FormControlLabel
                                                key={`${group.groupName}-${option.label}`}
                                                control={
                                                    <Checkbox
                                                        checked={option.checked}
                                                        onChange={option.onChange}
                                                        name={option.label}
                                                        style={{
                                                            color: option.checkboxColor,
                                                        }}
                                                    />
                                                }
                                                label={option.label}
                                            />
                                        ))}
                                </FormGroup>
                            </FormControl>
                            {group.showClearButton !== false && (
                                <Box
                                    component='div'
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%',
                                        border: '1px solid rgba(0,0,0, 0.3)',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <Button
                                        startIcon={<ClearIcon />}
                                        sx={{ width: '100%' }}
                                        color='primary'
                                        onClick={group.onClear}
                                    >
                                        Clear
                                    </Button>
                                </Box>
                            )}
                        </AccordionDetails>
                    )}
                </Accordion>
            ))}
        </>
    );
};

export default Filter;
