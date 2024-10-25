import { Cached } from '@mui/icons-material';
import { Box, Button, Input, Stack, styled, Typography } from '@mui/material';
import { type Row, type Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import classes from '../styles.module.css';

const CustomInput = styled(Input)(({ theme, error }) => ({
    border: `1px solid ${
        error ? 'red' : theme.customColors?.border.secondary.light ?? ''
    }`,
    borderRadius: 3,
    height: '40px',
    paddingInline: '12px',
    input: {
        padding: 0,
    },
}));

export type ExpandableView1Props<T> = {
    row: Row<T>;
    table: Table<T>;
    serialsToAddArrayAccessor: keyof T;
};
export function ExpandableView1<T>({
    row,
    table,
    serialsToAddArrayAccessor,
}: Readonly<ExpandableView1Props<T>>) {
    const initialValues = row.original[serialsToAddArrayAccessor] as string[];

    const [values, setValues] = useState<string[]>(initialValues);
    const [errors, setErrors] = useState<Record<string, string | undefined>>(
        {},
    );
    const [prefix, setPrefix] = useState('');
    const [initialCounter, setInitialCounter] = useState<number | string>('');

    const update = table.options.meta?.adjustmentTable?.updateData;

    // Effect to sync initial values with the state
    useEffect(() => {
        setValues([...initialValues]);
    }, [initialValues, setValues]);

    // Function to generate serial numbers
    const generateSerials = () => {
        const data = values.map((_, index) => {
            const startCount =
                initialCounter === '' ? 0 : parseInt(initialCounter as string);
            return `${prefix}-${(startCount + index).toString()}`;
        });
        setValues(data);
        update?.(row.index, serialsToAddArrayAccessor, data);
        setErrors({});
    };

    // Handle form submission
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Array.from(formData.entries()).filter((v) =>
            v[0].includes('unit'),
        );

        let valid = true;
        const newErrors: Record<string, string> = {};

        data.forEach(([name, value]) => {
            if (value === '') {
                newErrors[name] = 'This field is required';
                valid = false;
            }
        });

        if (valid) {
            const values = data
                .map(([_name, value]) => value)
                .filter((v) => v !== '');
            update?.(row.index, serialsToAddArrayAccessor, values);
            setErrors({});
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <Stack>
            <form onSubmit={onSubmit}>
                <Stack
                    height={'40px'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    direction={'row'}
                >
                    <Box>
                        <Typography variant='subtitle2'>
                            Serial Numbers
                        </Typography>
                    </Box>
                    <Stack direction={'row'} gap={5}>
                        <CustomInput
                            placeholder='Prefix'
                            sx={{ height: '28px', width: '104px' }}
                            disableUnderline
                            color='secondary'
                            onChange={(e) => {
                                setPrefix(e.target.value);
                            }}
                            value={prefix}
                        />
                        <CustomInput
                            placeholder='1234'
                            sx={{ height: '28px', width: '104px' }}
                            disableUnderline
                            color='secondary'
                            onChange={(e) => {
                                const value = e.target.value;

                                // Check if the value is a number
                                if (!isNaN(value as any)) {
                                    setInitialCounter(value);
                                    setErrors((prev) => ({
                                        ...prev,
                                        initialCounter: undefined,
                                    }));
                                } else {
                                    setErrors((prev) => ({
                                        ...prev,
                                        initialCounter:
                                            'Only numbers are allowed',
                                    }));
                                }
                            }}
                            value={initialCounter}
                            error={!!errors['initialCounter']}
                        />
                        <Button
                            variant='outlined'
                            size='small'
                            color='secondary'
                            sx={{ height: '28px' }}
                            startIcon={<Cached />}
                            onClick={generateSerials}
                            disabled={prefix === ''}
                        >
                            Generate & Save
                        </Button>
                        <Button
                            variant='contained'
                            size='small'
                            color='secondary'
                            sx={{ height: '28px' }}
                            type='submit'
                        >
                            Save
                        </Button>
                    </Stack>
                </Stack>
                {values.length > 0 ? (
                    <Box
                        sx={{
                            flexGrow: 1,
                            paddingBottom: 7,
                            mt: 7,
                        }}
                        className={classes.cards}
                    >
                        {values.map((value, index) => {
                            const id = `unit_${(index + 1).toString()}`;
                            return (
                                <Stack key={id}>
                                    <Typography variant='subtitle2'>
                                        Unit {index + 1}
                                    </Typography>
                                    <CustomInput
                                        fullWidth
                                        disableUnderline
                                        name={id}
                                        value={value}
                                        onChange={(e) => {
                                            const newValues = [...values];
                                            newValues[index] = e.target.value;
                                            setValues(newValues);
                                        }}
                                        placeholder='Enter Serial No'
                                        error={!!errors[id]}
                                    />
                                    {errors[id] && (
                                        <Typography variant='body2' color='red'>
                                            {errors[id]}
                                        </Typography>
                                    )}
                                </Stack>
                            );
                        })}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            height: '48px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        No changes
                    </Box>
                )}
            </form>
        </Stack>
    );
}

export default ExpandableView1;
