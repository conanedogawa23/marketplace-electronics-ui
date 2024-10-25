import { useDebounce } from '@/hooks/useDebounce';
import { type CellContext } from '@tanstack/react-table';
import { useCallback, useEffect, useRef, useState } from 'react';

import NumberInput from '@/components/adjustment-table/number-input';

export interface Col06CellProps<T> {
    info: CellContext<T, number>;

    serialNumbersToAddArrayAccessor: keyof T;
    finalQuantityAccessor?: keyof T;

    isEnabled: boolean;
    currentQuantity: number;
}

// NumberInput component definition
export function Coll06Cell<T>(props: Col06CellProps<T>) {
    const {
        currentQuantity,
        finalQuantityAccessor,
        info,
        isEnabled,
        serialNumbersToAddArrayAccessor,
    } = props;
    const {
        getValue,
        row: { index, original },
        column: { id },
        table,
    } = info;

    const initialValue = getValue();
    const updateData = table.options.meta?.adjustmentTable?.updateData;

    const productId = (original as any)?.uuid as string;

    const errors =
        table.options.meta?.adjustmentTable?.errors?.[productId] ?? null;

    const valueRef = useRef<number>(initialValue);

    // State to manage the current value of the input
    const [value, setValue] = useState<number>(initialValue);
    // Debounced value to limit the number of updates
    const [debouncedValue] = useDebounce(value, 500);

    // Function to handle updating the serial number array and table data
    const updateSerialNo = useCallback(
        (newValue: number, prevValue: number) => {
            const serialNumbersToAdd = [
                ...(original[serialNumbersToAddArrayAccessor] as string[]),
            ];
            // const addSerialNo = [...original.addSerialNo];

            if (isEnabled) {
                if (newValue > prevValue) {
                    serialNumbersToAdd.push(
                        ...Array<string>(newValue - prevValue).fill(''),
                    );
                } else {
                    serialNumbersToAdd.length = Math.max(newValue, 0);
                }
            }
            // Increment or decrement the addSerialNo array based on the new value

            updateData?.(
                index,
                serialNumbersToAddArrayAccessor,
                serialNumbersToAdd,
            );
            updateData?.(index, id as keyof T, newValue);
            finalQuantityAccessor &&
                updateData?.(
                    index,
                    finalQuantityAccessor,
                    currentQuantity + newValue,
                );

            valueRef.current = newValue;
        },
        [
            currentQuantity,
            finalQuantityAccessor,
            id,
            index,
            isEnabled,
            serialNumbersToAddArrayAccessor,
            original,
            updateData,
        ],
    );

    // Effect to handle updates based on the debounced value
    useEffect(() => {
        if (valueRef.current === debouncedValue) return;

        updateSerialNo(debouncedValue, getValue());
    }, [debouncedValue, getValue, index, updateSerialNo]);

    // Effect to sync initial value with the state
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    // Handle change event to update the input value
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    };

    // Handle increment button click
    const handleIncrement = () => {
        setValue((prev) => prev + 1);
    };

    // Handle decrement button click
    const handleDecrement = () => {
        setValue((prev) => prev - 1);
    };

    return (
        <NumberInput
            error={!!errors?.[id as keyof T]}
            value={value}
            onChange={handleChange}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            disableDecrement={value <= 0}
        />
    );
}

export default Coll06Cell;
