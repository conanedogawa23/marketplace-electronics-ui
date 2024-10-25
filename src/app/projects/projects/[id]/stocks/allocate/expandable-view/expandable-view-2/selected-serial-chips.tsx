import { Chip, Stack } from '@mui/material';
import { type Control, Controller } from 'react-hook-form';

import { type SerializedProduct } from '../../page';
import { type ExpandableViewFormState } from './types';

export type SelectedSerialChipsProps = {
    selectedSerials: SerializedProduct[];
    control: Control<ExpandableViewFormState>;
};

export const SelectedSerialChips: React.FC<SelectedSerialChipsProps> = ({
    control,
    selectedSerials,
}) => {
    return (
        <Stack direction='row' gap={2} flexWrap='wrap'>
            {selectedSerials?.map((serial) => (
                <Controller
                    name='serials'
                    control={control}
                    key={serial.uuid}
                    render={({ field }) => (
                        console.log('field 1: ', field),
                        (
                            <Chip
                                size='small'
                                variant='outlined'
                                color='secondary'
                                label={serial.number}
                                onDelete={() => {
                                    const newSerials = field.value.filter(
                                        (s) => s !== serial,
                                    );
                                    field.onChange(newSerials);
                                }}
                            />
                        )
                    )}
                />
            ))}
        </Stack>
    );
};

export default SelectedSerialChips;
