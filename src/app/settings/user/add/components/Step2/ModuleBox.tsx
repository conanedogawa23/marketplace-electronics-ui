import {
    Box,
    Checkbox,
    FormControl,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { Controller, type UseFormReturn } from 'react-hook-form';

import { CustomBox } from '@/app/settings/user/add/components/Step2/CustomBox';

import { AccessLevel } from '@/lib/redux/types';

import { type UserForm } from '../../utils';

const label = { inputProps: { 'aria-label': 'Module checkbox' } };
export type ModuleBoxProps = {
    module: string;
    form: UseFormReturn<UserForm>;
    index: number;
};
export const ModuleBox: React.FC<ModuleBoxProps> = ({
    module,
    form,
    index,
}) => {
    const {
        watch,
        control,
        formState: { errors },
    } = form;

    const isSelected = watch(`modules.${index}.name`);

    return (
        <CustomBox>
            <Box
                component={'label'}
                flex={1}
                display={'flex'}
                alignItems={'center'}
                sx={{
                    cursor: 'pointer',
                }}
            >
                <Controller
                    name={`modules.${index}.name`}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => {
                        return (
                            <Checkbox
                                {...label}
                                color='secondary'
                                {...field}
                                value={module}
                                onChange={(e, checked) => {
                                    field.onChange(checked && e.target.value);
                                }}
                                checked={!!field.value}
                            />
                        );
                    }}
                />
                <Typography variant='subtitle2'>{module}</Typography>
            </Box>
            <FormControl sx={{ minWidth: 120 }}>
                <Controller
                    name={`modules.${index}.accessLevel`}
                    control={control}
                    defaultValue={AccessLevel.Read}
                    render={({ field }) => (
                        <Select
                            id='accessLevel'
                            aria-invalid={
                                errors?.modules?.[index]?.accessLevel
                                    ? 'true'
                                    : 'false'
                            }
                            aria-label='Access Level'
                            aria-describedby='access-leve-text'
                            hiddenLabel
                            disabled={!isSelected}
                            labelId={`${module}-access-level`}
                            color='secondary'
                            sx={(theme) => ({
                                height: '30px',
                                border: `1px solid ${theme.customColors?.border.secondary.light}`,
                                '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input':
                                    {
                                        padding: '0 8px',
                                    },
                            })}
                            error={!!errors?.modules?.[index]?.accessLevel}
                            {...field}
                        >
                            <MenuItem value={AccessLevel.Read}>
                                View Only
                            </MenuItem>
                            <MenuItem value={AccessLevel.Write}>Edit</MenuItem>
                            <MenuItem value={AccessLevel.Admin}>Admin</MenuItem>
                        </Select>
                    )}
                />
            </FormControl>
        </CustomBox>
    );
};

export default ModuleBox;
