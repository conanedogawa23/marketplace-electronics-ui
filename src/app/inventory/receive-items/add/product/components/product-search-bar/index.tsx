import { Stack } from '@mui/material';
import { useState } from 'react';

import { type ReceiveItemTableDataType } from '@/app/inventory/receive-items/[id]/components/table/types';

import Autocomplete from '@/components/Autocomplete';

import { useGetProductListQuery } from '@/lib/redux/products/getProducts';

interface ProductSearchBarProps {
    setProductsToReceive: React.Dispatch<
        React.SetStateAction<ReceiveItemTableDataType[]>
    >;
}

const ProductSearchBar = ({ setProductsToReceive }: ProductSearchBarProps) => {
    const [query, setQuery] = useState('');
    const { data: products = [], isLoading: isLoadingProducts } =
        useGetProductListQuery({
            filters: {
                ...(query && { name: query }),
            },
        });

    return (
        <Stack width={'100%'}>
            <Autocomplete
                placeholder='Search item to add'
                options={products}
                getOptionLabel={(product) => product.name}
                onInputChange={(event, newInputValue) => {
                    setQuery(newInputValue);
                }}
                isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                }
                onChange={(event, newValue) => {
                    setProductsToReceive((prev) => {
                        if (!newValue) return prev;

                        if (prev.some((obj) => obj.uuid === newValue.uuid)) {
                            return prev;
                        }
                        return [
                            ...prev,
                            {
                                ...newValue,
                                ordered: 0,
                                received: 0,
                                toReceive: 0,
                                subLocation: '',
                                serialized: !!newValue.serialized,
                                serialsToAdd: [],
                                serialsToRemove: [],
                            },
                        ] satisfies ReceiveItemTableDataType[];
                    });
                }}
            />
        </Stack>
    );
};

export default ProductSearchBar;
