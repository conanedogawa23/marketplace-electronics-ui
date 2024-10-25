'use client';

// ICONS
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
//MUI  COMPONENTS
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    FormControl,
    Modal,
    styled,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AutocompleteNew from '@/components/AutocompleteNew';

import { useGetLocationProductListQuery } from '@/lib/redux/location-products/getLocationProducts';
// QUERIES AND MUTATIONS
import {
    useCreateAreaMutation,
    useCreateBinMutation,
    useCreateLocationMutation,
    useCreateRackMutation,
    useCreateShelfMutation,
    useGetAreaRackListQuery,
    useGetCompanyLocationWarehouseListQuery,
    useGetLocationAreaListQuery,
    useGetLocationsForWarehouseQuery,
    useGetProjectLocationsDetailsListQuery,
    useGetRackShelfListQuery,
    useGetShelfBinListQuery,
} from '@/lib/redux/locations/getLocations';
import {
    useCreateWarehouseMutation,
    useGetWarehouseListQuery,
} from '@/lib/redux/warehouse/getWarehouses';

// COMPONENTS
import CollapsibleTable from '../../../components/CollapsibleTable/CollapsibleTable';
import {
    DynamicSelect,
    type OptionFields,
    type OptionType,
} from '../components/locations/DynamicSelect';
import NoSelectNoDataComp from '../components/locations/NoSelectNoData';
import SelectWarehouse from '../components/locations/SelectWarehouse';

// INTERFACES
interface ChildTableRow {
    item?: string;
    serial_number?: string;
    bin?: string;
    quantity?: number;
    po?: string;
}
interface RowData {
    area?: string;
    position?: string;
    quantity?: number;
    description?: string;
    name?: string;
    childTable: ChildTableRow[];
}
interface HeadCell {
    id: keyof ChildTableRow | keyof RowData;
    label: string;
}

interface AutoCompleteOptionsData {
    label: string;
    value: string;
}

interface AddNewAutoCompleteOption {
    type: string;
    name: string;
    desc: string;
    parentType: string;
    uuid: string;
    func: any;
    selectedOptionFunc: (option: AutoCompleteOptionsData) => void;
}

const parentHeadCells: HeadCell[] = [
    { id: 'area', label: 'Area' },
    { id: 'position', label: 'Position' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'description', label: 'Description' },
];

const parentHeadCellsProject: HeadCell[] = [
    { id: 'name', label: 'Location' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'description', label: 'Description' },
];

const childHeadCells: HeadCell[] = [
    { id: 'item', label: 'Item' },
    { id: 'serial_number', label: 'Serial Number' },
    { id: 'bin', label: 'Bin' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'po', label: 'PO' },
];

const childHeadCellsProject: HeadCell[] = [
    { id: 'item', label: 'Item' },
    { id: 'serial_number', label: 'Serial Number' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'po', label: 'PO' },
];

