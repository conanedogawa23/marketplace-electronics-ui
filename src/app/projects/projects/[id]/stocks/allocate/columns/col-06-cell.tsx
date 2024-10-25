import { useDebounce } from '@/hooks/useDebounce';
import { type CellContext } from '@tanstack/react-table';
import { useCallback, useEffect, useRef, useState } from 'react';

import NumberInput from '@/components/adjustment-table/number-input';

import { type AllocationAdjustmentTableData } from '../../../../types';

// NumberInput component definition
export const Coll06Cell: React.FC<{
    info: CellContext<AllocationAdjustmentTableData, number>;
}> = ({ info }) => {
    const {
        getValue,
        row: { index, original },
        column: { id },
        table,
    } = info;

    const initialValue = getValue();
    const updateData = table.options.meta?.adjustmentTable?.updateData;

    const valueRef = useRef<number>(initialValue);

    // State to manage the current value of the input
    const [value, setValue] = useState<number>(initialValue);
    // Debounced value to limit the number of updates
    const [debouncedValue] = useDebounce(value, 500);

    // Function to handle updating the serial number array and table data
    const updateSerialNo = useCallback(
        (newValue: number, prevValue: number) => {
            const addSerialNo = [...original.addSerialNo];

            if (original.product.serialized) {
                if (newValue > prevValue) {
                    addSerialNo.push(
                        ...Array<string>(newValue - prevValue).fill(''),
                    );
                } else {
                    addSerialNo.length = Math.max(newValue, 0);
                }
            }
            // Increment or decrement the addSerialNo array based on the new value

            // Update the addSerialNo and value in the table data
            updateData?.(index, 'addSerialNo', addSerialNo);
            updateData?.(
                index,
                id as keyof AllocationAdjustmentTableData,
                newValue,
            );
            // updateData?.(
            //     index,
            //     'finalQuantity',
            //     original.product.quantity + newValue,
            // );

            valueRef.current = newValue;
        },
        [
            original.addSerialNo,
            original.product.serialized,
            updateData,
            index,
            id,
        ],
    );

    // Effect to handle updates based on the debounced value
    useEffect(() => {
        if (valueRef.current === debouncedValue) return;

        updateSerialNo(debouncedValue, getValue());
    }, [debouncedValue, getValue, index, updateSerialNo]);

    console.log('original', original.maxChangedQuantity);

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
        if (value >= original.maxChangedQuantity) return;
        setValue((prev) => prev + 1);
    };

    // Handle decrement button click
    const handleDecrement = () => {
        if (value <= 0) return;
        setValue((prev) => prev - 1);
    };

    return (
        <NumberInput
            value={value}
            onChange={handleChange}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
        />
    );
};

export default Coll06Cell;
