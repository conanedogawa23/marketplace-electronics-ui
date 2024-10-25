'use client';

import { INVENTORY_ITEM } from '@/common/page-paths';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HideImageIcon from '@mui/icons-material/HideImage';
import PrintIcon from '@mui/icons-material/Print';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams, useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import Inventory from '@/app/inventory/components/Inventory';
import ItemVendor from '@/app/inventory/components/ItemVendor';
import MovementHistory from '@/app/inventory/components/MovementHistory';
import OrderHistory from '@/app/inventory/components/orderHistory';

import { useGetProductByUuidQuery } from '@/lib/redux/inventory';
import {
    type AttachmentType,
    type ImageType,
} from '@/lib/redux/inventory/types';
import { useGetVendorProductListQuery } from '@/lib/redux/vendor/getVendors';
import { useGetActivityLogDetailsListQuery } from '../../../../../lib/redux/activity/getActivity';

import PrintDownloadModal from '../../../components/createItem/PrintDownLoadModal';
import { FileIcon } from '../../../utils/fileIcon';
import { StyledSelectedAttachmentBox } from '../../styles';
import moment from 'moment';

// STYLES
const StyledWhiteButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
    borderRadius: '8px',
}));
const StyledHeaderTypography = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    fontSize: '18px',
    color: '#101828',
}));
const StyledPurpleOutlinedButton = styled(Button)(({ theme }) => ({
    color: '#AB41C2',
    borderColor: '#C255D9',
    textTransform: 'none',
    padding: '5px',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #C255D9',
    borderRadius: '8px',
}));
const StyledPurpleButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    borderRadius: '8px',
}));

const StyledTypographyLabel = styled(Typography)(({ theme }) => ({
    fontWeight: '500',
    color: '#344054',
    marginBottom: '4px',
    fontSize: '16px',
}));
const StyledTypographyValue = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    color: '#344054',
    marginBottom: '4px',
    fontSize: '18px',
    padding: '8px',
    border: '1px solid #D0D5DD',
    borderRadius: '8px',
}));

const StyledFlexBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
}));
const StyledFlexBoxRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
}));
const StyledFlexBoxSpaceBetween = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));
const StyledChip = styled(Chip)(({ theme }) => ({
    backgroundColor: '#F9FAFB',
    color: '#344054',
    fontWeight: 600,
    padding: '8px',
    border: '1px solid #EAECF0',
    fontSize: '14px',
}));
interface SerializedProduct {
    number: string;
    uuid: string;
}
interface ProductDetailsProps {
    name: string;
    sku: string;
    category: any | string;
    manufacturer: string | null;
    length: number;
    width: number;
    height: number;
    weight: number;
    uom: string;
    description: string;
    attachments?: AttachmentType[];
    image?: ImageType;
    price: {
        msrp: number;
        mapp: number;
        cost: number;
        sell: number;
        shippingCost: number;
        shippingSell: number;
    };
    quantity: number;
    tags: string[];
    status: string;
    minQuantity: number;
    maxQuantity: number;
    notes?: string;
    uuid?: string;
    type: string;
    serializedProducts?: SerializedProduct[];
}
interface VendorHeadCellsProps {
    id: string;
    label: string;
    minWidth: number;
    maxWidth?: number;
}
interface VendorRowProps {
    id: string;
    vendor: string;
    source: string;
    price: number;
    email: string;
}

export interface MovementHistoryProps {
    id: string;
    movementType: string;
    movementDate: string;
    from: string;
    to: string;
    quantity?: number;
    notes?: string;
}

