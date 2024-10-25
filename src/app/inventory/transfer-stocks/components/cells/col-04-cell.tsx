import { useDebounce } from '@/hooks/useDebounce';
import { FormControl } from '@mui/material';
import { type CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import AutocompleteSelectAndSearchOption from '@/components/AutocompleteSelectAndSearchOption';
import { type AutocompleteOptionType } from '@/components/AutocompleteSelectAndSearchOption/types';

import {
    type SubLocationType,
    type TransferStocksTableData,
} from '../table/types';

export interface Col04CellProps {
    info: CellContext<TransferStocksTableData, SubLocationType[]>;
}
export function Col04Cell(props: Readonly<Col04CellProps>) {
    const { row, getValue, table } = props.info;
    const update = table.options.meta?.adjustmentTable?.updateData;
    const [subLocationValue, setSubLocationValue] =
        useState<AutocompleteOptionType>({
            label: '',
            value: '',
        });
    const [value] = useState(getValue());

    // useDebounce to limit the number of updates
    const [debouncedValue] = useDebounce(value, 500);
    const [sublocationSearchQuery, setSubLocationSearchQuery] =
        useState<string>('');
    // effect to handle updates based on the debounced value

    useEffect(() => {
        if (subLocationValue?.value) {
            console.log(`subLocationValue: ${subLocationValue.value}`);
            return update?.(
                row.index,
                // column.id as keyof T,
                'xyz' as keyof TransferStocksTableData,
                subLocationValue.value,
            );
        }
    }, [subLocationValue]);

    useEffect(() => {
        if (debouncedValue === getValue()) return;
        update?.(
            row.index,
            'xyz' as keyof TransferStocksTableData,
            debouncedValue,
        );
    }, [debouncedValue]);

    console.log('subLocationValue', subLocationValue);

    return (
        <FormControl sx={{ minWidth: 200 }} size='small'>
            <AutocompleteSelectAndSearchOption
                placeholder='Select Sub Location'
                shouldRenderAddNewOption={false}
                autoCompleteOptions={(Array.isArray(
                    (row.original as any).projectLocation,
                )
                    ? (row.original as any).projectLocation
                    : []
                ).map((option: any) => ({
                    label: option?.label,
                    value: option?.value,
                }))}
                setSearchQuery={setSubLocationSearchQuery}
                setFieldValue={setSubLocationValue}
                fieldValue={subLocationValue}
            />
        </FormControl>
    );
}
