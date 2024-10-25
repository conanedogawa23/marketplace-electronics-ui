import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Autocomplete from '@/components/Autocomplete';

import { useGetReceiveSearchItemsQuery } from '@/lib/redux/receive-item';
import { type ReceiveItemSearch } from '@/lib/redux/receive-item/type';

interface SearchBarProps {
    setPurchaseOrderId: React.Dispatch<React.SetStateAction<string | null>>;
}

const SearchBar = ({ setPurchaseOrderId }: SearchBarProps) => {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const { data = [] } = useGetReceiveSearchItemsQuery({ query });

    const navigateToProduct = (item: ReceiveItemSearch) => {
        if (item.purchaseOrder) {
            setPurchaseOrderId(item.uuid);
        }

        if (item.product) {
            router.push(
                `/inventory/receive-items/add/product?productIds=${item.uuid}`,
            );
        }
    };
    return (
        <Stack mt={16}>
            <Autocomplete
                placeholder='Search for PO or Product Name'
                options={data}
                getOptionLabel={(product) => product.name}
                onInputChange={(_event, newInputValue) => {
                    setQuery(newInputValue);
                }}
                isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                }
                onChange={(_event, newValue) => {
                    newValue && navigateToProduct(newValue);
                }}
            />
        </Stack>
    );
};

export default SearchBar;
