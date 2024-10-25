import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { type Control, Controller } from 'react-hook-form';

import { type SerializedProduct } from '../../page';
import classes from '../styles.module.css';
import { type ExpandableViewFormState } from './types';
import { toast } from 'react-toastify';

export type SerialNoListProps = {
    control: Control<ExpandableViewFormState>;
    filteredSerialNumbers: SerializedProduct[];
    maxSelections: number
};

export const SerialNoList: React.FC<SerialNoListProps> = ({
    filteredSerialNumbers,
    control,
    maxSelections
}) => {
    return (
        <Box className={classes.cards}>
            {filteredSerialNumbers?.map((serialNumber, idx) => (
                <Stack key={serialNumber.uuid}>
                    <Typography>Unit {idx + 1}</Typography>
                    <Box
                        component='label'
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            height: 40,
                            border: `1px solid ${theme.customColors?.border.primary.light}`,
                            borderRadius: theme.customSizes?.radius.sm,
                        })}
                    >
                        <Controller
                            name='serials'
                            control={control}
                            render={({ field }) => {
                                const { value, onChange } = field;

                                // const isSelected = Array.isArray(value) ? value?.includes(serialNumber) : false;

                                // check if serial number is in the selected serials array
                                const isSelected = Array.isArray(value)
                                    ? value?.some(
                                          (v) => v.uuid === serialNumber.uuid,
                                      )
                                    : false;

                                const handleChange = (
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                        // Allow selection only if the number of selected checkboxes is less than maxSelections
                                        if (Array.isArray(value) && value.length < maxSelections) {
                                            onChange([...value, serialNumber]);
                                        } else if (!Array.isArray(value)) {
                                            onChange([serialNumber]);
                                        } else {
                                            toast.error(`You can only select up to ${maxSelections} items.`);
                                        }
                                    } else {
                                        onChange(
                                            Array.isArray(value)
                                                ? value.filter((v) => v.uuid !== serialNumber.uuid)
                                                : []
                                        );
                                    }
                                };

                                return (
                                    <Checkbox
                                        size='small'
                                        color='secondary'
                                        onChange={handleChange}
                                        checked={isSelected}
                                        value={serialNumber}
                                    />
                                );
                            }}
                        />
                        <Typography variant='body2'>
                            {serialNumber.number}
                        </Typography>
                    </Box>
                </Stack>
            ))}
        </Box>
    );
};

export default SerialNoList;
