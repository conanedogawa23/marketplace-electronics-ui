import { useDebounce } from '@/hooks/useDebounce';
import { FormControl, MenuItem, Select } from '@mui/material';
import { type CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { type AllocationAdjustmentTableData } from '../../../../types';
import { type ConvertedLocationArray } from '../page';

export const Col03Cell = (props: {
    info: CellContext<AllocationAdjustmentTableData, string>;
}) => {
    const { row, column, getValue, table } = props.info;
    const update = table.options.meta?.adjustmentTable?.updateData;

    const [value, setValue] = useState<ConvertedLocationArray | null>(() => {
        const initialValue = getValue();
        const initialOption = row.original.subLocationList.find(
            (option: any) => option.convertedArray.subLocation === initialValue
        );
        return initialOption || null;
    });
    // useDebounce to limit the number of updates
    const [debouncedValue] = useDebounce(value, 500);

    // effect to handle updates based on the debounced value
    useEffect(() => {
        if (debouncedValue?.convertedArray.subLocation === getValue()) return;
        update?.(
            row.index,
            column.id as keyof AllocationAdjustmentTableData,
            debouncedValue?.convertedArray.subLocation,
        );
    }, [column.id, debouncedValue, getValue, props, row.index, update]);

    return (
        <FormControl sx={{ minWidth: 120 }} size='small'>
            <Select
                inputProps={{ 'aria-label': 'Without label' }}
                value={value?.convertedArray.subLocation || ''}
                onChange={(e) => {
                    // [
                    //     {
                    //         "convertedArray": {
                    //             "uuid": "01J2TDPWGKXTAK5BPGH6CNR81P",
                    //             "subLocation": "Amazon 4 Area 40 Rack 40 Shelf 40 fghdj"
                    //         },
                    //         "quantity": 10,
                    //         "onUsed": 3
                    //     },
                    //     {
                    //         "convertedArray": {
                    //             "uuid": "01J2ZMXE43NDK7KN4MRENNHY9H",
                    //             "subLocation": "Amazon 4 Area 40 Rack 40 Shelf 40 rth"
                    //         },
                    //         "quantity": 5,
                    //         "onUsed": 4
                    //     }
                    // ]
                    // const selectedOption = row.original.subLocationList.find(
                    //     (option: any) => option.subLocation === e.target.value
                    // );

                    const selectedOption = row.original.subLocationList.find(
                        (option: any) => option.convertedArray.subLocation === e.target.value
                    );
                    setValue(selectedOption || null);
                }}
            >
                <MenuItem value=''>
                    <em>None</em>
                </MenuItem>
                {row.original.subLocationList.map((option: any) => (
                    <MenuItem key={option.convertedArray.uuid} value={option.convertedArray.subLocation}>
                        {option.convertedArray.subLocation}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
