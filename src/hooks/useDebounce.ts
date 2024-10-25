import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): [T, boolean] {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const [isPending, setIsPending] = useState(false);

    useEffect(
        () => {
            // If value is falsy, update debounced value immediately and skip timer
            if (!value) {
                setDebouncedValue(value);
                return;
            }

            setIsPending(true);

            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
                setIsPending(false);
            }, delay);

            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay], // Only re-call effect if value or delay changes
    );
    return [debouncedValue, isPending];
}
