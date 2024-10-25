import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { type Control, Controller } from 'react-hook-form';

import classes from '../styles.module.css';
import { type ExpandableViewFormState } from './types';

export type SerialNoListProps = {
    control: Control<ExpandableViewFormState>;
    filteredSerialNumbers: string[];
};

export const SerialNoList: React.FC<SerialNoListProps> = ({
    filteredSerialNumbers,
    control,
}) => {
    return (
        <Box className={classes.cards}>
            {filteredSerialNumbers.map((serialNumber, idx) => (
                <Stack key={serialNumber}>
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

                                const isSelected = value.includes(serialNumber);

                                const handleChange = (
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                    const isChecked = e.target.checked;
                                    onChange(
                                        isChecked
                                            ? [...value, serialNumber]
                                            : value.filter(
                                                  (v) => v !== serialNumber,
                                              ),
                                    );
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
                        <Typography variant='body2'>{serialNumber}</Typography>
                    </Box>
                </Stack>
            ))}
        </Box>
    );
};

export default SerialNoList;
