'use client';

import { Box } from '@mui/material';
import { useState } from 'react';

import { Header } from './components/header';
import PurchaseOrderDetails from './components/purchase-order-details';
import SearchBar from './components/search-bar';

const AddReceivedItems = () => {
    const [purchaseOrderId, setPurchaseOrderId] = useState<string | null>(null);
    return (
        <Box p={8} component='main' sx={{ flexGrow: 1, overflow: 'auto' }}>
            <Header />
            <SearchBar setPurchaseOrderId={setPurchaseOrderId} />
            {purchaseOrderId ? (
                <PurchaseOrderDetails purchaseOrderId={purchaseOrderId} />
            ) : null}
        </Box>
    );
};

export default AddReceivedItems;
