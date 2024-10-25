'use client';

import {
    Box,
    Button,
    Divider,
    TextField,
    ThemeProvider,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { settingsTheme } from '@/app/settings/utils/theme';

import AdjustmentTable from '@/components/adjustment-table';
import { useSkipper } from '@/components/adjustment-table/useSkipper';

import { useCreateActivityLogMutation } from '@/lib/redux/activity/getActivity';
import { useGetInventoryListWithUUIDQuery } from '@/lib/redux/inventory';
import { useGetProjectProductListQuery } from '@/lib/redux/project-products/getProjectProducts';

import { type AllocationAdjustmentTableData } from '../../../types';
import { columns } from './columns';
import ExpandableView from './expandable-view';

const StyledNavbarBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
}));
const StyledWhiteButton100px = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    border: '1px solid #D0D5DD',
    width: '100px',
    padding: '5px',
}));
const StyledPurpleButton100px = styled(Button)(() => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    borderRadius: '8px',
    padding: '6px',
}));
const StyledTypoGraphyHeader = styled(Typography)(() => ({
    fontWeight: '600',
    fontSize: '16px',
}));
const StyledTypography = styled(Typography)(() => ({
    fontWeight: '500',
    color: '#344054',
    marginBottom: '4px',
}));
const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        padding: '0px',
        borderRadius: '8px',
    },
    '& .MuiInputBase-input': {
        padding: '8px 10px',
        borderRadius: '8px',
    },
}));

interface SubLocation {
    uuid: string;
    name: string;
}

interface Location {
    uuid: string;
    warehouse: SubLocation | null;
    area: SubLocation | null;
    rack: SubLocation | null;
    shelf: SubLocation | null;
    bin: SubLocation | null;
    quantity: number;
    onUsed: number;
  }
  

export interface ConvertedLocation {
    uuid: string;
    subLocation: string;
}

  export interface ConvertedLocationArray {
    convertedArray: ConvertedLocation;
    quantity: number;
    onUsed: number;
  }

export interface SerializedProduct {
    number: string;
    uuid: string;
    project: string;
}