const ItemDetaisPage: React.FC = () => {
    const vendorHeadCells: VendorHeadCellsProps[] = [
        { id: 'vendor', label: 'Vendor', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'source', label: 'Source', minWidth: 100 },
        { id: 'price', label: 'Vendor Price', minWidth: 100 },
    ];
    const [selected, setSelectedRows] = useState<(number | string)[]>([]);
    const [vendorRows, setVendorRows] = useState<VendorRowProps[]>([]);
    const [movementHistoryTableData, setMovementHistoryTableData] = useState<MovementHistoryProps[]>([]);
    const [openPrintModal, setOpenPrintModal] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);
    const { id } = useParams();
    const { data: vendorProductData, isLoading: isVendorProductLoading } =
        useGetVendorProductListQuery({ filters: { product: id as string } });

    const { data: activityLogData, isLoading: isActivityLogDataLoading } =
        useGetActivityLogDetailsListQuery({
            filters: { track: [{ product: id as string}] },
        });
        
    const handleOpenPrintModal = () => {
        setOpenPrintModal(true);
    };
    const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex);
    };

    const handleFetchData = async (page_number: number) => {
        console.log('Fetching data for page number:', page_number);
    };
    const [productDetails, setProductDetails] =
        useState<ProductDetailsProps | null>(null);
    const handleBackClick = () => {
        window.history.back();
    };
    const router = useRouter();
    const handleNavigateToEdit = () => {
        router.push(`${INVENTORY_ITEM}/${id as string}/update`);
    };
    const {
        data: productData,
        isLoading: isProductLoading,
        refetch,
    } = useGetProductByUuidQuery({ uuid: (id as string) || '' });

    const activityTypeMovementTypeMap: any = {
        'adjust_stock': 'Stock Adjustment',
        'allocate_stock': 'Stock Allocation',
        'receive_stock': 'Stock Received',
        'transfer_stock': 'Stock Transfer',
        'deallocate_stock': 'Stock Deallocation',
    };

    const convertLocationDataToString = (locationData: any) => {
        return `${locationData?.warehouse?.name || ''}/ ${locationData?.area?.name || ''}/ ${locationData?.rack?.name || ''}/ ${locationData?.shelf?.name || ''}/ ${locationData?.bin?.name || ''}`;

    }

    useEffect(() => {
        if (vendorProductData) {
            console.log('vendorProductData', vendorProductData);
            const mappedRowData: VendorRowProps[] = vendorProductData.map(
                (item: any) => ({
                    id: item.uuid,
                    vendor: item.vendor.name,
                    source: item.vendor.source,
                    price: item.price,
                    email: item.vendor.email,
                }),
            );

            setVendorRows(mappedRowData);
        }
        if (productData) {
            const formattedData: ProductDetailsProps = {
                name: productData.name,
                sku: productData.sku,
                category: productData.category?.name,
                manufacturer: productData.manufacturer?.name,
                length: productData.length || 0,
                width: productData.width || 0,
                height: productData.height || 0,
                weight: productData.weight || 0,
                uom: productData.uom?.name,
                description: productData.description,
                attachments: productData.attachments,
                image: productData?.image,
                price: {
                    msrp: productData.price.msrp,
                    mapp: productData.price.mapp,
                    cost: productData.price.cost,
                    sell: productData.price.sell,
                    shippingCost: productData.price.shippingCost,
                    shippingSell: productData.price.shippingSell,
                },
                quantity: productData.quantity,
                tags: productData.tags,
                status: productData.status,
                minQuantity: productData.minQuantity,
                maxQuantity: productData.maxQuantity,
                notes: productData.notes,
                type: productData.type,
                uuid: productData.uuid,
                serializedProducts: productData.serializedProducts,
            };
            setProductDetails(formattedData);
        }

        if (activityLogData) {
            const formattedData: MovementHistoryProps[] = activityLogData.map(
                (item: any) => {

                    const track = item.track;
                    // find the quantity of the product in the tyrack which matches with the id
                    const product = track.find((trackItem: any) => trackItem.product === id);
                    const quantity = product?.quantity
                    const productQuantity = product?.quantity < 0 ? -product?.quantity : product?.quantity;

                    const fromLocation = product?.fromLocation;

                    // find that fromLocation uuid from item.fromLocation array
                    const fromLocationData = item.fromLocation.find((location: any) => location.uuid === fromLocation);

                    const toLocation = product?.toLocation;
                    // find that toLocation uuid from item.toLocation array
                    const toLocationData = item.toLocation.find((location: any) => location.uuid === toLocation);

                    const locationData = {
                        from: "",
                        to: ""
                    };
                    if (item.type === 'adjust_stock') {
                            locationData['to'] = convertLocationDataToString(toLocationData);
                            locationData['from'] = 'N/A';
                    } else if (item.type === 'receive_stock') {
                        locationData['from'] = 'N/A';
                        locationData['to'] = convertLocationDataToString(toLocationData);
                    } else if (item.type === 'transfer_stock') {
                        locationData['from'] = convertLocationDataToString(fromLocationData);
                        locationData['to'] = convertLocationDataToString(toLocationData);
                    }

                    return {
                        id: item.uuid,
                        movementType: activityTypeMovementTypeMap[item.type],
                        movementDate: moment(parseInt(item.createdAt)).format('MMM DD YYYY; HH:mm:ss'),
                        from: locationData.from,
                        to: locationData.to,
                        quantity: productQuantity,
                        notes: item.note
                    }
                },
            );

            setMovementHistoryTableData(formattedData);
        }
    }, [productData, vendorProductData, activityLogData]);
    useEffect(() => {
        refetch();
    }, [refetch]);
    return (
        <Box sx={{ padding: '26px 20px', width: '100%' }}>
            <StyledFlexBoxSpaceBetween
                sx={{ width: '100%', paddingBottom: '20px' }}
            >
                <StyledFlexBoxRow>
                    <StyledWhiteButton
                        onClick={handleBackClick}
                        variant='outlined'
                        startIcon={<ArrowBackIcon />}
                    >
                        Back
                    </StyledWhiteButton>
                    <Box>
                        <StyledHeaderTypography variant='h5'>
                            {productDetails?.name || 'New Product'}
                        </StyledHeaderTypography>
                        <Typography variant='caption'>
                            {productDetails?.type as string}
                        </Typography>
                    </Box>
                </StyledFlexBoxRow>
                <StyledFlexBoxRow>
                    <StyledPurpleOutlinedButton
                        onClick={handleOpenPrintModal}
                        startIcon={<PrintIcon />}
                    >
                        Print
                    </StyledPurpleOutlinedButton>
                    <StyledPurpleButton
                        variant='contained'
                        onClick={handleNavigateToEdit}
                    >
                        Edit
                    </StyledPurpleButton>
                </StyledFlexBoxRow>
            </StyledFlexBoxSpaceBetween>
            <PrintDownloadModal
                open={openPrintModal}
                setOpen={setOpenPrintModal}
                headerTypographyContent='Print'
                productData={{
                    name: productDetails?.name || 'N/A',
                    uuid: id as string,
                    sku: productDetails?.sku || 'N/A',
                    serializedProducts:
                        productDetails?.serializedProducts || [],
                }}
                typeOfProduct={productDetails?.type as string}
            />
            <Divider />
            <Box
                sx={{
                    height: '90vh',
                    overflow: 'scroll',
                    width: '100%',
                }}
            >
                {isProductLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '90vh',
                            width: '100%',
                        }}
                    >
                        <CircularProgress color='secondary' />
                    </Box>
                ) : (
                    <Container>
                        <Box sx={{ mt: 6 }}>
                            <Grid container spacing={6}>
                                <Grid item xs={12} md={4}>
                                    <StyledTypographyLabel>
                                        Product Image
                                    </StyledTypographyLabel>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '350px',
                                            border: '1px solid #EAECF0',
                                            borderRadius: '8px',
                                            position: 'relative',
                                        }}
                                    >
                                        {productDetails?.image ? (
                                            <img
                                                src={productDetails.image.url}
                                                alt={productDetails.image.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        ) : (
                                            <HideImageIcon
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <Grid
                                        container
                                        direction='row'
                                        justifyContent='space-between'
                                        spacing={3}
                                    >
                                        <Grid item xs={12}>
                                            <StyledTypographyLabel>
                                                Product Name
                                            </StyledTypographyLabel>
                                            <StyledTypographyValue>
                                                {productDetails?.name || 'N/A'}
                                            </StyledTypographyValue>
                                        </Grid>
                                        {[
                                            'sku',
                                            'manufacturer',
                                            'category',
                                        ].map((key, index) => (
                                            <Grid item xs={5} key={index}>
                                                <StyledFlexBox>
                                                    <StyledTypographyLabel>
                                                        {key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            key.slice(1)}{' '}
                                                        :
                                                    </StyledTypographyLabel>
                                                    <StyledTypographyValue>
                                                        {productDetails?.[
                                                            key as keyof ProductDetailsProps
                                                        ] || 'N/A'}
                                                    </StyledTypographyValue>
                                                </StyledFlexBox>
                                            </Grid>
                                        ))}
                                        {[
                                            'length',
                                            'width',
                                            'height',
                                            'weight',
                                            'uom',
                                        ].map((key, index) => (
                                            <Grid item xs={5} key={index}>
                                                <StyledFlexBox>
                                                    <StyledTypographyLabel>
                                                        {key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            key.slice(1)}{' '}
                                                        :
                                                    </StyledTypographyLabel>
                                                    <StyledTypographyValue>
                                                        {productDetails?.[
                                                            key as keyof ProductDetailsProps
                                                        ] || 0}
                                                    </StyledTypographyValue>
                                                </StyledFlexBox>
                                            </Grid>
                                        ))}

                                        <Grid item xs={12}>
                                            <StyledTypographyLabel>
                                                Tags :
                                            </StyledTypographyLabel>
                                            <StyledFlexBoxRow
                                                sx={{
                                                    border: '1px solid #D0D5DD',
                                                    borderRadius: '8px',
                                                    padding: '4px',
                                                    height: '36px',
                                                }}
                                            >
                                                {productDetails?.tags.map(
                                                    (tag, index) => (
                                                        <StyledChip
                                                            key={index}
                                                            label={tag}
                                                        />
                                                    ),
                                                )}
                                            </StyledFlexBoxRow>
                                        </Grid>
                                        <Grid item xs={12} sx={{ mt: 1 }}>
                                            <StyledTypographyLabel>
                                                Description :
                                            </StyledTypographyLabel>
                                            <StyledTypographyValue variant='body1'>
                                                {productDetails?.description ||
                                                    'No description available.'}
                                            </StyledTypographyValue>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            indicatorColor='secondary'
                            style={{
                                marginTop: '8px',
                            }}
                            sx={{
                                '.MuiTabs-scroller': {
                                    display: 'flex',
                                    justifyContent: 'center',
                                },
                                '.Mui-selected': {
                                    color: '#AB41C2 !important',
                                    backgroundColor: '#FDF4FF',
                                    fontWeight: '600',
                                },
                            }}
                        >
                            <Tab label='Overview' />
                            <Tab label='Vendors' />
                            <Tab label='Attachments' />
                            <Tab label='History' />
                            <Tab label='Inventory' />
                            <Tab label='Movement History' />
                        </Tabs>
                        {/* OVERVIEW TAB */}
                        {tabIndex === 0 && (
                            <Grid
                                container
                                direction='row'
                                justifyContent='space-between'
                                spacing={1}
                            >
                                <Grid item xs={5}>
                                    <Grid
                                        container
                                        direction='row'
                                        spacing={2}
                                        sx={{ mt: 2 }}
                                    >
                                        <Grid item xs={12}>
                                            <StyledTypographyLabel
                                                sx={{
                                                    fontSize: '20px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Reorder
                                            </StyledTypographyLabel>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <StyledFlexBox>
                                                <StyledTypographyLabel>
                                                    Min Quantity :
                                                </StyledTypographyLabel>
                                                <StyledTypographyValue>
                                                    {productDetails?.minQuantity ||
                                                        0}
                                                </StyledTypographyValue>
                                            </StyledFlexBox>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <StyledFlexBox>
                                                <StyledTypographyLabel>
                                                    Max Quantity :
                                                </StyledTypographyLabel>
                                                <StyledTypographyValue>
                                                    {productDetails?.maxQuantity ||
                                                        0}
                                                </StyledTypographyValue>
                                            </StyledFlexBox>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                    <Grid
                                        container
                                        direction='row'
                                        spacing={2}
                                        sx={{ mt: 2 }}
                                    >
                                        <Grid item xs={12}>
                                            <StyledTypographyLabel
                                                sx={{
                                                    fontSize: '20px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Pricing and Cost
                                            </StyledTypographyLabel>
                                        </Grid>

                                        {[
                                            'msrp',
                                            'mapp',
                                            'cost',
                                            'sell',
                                            'shippingCost',
                                            'shippingSell',
                                        ].map((key, index) => (
                                            <Grid item xs={12} key={index}>
                                                <StyledFlexBox>
                                                    <StyledTypographyLabel
                                                        sx={{
                                                            textTransform:
                                                                'uppercase',
                                                        }}
                                                    >
                                                        {key} :
                                                    </StyledTypographyLabel>
                                                    <StyledTypographyValue>
                                                        $
                                                        {productDetails?.price[
                                                            key as keyof typeof productDetails.price
                                                        ].toFixed(2) || 0}
                                                    </StyledTypographyValue>
                                                </StyledFlexBox>
                                            </Grid>
                                        ))}

                                        <Grid item xs={12} sx={{ mt: 2 }}>
                                            <StyledTypographyLabel>
                                                Notes:
                                            </StyledTypographyLabel>
                                            <StyledTypographyValue>
                                                {productDetails?.notes ||
                                                    'No notes available.'}
                                            </StyledTypographyValue>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                        {
                            /* VENDORS TAB */
                            tabIndex === 1 && (
                                <Box sx={{ mt: 3 }}>
                                    {/* <DataTable
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
                                    /> */}
                                    <ItemVendor
                                        vendorRows={vendorRows}
                                        vendorHeadCells={vendorHeadCells}
                                        isVendorLoading={isVendorProductLoading}
                                        setSelectedRows={setSelectedRows}
                                        handleFetchData={handleFetchData}
                                        tableRef={tableRef}
                                    />
                                </Box>
                            )
                        }
                        {tabIndex === 2 && (
                            <>
                                <Typography variant='h6' sx={{ mt: 3 }}>
                                    Attachments
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid #EAECF0',
                                        borderRadius: '8px',
                                        padding: '10px',
                                    }}
                                >
                                    {productDetails?.attachments?.map(
                                        (attachment, index) => (
                                            <StyledSelectedAttachmentBox
                                                key={index}
                                            >
                                                <a
                                                    href={attachment.url}
                                                    target='_blank'
                                                    style={{
                                                        width: '100%',
                                                        textDecoration: 'none',
                                                    }}
                                                    title={` Click to view ${attachment.name}`}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            alignItems:
                                                                'center',
                                                            gap: '10px',
                                                        }}
                                                    >
                                                        <FileIcon
                                                            href={
                                                                attachment.name
                                                            }
                                                        />
                                                        <Typography
                                                            variant='subtitle1'
                                                            sx={{
                                                                fontWeight:
                                                                    '500',
                                                                opacity: 0.8,
                                                            }}
                                                        >
                                                            {attachment.name}
                                                        </Typography>
                                                    </Box>
                                                </a>
                                            </StyledSelectedAttachmentBox>
                                        ),
                                    )}
                                </Box>
                            </>
                        )}

                        {tabIndex === 3 && <OrderHistory />}
                        {tabIndex === 4 && <Inventory />}
                        {tabIndex === 5 && <MovementHistory 
                            movementHistoryTableData={movementHistoryTableData}
                        />}
                    </Container>
                )}
            </Box>
        </Box>
    );
};
export default ItemDetaisPage;
