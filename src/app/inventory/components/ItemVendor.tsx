import type React from 'react';

import DataTable from '@/components/Table/Table';

interface ItemVendorProps {
    vendorRows: any[];
    vendorHeadCells: any[];
    isVendorLoading: boolean;
    setSelectedRows: any;
    handleFetchData: any;
    tableRef: any;
}

const ItemVendor: React.FC<ItemVendorProps> = ({
    vendorRows,
    vendorHeadCells,
    isVendorLoading,
    setSelectedRows,
    handleFetchData,
    tableRef,
}) => {
    return (
        <>
            <DataTable
                isSelect={true}
                rows={vendorRows}
                headCells={vendorHeadCells}
                setSelectedRows={setSelectedRows}
                singleRowSelect={false}
                isLoading={isVendorLoading}
                isError={false}
                handleFetchData={handleFetchData}
                uniqueKey='id'
                tableHeight='30vh'
                errorElement={<div>Error</div>}
                noDataElement={<div>No Data</div>}
                isMoreData={true}
                navigateOnRowClick={false}
                tableRef={tableRef}
            />
        </>
    );
};

export default ItemVendor;
