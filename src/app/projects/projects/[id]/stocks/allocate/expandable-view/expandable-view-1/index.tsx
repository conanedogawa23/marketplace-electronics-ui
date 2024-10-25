import { Cached } from '@mui/icons-material';
import { Box, Button, Input, Stack, styled, Typography } from '@mui/material';
import { type Row, type Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { type AllocationAdjustmentTableData } from '../../../../../types';
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

export const ExpandableView1: React.FC<{
    row: Row<AllocationAdjustmentTableData>;
    table: Table<AllocationAdjustmentTableData>;
}> = ({ row, table }) => {
    const initialValues = row.original.addSerialNo;

    const [values, setValues] = useState<string[]>(initialValues);
    const [errors, setErrors] = useState<Record<string, string | undefined>>(
        {},
    );
    const [prefix, setPrefix] = useState('');
    const [initialCounter, setInitialCounter] = useState<number | string>('');

    const update = table.options.meta?.adjustmentTable?.updateData;

    // Effect to sync initial values with the state
    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    // Function to generate serial numbers
    const generateSerials = () => {
        const data = values.map((_, index) => {
            const startCount =
                initialCounter === '' ? 0 : parseInt(initialCounter as string);
            return `${prefix}-${(startCount + index).toString()}`;
        });
        setValues(data);
        update?.(row.index, 'addSerialNo', data);
    };

    // const regex = /^[a-zA-Z0-9]+$/;

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

        if (!valid) {
            setErrors(newErrors);
            return;
        }
        const values = data
            .map(([_name, value]) => value)
            .filter((v) => v !== '');
        update?.(row.index, 'addSerialNo', values);
        setErrors({});
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
                            Track Serial
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
                                setInitialCounter(e.target.value);
                            }}
                            value={initialCounter}
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
};

export default ExpandableView1;
