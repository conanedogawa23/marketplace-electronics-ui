import {
    Box,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import GroupRoundIcon from '../../../../../../public/assets/group-round-icon.png';
import { StyledStraightLineBox, StyledTypography } from '../styles';

interface LocationOption {
    label: string;
    value: string;
}
interface LocationSectionProps {
    initialLocation: LocationOption;
    finalLocation: LocationOption;
    handleInitialLocationChange: (event: SelectChangeEvent<string>) => void;
    handleFinalLocationChange: (event: SelectChangeEvent<string>) => void;
    initialLocationOptions: LocationOption[];
    finalLocationOptions: LocationOption[];
}

const LocationSection = ({
    initialLocation,
    finalLocation,
    handleInitialLocationChange,
    handleFinalLocationChange,
    initialLocationOptions,
    finalLocationOptions,
}: LocationSectionProps) => {
    const [sameAsInitial, setSameAsInitial] = useState(false);

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const isChecked = event.target.checked;
        setSameAsInitial(isChecked);
        if (isChecked) {
            handleFinalLocationChange({
                target: { value: initialLocation.value },
            } as SelectChangeEvent<string>);
        } else {
            handleFinalLocationChange({
                target: { value: '' },
            } as SelectChangeEvent<string>);
        }
    };

    useEffect(() => {
        if (sameAsInitial) {
            handleFinalLocationChange({
                target: { value: initialLocation.value },
            } as SelectChangeEvent<string>);
        }
    }, [sameAsInitial, initialLocation.value]);
    return (
        <Box
            sx={{
                padding: '10px 30px',
                display: 'flex',
                gap: '20px',
                width: '100%',
                mt: 3,
            }}
        >
            <Box sx={{ width: '20%' }}>
                <StyledTypography variant='subtitle2'>
                    Initial Location
                </StyledTypography>
                <Select
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            padding: '8px 16px',
                            borderRadius: '8px',
                        },
                    }}
                    value={initialLocation.value}
                    onChange={handleInitialLocationChange}
                >
                    {initialLocationOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box
                sx={{
                    width: '25%',
                    display: 'flex',
                    alignItems: 'center',
                    paddingBottom: '16px',
                }}
            >
                <Image src={GroupRoundIcon} alt='group-round-icon' />
                <StyledStraightLineBox />
                <Image src={GroupRoundIcon} alt='group-round-icon' />
            </Box>
            <Box sx={{ width: '20%' }}>
                <StyledTypography variant='subtitle2'>
                    Final Location
                </StyledTypography>
                <Select
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            padding: '8px 16px',
                            borderRadius: '8px',
                        },
                    }}
                    value={finalLocation.value}
                    onChange={handleFinalLocationChange}
                    disabled={sameAsInitial}
                >
                    {finalLocationOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            disabled={option.value === initialLocation.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                <FormControlLabel
                    control={
                        <Checkbox
                            size='small'
                            color='secondary'
                            checked={sameAsInitial}
                            onChange={handleCheckboxChange}
                        />
                    }
                    label='Same as initial location'
                    componentsProps={{
                        typography: {
                            sx: { fontSize: '14px', fontWeight: 600 },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default LocationSection;