const Page: React.FC = () => {
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
    const searchParams = useSearchParams();
    const [uuids, setUuids] = useState<string[]>([]);
    const [adjustmentTableData, setAdjustmentTableData] = useState<
        AllocationAdjustmentTableData[]
    >([]);
    const [activityId, setActivityId] = useState<string>('');
    const [note, setNote] = useState<string>('');

    const { id } = useParams();

    const router = useRouter();
    const [action, setAction] = useState<string>('');

    useEffect(() => {
        // check if next router is

        const idsParams = searchParams.get('ids');
        if (idsParams) {
            const ids = idsParams.split(',');
            const action = searchParams.get('action');
            setAction(action as string);
            setUuids(ids);
        }
    }, [searchParams]);

    const { data: inventoryListWithUUIDdata } =
        useGetInventoryListWithUUIDQuery({
            filters: {
                uuid: `${uuids.join(',')}`,
            },
        });

    const { data: projectProductListData } = useGetProjectProductListQuery({
        filters: {
            project: id as string,
        },
    });

    const [createActivityLog] = useCreateActivityLogMutation();

    const validateAllocate = () => {
        if (activityId === '') {
            toast.error("Activity ID can't be empty");
            return false;
        } else if (
            adjustmentTableData.some((item) => item.changedQuantity === 0)
        ) {
            toast.error('Quantity can not be zero');
            return false;
        } else if (
            adjustmentTableData.some(
                (item) =>
                    item.fromsubLocation === '' ||
                    item.fromsubLocation === null,
            )
        ) {
            toast.error('Choose a Sublocation');
            return false;
        } else {
            return true;
        }
    };

    const handleAllocate = async () => {
        try {
            const activity = {
                type: action === "allocate" ? 'allocate_stock' : 'deallocate_stock',
                activityId: activityId,
                note: note,
                project: id as string,
                track: adjustmentTableData.map((item) => ({
                    product: item.productId,
                    quantity: action === "allocate" ? item.changedQuantity : -item.changedQuantity,
                    fromLocation: item.subLocationList.find((location) => 
                        location.convertedArray.subLocation === item.fromsubLocation)?.convertedArray.uuid,
                    serialNumbers: item.addSerialNo,
                    project: id as string,
                })),
            };

            if (!validateAllocate()) {
                return;
            }

            const response = await createActivityLog({
                activity: activity,
            });

            console.log('response', response);

            if (!response.error) {
                const projectId: string = id as string;
                const activityUuid = response.data.createActivityLog.uuid;
                // Redirect to the project page using next router
                toast.success('Stock allocated successfully');
                setTimeout(() => {
                    router.push(`/projects/projects/${projectId}/stocks/allocate/${activityUuid}`);
                }, 2000);
            } else {
                console.log('error', response.error);
                toast.error('Failed to allocate stock');
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const [productQuantity, setProductQuantity] = useState<number>(0);
    const [productOnUsed, setProductOnUsed] = useState<number>(0);
    const [subLocationArrays, setSubLocationArrays] = useState<ConvertedLocationArray[]>([]);

    function convertLocations(locations: Location[]): ConvertedLocationArray[] {
        const convertedLocationArrays : ConvertedLocationArray[] = [];
      
        // Filter out entries where all properties are null
        const validLocations = locations.filter(
            (location) =>
                location.warehouse &&
                location.area &&
                location.rack &&
                location.shelf &&
                location.bin,
        );

        // Convert the valid entries to the desired format
        validLocations.forEach((location) => {
        const convertedArray: ConvertedLocation = { uuid: '', subLocation: '' };
          const uuid = location.uuid;
          const warehouseName = location.warehouse?.name;
          const areaName = location.area?.name;
          const rackName = location.rack?.name;
          const shelfName = location.shelf?.name;
          const binName = location.bin?.name;
        //   convertedArray.push({ uuid, subLocation: `${warehouseName} ${areaName} ${rackName} ${shelfName} ${binName}` });
            convertedArray.uuid = uuid;
            convertedArray.subLocation = `${warehouseName} ${areaName} ${rackName} ${shelfName} ${binName}`;

            convertedLocationArrays.push({
                convertedArray: convertedArray,
                quantity: location.quantity,
                onUsed: location.onUsed,
            });

        });

        return convertedLocationArrays;
      
      }

    useEffect(() => {
        if (inventoryListWithUUIDdata?.products && projectProductListData) {
            const products = inventoryListWithUUIDdata.products;
            const mappedRowData: AllocationAdjustmentTableData[] = products.map((item: any)  => {
                const projectQuantity = projectProductListData.find(
                    (projectProduct) =>
                        projectProduct.product.name === item.name,
                )?.quantity;
                const allocated = projectProductListData.find(
                    (projectProduct) =>
                        projectProduct.product.name === item.name,
                )?.allocated;
                return {
                    track: false,
                    product: {
                        name: item.name,
                        id: item.uuid,
                        serialized: item.serialized,
                        quantity: item.quantity,
                    },
                    productId: item.uuid,
                    action: action,
                    addSerialNo: [],
                    removeSerialNo: [],
                    fromsubLocation: '',
                    projectQuantity: projectQuantity,
                    allocated: allocated,
                    serializedProducts: action === "allocate" ?  item.serializedProducts.filter(
                        (serialNumber: SerializedProduct) => serialNumber.project !== id,
                    ) : item.serializedProducts.filter(
                        (serialNumber: SerializedProduct) => serialNumber.project === id,
                    ),
                    quantityNeeded: projectQuantity && allocated ? projectQuantity - allocated : 0,
                    available: item.onUsed ? item.quantity - item.onUsed : item.quantity,
                    allocate: 0,
                    changedQuantity: 0,
                    subLocationList: convertLocations(item.locations),
                    // smaller value between available and quantityNeeded
                    maxChangedQuantity: action === "allocate" ?  Math.min(
                        projectQuantity && allocated ? projectQuantity - allocated : 0,
                        item.quantity,
                    ) : Math.min(
                        projectQuantity && allocated ? allocated : 0,
                        item.quantity,
                    ),
                };
            })

            setAdjustmentTableData(mappedRowData);
        }
    }, [inventoryListWithUUIDdata, projectProductListData]);

    console.log('adjustmentTableData', adjustmentTableData);

    return (
        <Box sx={{ p: 3, width: '100%', height: '100vh', overflow: 'scroll' }}>
            <StyledNavbarBox
                sx={{
                    justifyContent: 'space-between',
                    mb: 3,
                }}
            >
                <StyledTypoGraphyHeader>Stock Alocation</StyledTypoGraphyHeader>
                <StyledNavbarBox>
                    <StyledWhiteButton100px variant='outlined'>
                        Cancel
                    </StyledWhiteButton100px>
                    <StyledPurpleButton100px
                        variant='contained'
                        onClick={handleAllocate}
                    >
                        {action === 'allocate' ? 'Allocate' : 'Deallocate'}
                    </StyledPurpleButton100px>
                </StyledNavbarBox>
            </StyledNavbarBox>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    gap: '20px',
                    padding: '20px 30px ',
                }}
            >
                <Box>
                    <StyledTypography variant='subtitle2'>
                        {action === "allocate" ? "Allocation" : "Deallocation"} ID
                    </StyledTypography>
                    <StyledTextField
                        placeholder='A-1256'
                        value={activityId}
                        onChange={(e) => setActivityId(e.target.value)}
                    />
                </Box>
                <Box>
                    <StyledTypography variant='subtitle2'>
                        Add Note
                    </StyledTypography>
                    <StyledTextField
                        placeholder='Type something here...'
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </Box>
            </Box>
            <Divider />
            <ThemeProvider theme={settingsTheme}>
                <Box
                    width='100%'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 3,
                    }}
                >
                    <AdjustmentTable
                        data={adjustmentTableData}
                        columns={columns}
                        expandableView={ExpandableView}
                        autoResetPageIndex={autoResetPageIndex}
                        meta={{
                            adjustmentTable: {
                                updateData: (rowIndex, columnId, value) => {
                                    // Skip page index reset until after next rerender
                                    skipAutoResetPageIndex();

                                    // console.log('update triggered');
                                    setAdjustmentTableData((old) =>
                                        old.map((row, index) => {
                                            if (index === rowIndex) {
                                                return {
                                                    ...old[rowIndex],
                                                    [columnId]: value,
                                                };
                                            }
                                            return row;
                                        }),
                                    );
                                },
                            },
                        }}
                    />
                </Box>
            </ThemeProvider>
        </Box>
    );
};
export default Page;
