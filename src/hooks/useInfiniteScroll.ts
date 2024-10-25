import { useCallback, useEffect, useState } from 'react';

const useInfiniteScroll = (
    handleFetchData: (page: number) => Promise<void>,
    tableScrollDivRef: React.RefObject<HTMLDivElement>,
) => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleInfiniteScroll = useCallback(() => {
        if (loading) return;

        if (tableScrollDivRef.current) {
            const tableHeight =
                tableScrollDivRef.current.getBoundingClientRect().height;
            const tableScrollTop = tableScrollDivRef.current.scrollTop;
            const tableScrollHeight = tableScrollDivRef.current.scrollHeight;

            if (tableHeight + tableScrollTop >= tableScrollHeight - 5) {
                setPage((prev) => prev + 1);
            }
        }
    }, [loading]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await handleFetchData(page);
            setLoading(false);
        };

        fetchData();
    }, [page, handleFetchData]);

    useEffect(() => {
        const current = tableScrollDivRef?.current;

        if (current) {
            let debounceTimer: NodeJS.Timeout;

            const handleScroll = () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(handleInfiniteScroll, 200);
            };

            current.addEventListener('scroll', handleScroll);
            return () => {
                clearTimeout(debounceTimer);
                current.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleInfiniteScroll]);

    return { page, loading };
};

export default useInfiniteScroll;
