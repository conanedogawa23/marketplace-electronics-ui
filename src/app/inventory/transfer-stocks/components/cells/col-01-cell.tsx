import { useDebounce } from '@/hooks/useDebounce';
import { type CellContext } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';

import { AntSwitch } from '../switch';

export interface Col01CellProps<T> {
    info: CellContext<T, boolean | null>;
    serialsToAddArrayAccessor: keyof T;
    serialsToRemoveArrayAccessor: keyof T;
    changeQuantityAccessor: keyof T;
    disabled?: boolean;
    adjusted?: boolean;
    serialized?: boolean;
}

export function Col01Cell<T>(props: Col01CellProps<T>) {
    const {
        changeQuantityAccessor,
        disabled,
        info,
        serialsToAddArrayAccessor,
        serialsToRemoveArrayAccessor,
        adjusted,
        serialized,
    } = props;

    const { table, row, getValue, column } = info;

    const { index, getToggleExpandedHandler, original, getIsExpanded } = row;

    const newProductSerialArray = row.original[
        serialsToAddArrayAccessor
    ] as string[];

    const changedQuantity = row.original[changeQuantityAccessor] as number;

    const initialValue = getValue();
    const valueRef = useRef(initialValue);

    // TODO: refactor to use setStatus and onChange on AntSwitch when we check if product is already adjusted or now
    const [status, setStatus] = useState(serialized);
    const update = table.options.meta?.adjustmentTable?.updateData;

    // debounced value to limit the number of updates
    const [debouncedValue] = useDebounce(status, 500);

    // effect to handle updates based on the debounced value
    useEffect(() => {
        // remove empty serial numbers from addSerialNo array when track is disabled
        if (debouncedValue === valueRef.current) return;

        if (!debouncedValue) {
            update?.(index, serialsToAddArrayAccessor, []);
            update?.(index, serialsToRemoveArrayAccessor, []);

            // close the row when track is disabled
            getIsExpanded() && getToggleExpandedHandler()();
        }

        // add serial numbers back when track is enabled
        if (debouncedValue) {
            const count = newProductSerialArray.length;

            if (count < changedQuantity) {
                const diff = changedQuantity - count;
                const newSerials = Array<string>(diff).fill('');
                update?.(index, serialsToAddArrayAccessor, newSerials);
            }
        }

        update?.(index, column.id as keyof T, debouncedValue);
        valueRef.current = debouncedValue as boolean;
    }, [
        changedQuantity,
        column.id,
        debouncedValue,
        getIsExpanded,
        getToggleExpandedHandler,
        index,
        initialValue,
        newProductSerialArray.length,
        serialsToAddArrayAccessor,
        original,
        serialsToRemoveArrayAccessor,
        update,
    ]);

    return (
        <AntSwitch
            disabled={disabled}
            checked={status}
            onChange={(e) => {
                if (!adjusted) setStatus(e.target.checked);
            }}
            onToggle={() => {
                setStatus((prev) => !prev);
            }}
            color='secondary'
        />
    );
}
