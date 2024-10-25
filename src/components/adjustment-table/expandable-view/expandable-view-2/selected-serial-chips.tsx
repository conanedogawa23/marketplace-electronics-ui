import { Chip, Stack } from '@mui/material';
import { type Control, Controller } from 'react-hook-form';

import { type ExpandableViewFormState } from './types';

export type SelectedSerialChipsProps = {
    selectedSerials: string[];
    control: Control<ExpandableViewFormState>;
};

export const SelectedSerialChips: React.FC<SelectedSerialChipsProps> = ({
    control,
    selectedSerials,
}) => {
    return (
        <Stack direction='row' gap={2} flexWrap='wrap'>
            {selectedSerials.map((serial) => (
                <Controller
                    name='serials'
                    control={control}
                    key={serial}
                    render={({ field }) => (
                        <Chip
                            size='small'
                            variant='outlined'
                            color='secondary'
                            label={serial}
                            onDelete={() => {
                                const newSerials = field.value.filter(
                                    (s) => s !== serial,
                                );
                                field.onChange(newSerials);
                            }}
                        />
                    )}
                />
            ))}
        </Stack>
    );
};

export default SelectedSerialChips;