const StyledButton = styled(Button)(({ theme }) => ({
    fontWeight: 600,
    border: '1px solid #D0D5DD',
    fontSize: '14px',
    textTransform: 'none',
    height: '35px',
}));
const AddLocationModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 3,
};
const Locations: React.FC = () => {
    // STATES
    const [companyTableData, setCompanyTableData] = useState<RowData[]>([]);
    const [projectTableData, setProjectTableData] = useState<RowData[]>([]);
    const [locationActiveButton, setLocationActiveButton] = useState('project');
    const [warehouseOptions, setWarehouseOptions] = useState<OptionType[]>([]);
    const [areaOptions, setAreaOptions] = useState<string[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] =
        useState<OptionType | null>(null);
    const [warehouseOptionsAutocomplete, setWarehouseOptionsAutocomplete] =
        useState<AutoCompleteOptionsData[]>([]);
    const [areaOptionsAutocomplete, setAreaOptionsAutocomplete] = useState<
        AutoCompleteOptionsData[]
    >([]);
    const [rackOptionsAutocomplete, setRackOptionsAutocomplete] = useState<
        AutoCompleteOptionsData[]
    >([]);
    const [shelfOptionsAutocomplete, setShelfOptionsAutocomplete] = useState<
        AutoCompleteOptionsData[]
    >([]);
    const [binOptionsAutocomplete, setBinOptionsAutocomplete] = useState<
        AutoCompleteOptionsData[]
    >([]);
    const [autoCompleteValue, setAutoCompleteValue] =
        useState<AutoCompleteOptionsData>();
    const [selectedWarehouseOptions, setSelectedWarehouseOptions] =
        useState<AutoCompleteOptionsData>({ label: '', value: '' });
    const [selectedAreaOptions, setSelectedAreaOptions] =
        useState<AutoCompleteOptionsData>({ label: '', value: '' });
    const [selectedRackOptions, setSelectedRackOptions] =
        useState<AutoCompleteOptionsData>({ label: '', value: '' });
    const [selectedShelfOptions, setSelectedShelfOptions] =
        useState<AutoCompleteOptionsData>({ label: '', value: '' });
    const [selectedBinOptions, setSelectedBinOptions] =
        useState<AutoCompleteOptionsData>({ label: '', value: '' });

    const [currentInputOption, setCurrentInputOption] = useState<string>('');
    const [selectedLocationId, setSelectedLocationId] = useState<
        string | undefined
    >('');
    // STATES FOR ADD LOCATION MODAL
    const [selectedLocationOption, setSelectedLocationOption] =
        useState<string>('Company Locations');
    const [openAddLocationModal, setOpenAddLocationModal] =
        React.useState(false);
    const [locationFieldValues, setLocationFieldValues] = useState<
        Record<string, string>
    >({
        area: '',
        rack: '',
        shelf: '',
        bin: '',
        warehouse: '',
        type: '',
        name: '',
    });
    const [locationFieldValuesProject, setLocationFieldValuesProject] =
        useState<Record<string, string>>({
            name: '',
            description: '',
        });
    const handleSelectedWarehouseChange = (data: OptionType) => {
        setSelectedWarehouseOptions(data);
        if (data.label === '') {
            setCurrentInputOption('warehouse');
        } else {
            setCurrentInputOption('area');
        }
        setSelectedAreaOptions({ label: '', value: '' });
        setSelectedRackOptions({ label: '', value: '' });
        setSelectedShelfOptions({ label: '', value: '' });
        setSelectedBinOptions({ label: '', value: '' });
        setLocationFieldValues((prevValues) => ({
            ...prevValues,
            warehouse: data?.value,
        }));
        setLocationFieldValues((prevValues) => ({
            ...prevValues,
            type:
                selectedLocationOption === 'Company Locations'
                    ? 'company'
                    : 'project',
        }));
    };

    const handleSelectedAreaChange = (data: OptionType) => {
        setSelectedAreaOptions(data);
        if (data.label === '') {
            setCurrentInputOption('area');
        } else {
            setCurrentInputOption('rack');
        }
        setSelectedRackOptions({ label: '', value: '' });
        setSelectedShelfOptions({ label: '', value: '' });
        setSelectedBinOptions({ label: '', value: '' });
        setLocationFieldValues((prevValues) => ({
            ...prevValues,
            area: data?.value,
        }));
    };

    const handleSelectedRackChange = (data: OptionType) => {
        setSelectedRackOptions(data);
        if (data.label === '') {
            setCurrentInputOption('rack');
        } else {
            setCurrentInputOption('shelf');
        }
        setSelectedShelfOptions({ label: '', value: '' });
        setSelectedBinOptions({ label: '', value: '' });
        setLocationFieldValues((prevValues) => ({
            ...prevValues,
            rack: data?.value,
        }));
    };

    const handleSelectedShelfChange = (data: OptionType) => {
        setSelectedShelfOptions(data);
        if (data.label === '') {
            setCurrentInputOption('shelf');
        } else {
            setCurrentInputOption('bin');
        }
        setSelectedBinOptions({ label: '', value: '' });
        setLocationFieldValues((prevValues) => ({
            ...prevValues,
            shelf: data?.value,
        }));
    };

    const handleSelectedBinChange = (data: OptionType) => {
        setSelectedBinOptions(data);
        setLocationFieldValues((prevValues) => ({
            ...prevValues,
            bin: data?.value,
        }));
    };

    // LOCATION MODAL OPTIONS FOR INPUT FIELDS AND DROPDOWNS
    const addLocationModalFieldOptions: OptionFields[] = [
        {
            option: 'Company Locations',
            fields: [
                {
                    label: 'warehouse',
                    key: 'name',
                    type: 'autocomplete',
                    options: warehouseOptionsAutocomplete,
                    selectedOption: selectedWarehouseOptions,
                    setSelectedOption: handleSelectedWarehouseChange,
                    parentType: 'none',
                    disabled:
                        currentInputOption === 'warehouse' ||
                        selectedWarehouseOptions?.label !== ''
                            ? false
                            : true,
                },
                {
                    label: 'area',
                    key: 'area',
                    type: 'autocomplete',
                    options: areaOptionsAutocomplete,
                    selectedOption: selectedAreaOptions,
                    setSelectedOption: handleSelectedAreaChange,
                    parentType: 'warehouse',
                    disabled:
                        currentInputOption === 'area' ||
                        selectedWarehouseOptions?.label !== ''
                            ? false
                            : true,
                },
                {
                    label: 'rack',
                    key: 'rack',
                    type: 'autocomplete',
                    options: rackOptionsAutocomplete,
                    selectedOption: selectedRackOptions,
                    setSelectedOption: handleSelectedRackChange,
                    parentType: 'area',
                    disabled:
                        currentInputOption === 'rack' ||
                        selectedAreaOptions?.label !== ''
                            ? false
                            : true,
                },
                {
                    label: 'shelf',
                    key: 'shelf',
                    type: 'autocomplete',
                    options: shelfOptionsAutocomplete,
                    selectedOption: selectedShelfOptions,
                    setSelectedOption: handleSelectedShelfChange,
                    parentType: 'rack',
                    disabled:
                        currentInputOption === 'shelf' ||
                        selectedRackOptions?.label !== ''
                            ? false
                            : true,
                },
                {
                    label: 'bin',
                    key: 'bin',
                    type: 'autocomplete',
                    options: binOptionsAutocomplete,
                    selectedOption: selectedBinOptions,
                    setSelectedOption: handleSelectedBinChange,
                    parentType: 'shelf',
                    disabled:
                        currentInputOption === 'bin' ||
                        selectedShelfOptions?.label !== ''
                            ? false
                            : true,
                },
            ],
        },
        {
            option: 'Project Locations',
            fields: [
                {
                    label: 'Project Area',
                    key: 'name',
                    type: 'text',
                    parentType: '',
                    disabled: false,
                },
                {
                    label: 'Description',
                    key: 'description',
                    type: 'text',
                    parentType: '',
                    disabled: false,
                },
            ],
        },
    ];

    // FUNCTION TO HANDLE LOCATION ACTIVE BUTTON
    const handleSetLocationActiveButton = (button: any) => {
        setLocationActiveButton(button === locationActiveButton ? '' : button);
    };

    // FUNCTION TO HANDLE WAREHOUSE OPTION CHANGE
    const handleWarehouseOptionChange = (
        event: React.SyntheticEvent,
        value: OptionType | null,
    ) => {
        setSelectedWarehouse(value);
    };

    // FUNCTION TO HANDLE LOCATION OPTION CHANGE IN ADD LOCATION MODAL
    const handleLocationOptionChange = (newOption: string) => {
        setCompanyTableData([]);
        setProjectTableData([]);
        setSelectedLocationOption(newOption);
    };

    const handleOtherFieldsWithParentType = (parentType: string) => {
        switch (parentType) {
            case 'warehouse':
                return {
                    type: 'area',
                    uuid: selectedWarehouseOptions.value,
                    func: createArea,
                    selectedOptionFunc: setSelectedAreaOptions,
                };

            case 'area':
                return {
                    type: 'rack',
                    uuid: selectedAreaOptions.value,
                    func: createRack,
                    selectedOptionFunc: setSelectedRackOptions,
                };

            case 'rack':
                return {
                    type: 'shelf',
                    uuid: selectedRackOptions.value,
                    func: createShelf,
                    selectedOptionFunc: setSelectedShelfOptions,
                };

            case 'shelf':
                return {
                    type: 'bin',
                    uuid: selectedShelfOptions.value,
                    func: createBin,
                    selectedOptionFunc: setSelectedBinOptions,
                };

            case 'none':
                return {
                    type: 'warehouse',
                    uuid: '',
                    func: createWarehouse,
                    selectedOptionFunc: setSelectedWarehouseOptions,
                };

            default:
                return {
                    type: 'warehouse',
                    uuid: '',
                    func: createLocation,
                    selectedOptionFunc: setSelectedWarehouseOptions,
                };
        }
    };

    // FUNCTION TO HANDLE LOCATION FIELD CHANGE IN ADD LOCATION MODAL

    // QUERIES AND MUTATIONS
    const { data: warehouseData, isLoading: warehouseDetailIsLoading } =
        useGetLocationsForWarehouseQuery(
            { warehouse: selectedWarehouse?.value || '' },
            { skip: !selectedWarehouse?.value },
        );
    const {
        data: locationProductListData,
        isLoading: locationProductListIsLoading,
    } = useGetLocationProductListQuery({
        filters: { location: selectedLocationId },
    });
    const {
        data: WarehouseLocationListData,
        isLoading: WareHouseLocationListIsLoading,
    } = useGetCompanyLocationWarehouseListQuery();
    const { data: projectLocationData, isLoading: projectIsLoading } =
        useGetProjectLocationsDetailsListQuery();
    const [createLocation] = useCreateLocationMutation();

    const { data: warehouseListData, isLoading: warehouseListIsLoading } =
        useGetWarehouseListQuery();
    const {
        data: areaListData,
        isLoading: areaListIsLoading,
        refetch: refetchAreaList,
    } = useGetLocationAreaListQuery(
        { filters: { warehouse: selectedWarehouseOptions?.value } },
        { skip: !selectedWarehouseOptions?.value },
    );
    const {
        data: rackListData,
        isLoading: rackListIsLoading,
        refetch: refetchRackList,
    } = useGetAreaRackListQuery(
        { filters: { area: selectedAreaOptions?.value } },
        { skip: !selectedAreaOptions?.value },
    );
    const {
        data: shelfListData,
        isLoading: shelfListIsLoading,
        refetch: refetchShelfList,
    } = useGetRackShelfListQuery(
        { filters: { rack: selectedRackOptions?.value } },
        { skip: !selectedRackOptions?.value },
    );
    const {
        data: binListData,
        isLoading: binListIsLoading,
        refetch: refetchBinList,
    } = useGetShelfBinListQuery(
        { filters: { shelf: selectedShelfOptions?.value } },
        { skip: !selectedShelfOptions?.value },
    );

    const [createWarehouse] = useCreateWarehouseMutation();
    const [createArea] = useCreateAreaMutation();
    const [createRack] = useCreateRackMutation();
    const [createShelf] = useCreateShelfMutation();
    const [createBin] = useCreateBinMutation();

    const [newOptionUuid, setNewOptionUuid] = useState<string>('');

    // FUNCTION TO HANDLE SUBMIT IN ADD LOCATION MODAL
    const onSubmit = async () => {
        const formattedLocationData = {
            type:
                selectedLocationOption === 'Company Locations'
                    ? 'company'
                    : 'project',
            area: selectedAreaOptions.value,
            rack: selectedRackOptions.value,
            shelf: selectedShelfOptions.value,
            bin: selectedBinOptions.value,
            warehouse: selectedWarehouseOptions.value,
            name: '',
        };

        const formattedLocationDataProject = {
            name: locationFieldValuesProject.name,
            description: locationFieldValuesProject.description,
            type: 'project',
        };

        try {
            const response = await createLocation({
                location:
                    selectedLocationOption === 'Company Locations'
                        ? formattedLocationData
                        : formattedLocationDataProject,
            }).unwrap();
            toast.success('Location added successfully');
        } catch (error) {
            toast.error('Error adding location');
        } finally {
            setOpenAddLocationModal(false);
        }
    };

    function getUUID(response: any) {
        for (const key in response) {
            if (response[key] && response[key].uuid) {
                return response[key].uuid;
            }
        }
        return null; // Return null or handle cases where no uuid is found
    }

    const [newOptionAdded, setNewOptionAdded] = useState<string>('none');

    const addNewAutoCompleteOption = async (data: AddNewAutoCompleteOption) => {
        const formattedData = {
            name: data.name,
            description: data.desc,
            [data.parentType]: data.uuid,
        };
        try {
            const response = await data
                .func({
                    [data.type]: formattedData,
                })
                .unwrap();
            setNewOptionUuid(getUUID(response));
            toast.success(`${data.type} added successfully`);
            setNewOptionAdded(data.type);
            data.selectedOptionFunc({
                label: data.name,
                value: getUUID(response),
            });
        } catch (error) {
            toast.error('Error adding location');
        }
    };

    const handleLocationFieldChange = (
        key: string,
        value: string,
        parentType: string,
    ) => {
        if (parentType === 'project') {
            console.log('Project location');
            setLocationFieldValuesProject((prevValues) => ({
                ...prevValues,
                [key]: value,
            }));
        } else {
            const otherFields = handleOtherFieldsWithParentType(parentType);
            if (otherFields.type === 'warehouse') {
                const formattedData = {
                    name: key,
                    description: value,
                };
                handleCreateWarehouse(formattedData);
            } else {
                addNewAutoCompleteOption({
                    type: otherFields.type,
                    name: key,
                    desc: value,
                    parentType: parentType,
                    uuid: otherFields.uuid,
                    func: otherFields.func,
                    selectedOptionFunc: otherFields.selectedOptionFunc,
                });
            }
            setLocationFieldValues((prevValues) => ({
                ...prevValues,
                [key]: value,
            }));
        }
    };

    console.log('locationFieldValues', locationFieldValues);

    const handleCreateWarehouse = async (data: any) => {
        const formattedData = {
            name: data.name,
            description: data.description,
        };
        try {
            const response = await createWarehouse({
                warehouse: formattedData,
            }).unwrap();
            toast.success(`Warehouse added successfully`);
        } catch (error) {
            toast.error('Error adding location');
        }
    };

    const handleCloseAddLocationModal = () => {
        setOpenAddLocationModal(false);
        setAreaOptionsAutocomplete([]);
        setRackOptionsAutocomplete([]);
        setShelfOptionsAutocomplete([]);
        setBinOptionsAutocomplete([]);
        setSelectedWarehouseOptions({ label: '', value: '' });
        setSelectedAreaOptions({ label: '', value: '' });
        setSelectedRackOptions({ label: '', value: '' });
        setSelectedShelfOptions({ label: '', value: '' });
        setSelectedBinOptions({ label: '', value: '' });
        setCurrentInputOption('warehouse');
    };

    // USE EFFECTS
    useEffect(() => {
        if (projectLocationData) {
            console.log(projectLocationData);
            const mappedRowData: RowData[] = projectLocationData.map(
                (item: any) => ({
                    name: item.name,
                    quantity: 0,
                    description: item.description,
                    locationId: item.uuid,
                    childTable: [],
                }),
            );
            setProjectTableData(mappedRowData);
        }
    }, [projectLocationData]);
    useEffect(() => {
        if (warehouseData) {
            const mappedRowData: RowData[] = warehouseData.map((item: any) => ({
                area: item.area,
                position: `${item.rack} ${item.shelf}`,
                quantity: 0,
                description: item.description,
                bin: item.bin,
                childTable: [],
                locationId: item.uuid,
            }));
            setCompanyTableData(mappedRowData);
        }
    }, [warehouseData]);
    useEffect(() => {
        if (locationProductListData) {
            console.log('locationProductList: ', locationProductListData);
            setCompanyTableData([]);
            setProjectTableData([]);
            // find a way to map the locationProductListData to the companyTableData. Also use warehouse
            companyTableData.map((item: any) => {
                locationProductListData.map((locationProduct: any) => {
                    if (item.locationId === locationProduct?.location?.uuid) {
                        locationProduct?.product?.serialized
                            ? locationProduct?.product?.serializedProducts.map(
                                  (product: any) => {
                                      item?.childTable.push({
                                          item: locationProduct?.product?.name,
                                          serial_number: product?.number,
                                          bin: item?.bin,
                                          quantity: 1,
                                          po: 'Manually Added',
                                      });
                                  },
                              )
                            : item?.childTable?.push({
                                  item: locationProduct?.product?.name,
                                  serial_number: '',
                                  bin: item?.bin,
                                  quantity: locationProduct?.quantity,
                                  po: 'Manually Added',
                              });
                    }
                });
            });

            projectTableData.map((item: any) => {
                locationProductListData.map((locationProduct: any) => {
                    if (item.locationId === locationProduct?.location?.uuid) {
                        locationProduct?.product?.serialized
                            ? locationProduct?.product?.serializedProducts?.map(
                                  (product: any) => {
                                      item?.childTable.push({
                                          item: locationProduct?.product?.name,
                                          serial_number: product?.number,
                                          quantity: 1,
                                          po: 'Manually Added',
                                      });
                                  },
                              )
                            : item?.childTable?.push({
                                  item: locationProduct?.product?.name,
                                  serial_number: '',
                                  quantity: locationProduct?.quantity,
                                  po: 'Manually Added',
                              });
                    }
                });
            });

            // selectedLocationOption === 'Company Locations' ? setCompanyTableData(companyTableData) : setProjectTableData(projectTableData);
            setCompanyTableData(companyTableData);
            setProjectTableData(projectTableData);
        }
    }, [locationProductListData, companyTableData, projectTableData]);

    useEffect(() => {
        if (WarehouseLocationListData) {
            const formattedWarehouseData = WarehouseLocationListData.map(
                (item: any) => item.name,
            );
            // setWarehouseOptions(formattedWarehouseData);
            // give the list in label and values where label is the name and the uuid is the value
        }
    }, [WarehouseLocationListData]);
    useEffect(() => {
        if (warehouseListData) {
            setWarehouseOptionsAutocomplete(
                warehouseListData.map((item: any) => {
                    return { label: item.name, value: item.uuid };
                }),
            );
            setWarehouseOptions(
                warehouseListData.map((item: any) => {
                    return { label: item.name, value: item.uuid };
                }),
            );
            setCurrentInputOption('warehouse');
            // setSelectedWarehouseOptions({ label: warehouseListData[0].name, value: warehouseListData[0].uuid });
        }
    }, [warehouseListData]);
    useEffect(() => {
        if (newOptionAdded === 'area') {
            refetchAreaList();
            setNewOptionAdded('none');
        }
        if (areaListData) {
            setAreaOptionsAutocomplete(
                areaListData.map((item: any) => {
                    return { label: item.name, value: item.uuid };
                }),
            );
        }
    }, [areaListData, newOptionAdded, refetchAreaList]);
    useEffect(() => {
        if (newOptionAdded === 'rack') {
            refetchRackList();
            setNewOptionAdded('none');
        }
        if (rackListData) {
            setRackOptionsAutocomplete(
                rackListData.map((item: any) => {
                    return { label: item.name, value: item.uuid };
                }),
            );
            // setCurrentInputOption('rack');
            // setSelectedRackOptions({ label: rackListData[0].name, value: rackListData[0].uuid });
        }
    }, [rackListData, newOptionAdded, refetchRackList]);
    useEffect(() => {
        if (newOptionAdded === 'shelf') {
            refetchShelfList();
            setNewOptionAdded('none');
        }
        if (shelfListData) {
            setShelfOptionsAutocomplete(
                shelfListData.map((item: any) => {
                    return { label: item.name, value: item.uuid };
                }),
            );
            // setCurrentInputOption('shelf');
            // setSelectedShelfOptions({ label: shelfListData[0].name, value: shelfListData[0].uuid });
        }
    }, [shelfListData, newOptionAdded, refetchShelfList]);
    useEffect(() => {
        if (newOptionAdded === 'bin') {
            refetchBinList();
            setNewOptionAdded('none');
        }
        if (binListData) {
            setBinOptionsAutocomplete(
                binListData.map((item: any) => {
                    return { label: item.name, value: item.uuid };
                }),
            );
            // setCurrentInputOption('bin');
            // setSelectedBinOptions({ label: binListData[0].name, value: binListData[0].uuid });
        }
    }, [binListData, newOptionAdded, refetchBinList]);
    return (
        <>
            <Box
                component='main'
                sx={{ flexGrow: 1, padding: 3, overflow: 'hidden' }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            paddingLeft: '0rem',
                            backgroundColor: '#fff',
                        }}
                    >
                        <AutocompleteNew
                            options={[
                                'All Locations',
                                'ui_marketplaceminated Integration',
                            ]}
                            width='20%'
                            placeholder='Search for locations'
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                border: '1px solid #E0E0E0',
                                borderRadius: '8px',
                            }}
                        >
                            <ButtonGroup aria-label='Medium-sized button group'>
                                <StyledButton
                                    onClick={() =>
                                        handleSetLocationActiveButton('project')
                                    }
                                    style={{
                                        backgroundColor:
                                            locationActiveButton === 'project'
                                                ? '#C255D9'
                                                : 'transparent',
                                        color:
                                            locationActiveButton === 'project'
                                                ? 'white'
                                                : '#98A2B3',
                                        border:
                                            locationActiveButton === 'project'
                                                ? 'none'
                                                : 'initial',
                                    }}
                                >
                                    Project Location
                                </StyledButton>
                                <StyledButton
                                    onClick={() =>
                                        handleSetLocationActiveButton('company')
                                    }
                                    style={{
                                        backgroundColor:
                                            locationActiveButton === 'company'
                                                ? '#C255D9'
                                                : 'transparent',

                                        color:
                                            locationActiveButton === 'company'
                                                ? 'white'
                                                : '#98A2B3',
                                        border:
                                            locationActiveButton === 'company'
                                                ? 'none'
                                                : 'initial',
                                    }}
                                >
                                    Company Location
                                </StyledButton>
                                ,
                            </ButtonGroup>
                        </Box>
                        {locationActiveButton === 'company' && (
                            <ChevronRightIcon
                                sx={{ color: '#344054', opacity: '0.4' }}
                            />
                        )}
                        {locationActiveButton === 'company' && (
                            <SelectWarehouse
                                warehouseOptions={warehouseOptions}
                                handleOptionChange={handleWarehouseOptionChange}
                            />
                        )}

                        <Box
                            sx={{
                                display: 'flex',
                                flex: '1',
                                justifyContent: 'flex-end',
                                gap: '1rem',
                            }}
                        >
                            <Button
                                onClick={() => setOpenAddLocationModal(true)}
                                variant='contained'
                                startIcon={<AddCircleOutlineIcon />}
                                sx={{
                                    backgroundColor: '#C255D9',
                                    color: '#fff',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                }}
                            >
                                Add Location
                            </Button>
                            <Button
                                variant='outlined'
                                sx={{
                                    border: '1px solid #D0D5DD',
                                    padding: '0px',
                                }}
                            >
                                <ViewWeekOutlinedIcon
                                    sx={{
                                        color: '#344054',
                                    }}
                                />
                            </Button>
                        </Box>
                    </Box>
                    {locationActiveButton === 'project' && (
                        <>
                            {projectTableData === null ||
                            projectTableData.length === 0 ? (
                                <NoSelectNoDataComp
                                    mainText=' No Project Locations'
                                    helperText='There are no project locations data found to display.'
                                />
                            ) : (
                                <CollapsibleTable
                                    parentHeadCells={parentHeadCellsProject}
                                    childHeadCells={childHeadCellsProject}
                                    rows={projectTableData}
                                    isLoading={projectIsLoading}
                                    setRowId={setSelectedLocationId}
                                />
                            )}
                        </>
                    )}
                    {locationActiveButton === 'company' && (
                        <>
                            {selectedWarehouse === null && (
                                <NoSelectNoDataComp
                                    mainText=' No Warehouse Selected'
                                    helperText='Choose a warehouse from the drop-down above to
                                show more info.'
                                />
                            )}
                            {selectedWarehouse !== null && (
                                <>
                                    {companyTableData === null ||
                                    companyTableData.length === 0 ? (
                                        <NoSelectNoDataComp
                                            mainText=' No Warehouse Data'
                                            helperText='There are no warehouse data found to display.'
                                        />
                                    ) : (
                                        <CollapsibleTable
                                            parentHeadCells={parentHeadCells}
                                            childHeadCells={childHeadCells}
                                            rows={companyTableData}
                                            isLoading={warehouseDetailIsLoading}
                                            setRowId={setSelectedLocationId}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Box>
            {/* ADD LOCATION MODAL CONTENT */}
            <Box>
                <Modal
                    open={openAddLocationModal}
                    onClose={handleCloseAddLocationModal}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <Box sx={AddLocationModalStyle}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant='subtitle1'
                                sx={{ fontWeight: 600 }}
                            >
                                New Location
                            </Typography>

                            <Button
                                size='small'
                                sx={{ color: '#98A2B3' }}
                                onClick={() => setOpenAddLocationModal(false)}
                            >
                                <CloseIcon />
                            </Button>
                        </Box>
                        <Divider sx={{ marginY: '16px' }} />
                        <Box sx={{ width: '100%' }}>
                            <FormControl fullWidth>
                                <Box sx={{ mt: '14px' }}>
                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            color: '#344054',
                                            mb: '5px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Type
                                    </Typography>
                                    <DynamicSelect
                                        options={addLocationModalFieldOptions}
                                        selectedOption={selectedLocationOption}
                                        fieldValues={
                                            selectedLocationOption ===
                                            'Company Locations'
                                                ? locationFieldValues
                                                : locationFieldValuesProject
                                        }
                                        onOptionChange={
                                            handleLocationOptionChange
                                        }
                                        onFieldChange={
                                            handleLocationFieldChange
                                        }
                                        setOpenAddLocationModal={
                                            setOpenAddLocationModal
                                        }
                                        onSubmit={onSubmit}
                                        setCurrentInputOption={
                                            setCurrentInputOption
                                        }
                                    />
                                </Box>
                            </FormControl>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </>
    );
};
export default Locations;
