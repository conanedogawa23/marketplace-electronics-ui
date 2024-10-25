import { useDebounce } from '@/hooks/useDebounce';
import { FormControl } from '@mui/material';
import { type CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { type AutocompleteOptionType } from '@/components/AutocompleteSelectAndSearchOption/types';

import { type Location } from '@/lib/redux/locations/types';
import { useLazyGetLocationProductListUpdatedQuery } from '@/lib/redux/products/updateProductSequence';

import AutocompleteSelectAndSearchOption from '../../AutocompleteSelectAndSearchOption';

export interface Col03CellProps<T> {
    info: CellContext<T, string>;
}
export function Col03Cell<T>(props: Readonly<Col03CellProps<T>>) {
    const { row, column, getValue, table } = props.info;
    const update = table.options.meta?.adjustmentTable?.updateData;
    const [subLocationValue, setSubLocationValue] =
        useState<AutocompleteOptionType>({
            label: '',
            value: '',
        });
    const [value, setValue] = useState(getValue());

    // useDebounce to limit the number of updates
    const [debouncedValue] = useDebounce(value, 500);
    const [sublocationSearchQuery, setSublocationSearchQuery] =
        useState<string>('');
    // effect to handle updates based on the debounced value
    const [getLocationProductList] =
        useLazyGetLocationProductListUpdatedQuery();

    useEffect(() => {
        if (subLocationValue?.value) {
            console.log(`subLocationValue: ${subLocationValue.value}`);
            getLocationProductList({
                filters: {
                    location: subLocationValue.value,
                    product: (row?.original as any)?.uuid,
                },
            });
            return update?.(
                row.index,
                column.id as keyof T,
                subLocationValue.value,
            );
        }
    }, [subLocationValue]);

    useEffect(() => {
        if (debouncedValue === getValue()) return;
        update?.(row.index, column.id as keyof T, debouncedValue);
    }, [debouncedValue]);

    return (
        <FormControl sx={{ minWidth: 120 }} size='small'>
            <AutocompleteSelectAndSearchOption
                placeholder='Select Sub Location'
                shouldRenderAddNewOption={false}
                autoCompleteOptions={(
                    (row?.original as any)?.locations || []
                ).map((option: Location) => ({
                    label: option?.name,
                    value: option?.uuid,
                }))}
                setSearchQuery={setSublocationSearchQuery}
                setFieldValue={setSubLocationValue}
                fieldValue={subLocationValue}
            />
        </FormControl>
    );
}
