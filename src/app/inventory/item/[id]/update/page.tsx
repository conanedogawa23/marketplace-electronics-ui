'use client';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    FormControl,
    Grid,
    IconButton,
    Modal,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ItemVendor from '@/app/inventory/components/ItemVendor';
import AutocompleteWithAddOption from '@/app/inventory/components/vendor/AutocompleteAddDropdown';

// QUERIES AND MUTATIONS
import {
    useCreateCategoryMutation,
    useCreateManufacturerMutation,
    useCreateUomMutation,
    useGetCategoryListQuery,
    useGetManufacturerListQuery,
    useGetProductByUuidQuery,
    useGetUomListQuery,
    useUpdateProductMutation,
} from '@/lib/redux/inventory';
import { type AttachmentType } from '@/lib/redux/inventory/types';
import {
    useCreateVendorMutation,
    useCreateVendorProductMutation,
    useGetVendorListQuery,
    useGetVendorProductListQuery,
} from '@/lib/redux/vendor/getVendors';

import UploadImageIcon from '../../../../../../public/assets/upload-image-icon.png';
import AutocompleteSelectAndSearchOption from '../../../../../components/AutocompleteSelectAndSearchOption';
import PrintDownloadModal from '../../../components/createItem/PrintDownLoadModal';
import { FileIcon } from '../../../utils/fileIcon';
import { handleImageUpload } from '../../../utils/imageUpload';
// STYLES
import {
    StyledAttachmentBox,
    StyledFlexBox,
    StyledFlexBoxSpaceBetween,
    StyledHeaderTypography,
    StyledPurpleButton,
    StyledPurpleFullWidthButton,
    StyledPurpleOutlinedButton,
    StyledSelectedAttachmentBox,
    StyledTextfieLdSmall,
    StyledTypographyLabel,
    StyledWhiteButton,
} from '../../styles';
// TYPES
import {
    type OptionType,
    type OptionTypeAutocompleteProps,
    type VendorHeadCellsProps,
    type VendorRowProps,
} from '../../types';

const INVENTORY_ITEM = '/inventory/item';

interface FormDataType {
    name: string;
    uuid?: string;
    sku: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    description: string;
    attachments?: string[];
    image?: string;
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
}

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

const ItemUpdate: React.FC = () => {
    //    STATES
    const router = useRouter();
    const { id } = useParams();
    const searchParams = useSearchParams();
    const typeOfProduct = searchParams.get('type');
    const nameOfProduct = searchParams.get('name');
    const tableRef = useRef<HTMLDivElement>(null);
    const [selectedAttachmentFiles, setSelectedFiles] = useState<File[]>([]);
    const [attachmentLoading, setAttachmentLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [updateProductLoading, setUpdateProductLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageLink, setImageLink] = useState<string | null>('');
    const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
    const [attachmentUrls, setAttachmentUrls] = useState<string[]>([]);
    const [attachmentIds, setAttachmentIds] = useState<string[] | []>([]);
    const [attachments, setAttachments] = useState<AttachmentType[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [vendorRows, setVendorRows] = useState<VendorRowProps[]>([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [categories, setCategories] = useState<any[]>([]);
    const [manufacturers, setManufacturers] = useState<any[]>([]);
    const [uoms, setUoms] = useState<any[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [openPrintModal, setOpenPrintModal] = useState(false);
    const [categoryValue, setCategoryValue] = useState<OptionType>({
        label: '',
        value: '',
    });
    const [manufacturerValue, setManufacturerValue] = useState<OptionType>({
        label: '',
        value: '',
    });
    const [uomValue, setUomValue] = useState<OptionType>({
        label: '',
        value: '',
    });

    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        status: 'active',
    });
    const [newManufacturer, setNewManufacturer] = useState({
        name: '',
        description: '',
        status: 'active',
    });
    const [newUom, setNewUom] = useState({
        name: '',
        description: '',
    });

    const vendorHeadCells: VendorHeadCellsProps[] = [
        { id: 'vendor', label: 'Vendor', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'source', label: 'Source', minWidth: 100 },
        { id: 'price', label: 'Vendor Price', minWidth: 100 },
    ];
    // SELECTED ROWS STATE FOR VENDOR TABLE
    const [selected, setSelectedRows] = useState<(number | string)[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<
        OptionTypeAutocompleteProps[]
    >([]);
    const [manufacturerOptions, setManufacturerOptions] = useState<
        OptionTypeAutocompleteProps[]
    >([]);
    const [uomOptions, setUomOptions] = useState<OptionTypeAutocompleteProps[]>(
        [],
    );

    const [openAddVendorModal, setOpenAddVendorModal] = useState(false);
    const [vendorAutoCompleteOptions, setVendorAutoCompleteOptions] = useState<
        OptionTypeAutocompleteProps[]
    >([]);
    const [selectedVendor, setSelectedVendor] = useState<OptionType>({
        label: '',
        value: '',
    });
    const [selectedVendorPrice, setSelectedVendorPrice] = useState<number>(0);

    // QUERIES AND MUTATIONS
    const { data: productData, isLoading: isProductLoading } =
        useGetProductByUuidQuery({ uuid: id as string });
    const [searchCategoryQuery, setSearchCategoryQuery] = useState(' ');
    const { data: categoryData, isLoading: isCategoryLoading } =
        useGetCategoryListQuery(
            searchCategoryQuery
                ? { filters: { name: searchCategoryQuery } }
                : {},
        );
    const [searchManufacturerQuery, setSearchManufacturerQuery] = useState('');
    const { data: manufacturerData, isLoading: isManufacturerLoading } =
        useGetManufacturerListQuery(
            searchManufacturerQuery
                ? { filters: { name: searchManufacturerQuery } }
                : {},
        );
    const [searchUomQuery, setSearchUomQuery] = useState('');
    const { data: uomData, isLoading: isUomLoading } = useGetUomListQuery(
        searchUomQuery ? { filters: { name: searchUomQuery } } : {},
    );
    const { data: vendorData, isLoading: isVendorLoading } =
        useGetVendorListQuery();
    const { data: vendorProductData, isLoading: isVendorProductLoading } =
        useGetVendorProductListQuery({ filters: { product: id as string } });

    const [createCategory] = useCreateCategoryMutation();
    const [createManufacturer] = useCreateManufacturerMutation();
    const [createUom] = useCreateUomMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [createVendorProduct] = useCreateVendorProductMutation();
    const [createVendor] = useCreateVendorMutation();

    const handleFetchData = async (page_number: number) => {
        console.log('Fetching data', page_number);
    };
    // FORM DATA STATES
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        uuid: '',
        sku: '',
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
        description: '',
        attachments: [],
        image: '',
        price: {
            msrp: 0,
            mapp: 0,
            cost: 0,
            sell: 0,
            shippingCost: 0,
            shippingSell: 0,
        },
        quantity: 0,
        tags: [],
        status: 'active',
        minQuantity: 0,
        maxQuantity: 0,
        notes: '',
    });

    // HANDLERS
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handlePriceChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            price: {
                ...prevData.price,
                [name]: value,
            },
        }));
    };
    const handleImageFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setImageLoading(true);
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            const imageLink = await handleImageUpload(selectedFile);
            if (imageLink) {
                setImageLink(imageLink[0]);
                setImageFile(selectedFile);
                setImagePreview(URL.createObjectURL(selectedFile));
                setImageUrl(URL.createObjectURL(selectedFile));
                toast.success('Image uploaded successfully');
                setImageLoading(false);
            }
        }
    };
    const handleRemoveImage = (event: any) => {
        event.stopPropagation();
        setImageLink('');
        setImageFile(null);
        setImagePreview(null);
        setImagePreview(null);
    };
    const handleImageUploadDragOver = (
        event: React.DragEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = 'copy';
    };
    const handleImageUploadDrop = async (
        event: React.DragEvent<HTMLDivElement>,
    ) => {
        const droppedFile = event.dataTransfer.files[0];
        const imageLink = await handleImageUpload(droppedFile);
        if (imageLink) {
            setImageLink(imageLink[0]);
            setImageFile(droppedFile);
            setImagePreview(URL.createObjectURL(droppedFile));
            setImageUrl(URL.createObjectURL(droppedFile));
            toast.success('Image uploaded successfully');
            setImageLoading(false);
        }
    };
    const handleBackClick = () => {
        router.back();
    };
    const handleOpenPrintModal = () => {
        setOpenPrintModal(true);
    };
    const handleAddCategory = async (
        fieldName: string,
        description: string,
    ) => {
        try {
            const response = await createCategory({
                category: {
                    name: fieldName,
                    description,
                    status: 'active',
                },
            }).unwrap();
            if (response) {
                setCategoryValue({
                    label: response.name,
                    value: response.uuid,
                });
                setCategories([...categories, response]);
                setNewCategory({ name: '', description: '', status: 'active' });
                toast.success('Category added successfully');
            }
        } catch (error) {
            toast.error('Error adding category');
        }
    };
    const handleAddManufacturer = async (
        fieldName: string,
        description: string,
    ) => {
        try {
            const response = await createManufacturer({
                manufacturer: {
                    name: fieldName,
                    description,
                    status: 'active',
                },
            }).unwrap();
            if (response) {
                setManufacturerValue({
                    label: response.name,
                    value: response.uuid,
                });
                setManufacturers([...manufacturers, response]);
                setNewManufacturer({
                    name: '',
                    description: '',
                    status: 'active',
                });
                toast.success('Manufacturer added successfully');
            }
        } catch (error) {
            toast.error('Error adding manufacturer');
        }
    };

    const handleAddUom = async (fieldName: string, description: string) => {
        try {
            const response = await createUom({
                uom: {
                    name: fieldName,
                    description: description,
                },
            }).unwrap();
            if (response) {
                setUomValue({ label: response.name, value: response.uuid });
                setUoms([...uoms, response]);
                setNewUom({ name: '', description: '' });
                toast.success('Unit of measure added successfully');
            }
        } catch (error) {
            toast.error('Error adding unit of measure');
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex);
    };
    const handleDeleteTag = (tagToDelete: string) => () => {
        setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
    };
    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };
    const handleAttachmentUpload = async (file: File) => {
        setAttachmentLoading(true);
        try {
            const updatedAttachmentIds = await handleImageUpload(file);
            if (updatedAttachmentIds) {
                setAttachmentIds([...attachmentIds, updatedAttachmentIds[0]]);
                setAttachmentFiles([...attachmentFiles, file]);
                setAttachmentUrls([
                    ...attachmentUrls,
                    URL.createObjectURL(file),
                ]);
                setSelectedFiles((prevFiles) => [...prevFiles, file]);
                toast.success('Attachment uploaded successfully');
                setAttachmentLoading(false);
            }
        } catch (error) {
            toast.error('Error uploading attachment');
            setAttachmentLoading(false);
        } finally {
            setAttachmentLoading(false);
        }
    };
    const handleAttachmentDelete = (index: number) => {
        const newAttachmentFiles = attachmentFiles.filter(
            (_, i) => i !== index,
        );
        const newAttachmentUrls = attachmentUrls.filter((_, i) => i !== index);
        const newAttachmentIds = attachmentIds.filter((_, i) => i !== index);
        setAttachmentFiles(newAttachmentFiles);
        setAttachmentUrls(newAttachmentUrls);
        setAttachmentIds(newAttachmentIds);
        setSelectedFiles((prevFiles) =>
            prevFiles.filter((_, i) => i !== index),
        );
    };
    const handleExistingAttachmentDelete = (index: number) => {
        const newAttachments = attachments.filter((_, i) => i !== index);
        setAttachments(newAttachments);
        setAttachmentIds(newAttachments.map((attachment) => attachment.uuid));
    };

    const handleAddVendor = async (
        name: string,
        email: string,
        source: string,
    ) => {
        try {
            const response: any = await createVendor({
                vendor: {
                    name: name,
                    source: source,
                    email: email,
                },
            }).unwrap();

            if (response) {
                console.log('response', response);
                setSelectedVendor({
                    label: response.vendorCreate.name,
                    value: response.vendorCreate.uuid,
                });
                setVendorAutoCompleteOptions([
                    ...vendorAutoCompleteOptions,
                    {
                        label: response.vendorCreate.name,
                        value: response.vendorCreate.uuid,
                    },
                ]);
                toast.success('Vendor added successfully');
            }
        } catch (error) {
            toast.error('Error adding vendor');
        }
    };

    const handleAddVendorProduct = async () => {
        console.log('selectedVendor', selectedVendor);
        try {
            const response = await createVendorProduct({
                vendorProduct: {
                    vendor: selectedVendor.value,
                    product: id as string,
                    price: selectedVendorPrice as number,
                },
            }).unwrap();
            if (response) {
                toast.success('VendorProduct added successfully');
            }
            setOpenAddVendorModal(false);
            setSelectedVendor({ label: '', value: '' });
            setSelectedVendorPrice(0);
        } catch (error) {
            toast.error('Error adding manufacturer');
        }
    };

    useEffect(() => {
        if (categoryData) {
            setCategoryOptions(
                categoryData.categories.map((category: any) => ({
                    label: category.name,
                    value: category.uuid,
                })),
            );
        }
        if (manufacturerData) {
            setManufacturerOptions(
                manufacturerData.manufacturer.map((manufacturer: any) => ({
                    label: manufacturer.name,
                    value: manufacturer.uuid,
                })),
            );
        }
        if (uomData) {
            setUomOptions(
                uomData.uoms.map((uom: any) => ({
                    label: uom.name,
                    value: uom.uuid,
                })),
            );
        }
        if (vendorData) {
            setVendorAutoCompleteOptions(
                vendorData.map((vendor: any) => ({
                    label: vendor.name,
                    value: vendor.uuid,
                })),
            );
        }
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
            setCategoryValue({
                label: productData?.category?.name || '',
                value: productData?.category?.uuid || '',
            });
            setManufacturerValue({
                label: productData?.manufacturer?.name || '',
                value: productData?.manufacturer?.uuid || '',
            });
            setUomValue({
                label: productData?.uom?.name || '',
                value: productData?.uom?.uuid || '',
            });
            setAttachmentIds(
                productData?.attachments?.map(
                    (attachment: AttachmentType) => attachment.uuid,
                ) || [],
            );
            setAttachments(productData?.attachments || []);
            setImagePreview(productData?.image?.url as string);
            setTags(productData.tags);
            setFormData({
                uuid: productData.uuid,
                name: productData.name,
                image: productData?.image?.url,
                sku: productData.sku,
                length: productData.length,
                width: productData.width,
                height: productData.height,
                weight: productData.weight,
                description: productData.description,
                price: {
                    msrp: productData.price.msrp,
                    mapp: productData.price.mapp,
                    cost: productData.price.cost,
                    sell: productData.price.sell,
                    shippingCost: productData.price.shippingCost,
                    shippingSell: productData.price.shippingSell,
                },
                quantity: productData.quantity,
                tags: tags,
                status: productData.status,
                minQuantity: productData.minQuantity,
                maxQuantity: productData.maxQuantity,
                notes: productData.notes,
            });
        }
    }, [
        categoryData,
        manufacturerData,
        uomData,
        vendorProductData,
        productData,
    ]);
    console.log('formData', formData);
    // MAIN FORM SUBMIT HANDLER
    const handleFormSubmit = async () => {
        try {
            setUpdateProductLoading(true);
            const response = await updateProduct({
                product: {
                    uuid: formData.uuid,
                    name: formData.name,
                    sku: formData.sku,
                    category: categoryValue.value,
                    manufacturer: manufacturerValue.value,
                    uom: uomValue.value,
                    image: imageLink || '',
                    attachments: attachmentIds,
                    length: parseFloat(formData?.length?.toString()),
                    width: parseFloat(formData?.width?.toString()),
                    height: parseFloat(formData?.height?.toString()),
                    weight: parseFloat(formData?.weight?.toString()),
                    description: formData.description,
                    quantity: parseFloat(formData?.quantity?.toString()),
                    tags: tags,
                    status: formData.status,
                    minQuantity: parseFloat(formData?.minQuantity?.toString()),
                    maxQuantity: parseFloat(formData?.maxQuantity?.toString()),
                    notes: formData.notes,
                    type: typeOfProduct as string,
                    vendors: vendorRows.map((vendor) => ({
                        id: vendor.id,
                        price: vendor.price,
                    })),
                },
            });
            if (response.data) {
                // const itemUuid = response.data?.uuid;
                toast.success('Product updated successfully');
                router.push(`${INVENTORY_ITEM}/${id as string}/details`);
                setUpdateProductLoading(false);
            }
        } catch (error) {
            toast.error('Error updating product');
            setUpdateProductLoading(false);
        }
    };

    return (
        <Box
            sx={{
                padding: '24px',
                width: '100%',
            }}
        >
            <StyledFlexBoxSpaceBetween
                sx={{ width: '100%', paddingBottom: '20px' }}
            >
                <StyledFlexBox>
                    <StyledWhiteButton
                        onClick={handleBackClick}
                        variant='outlined'
                        startIcon={<ArrowBackIcon />}
                    >
                        Back
                    </StyledWhiteButton>
                    <Box>
                        <StyledHeaderTypography variant='h5'>
                            {nameOfProduct}
                        </StyledHeaderTypography>
                        <Typography variant='caption'>
                            {typeOfProduct}
                        </Typography>
                    </Box>
                </StyledFlexBox>
                <StyledFlexBox>
                    <StyledPurpleOutlinedButton
                        onClick={handleOpenPrintModal}
                        startIcon={<PrintIcon />}
                    >
                        Print
                    </StyledPurpleOutlinedButton>
                    <StyledPurpleButton
                        variant='contained'
                        onClick={handleFormSubmit}
                    >
                        Save
                    </StyledPurpleButton>
                </StyledFlexBox>
            </StyledFlexBoxSpaceBetween>
            <PrintDownloadModal
                open={openPrintModal}
                setOpen={setOpenPrintModal}
                headerTypographyContent='Print'
                productData={{
                    name: productData?.name || 'N/A',
                    uuid: productData?.uuid || 'N/A',
                    sku: productData?.sku || 'N/A',
                }}
                typeOfProduct={typeOfProduct as string}
            />
            <Divider />
            {updateProductLoading ? (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '90vh',
                    }}
                >
                    <CircularProgress color='secondary' />
                </Box>
            ) : (
                <Box
                    sx={{
                        height: '90vh',
                        overflow: 'scroll',
                        width: '100%',
                        paddingBottom: '24px',
                    }}
                >
                    <Container disableGutters>
                        <Box sx={{ marginTop: '40px' }}>
                            <Grid container spacing={6}>
                                <Grid item xs={12} md={4}>
                                    <StyledTypographyLabel>
                                        Product Image
                                    </StyledTypographyLabel>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '350px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            border: '1px solid #EAECF0',
                                            borderRadius: '8px',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                            overflow: 'hidden',
                                        }}
                                        onDragOver={handleImageUploadDragOver}
                                        onDrop={handleImageUploadDrop}
                                        onClick={() =>
                                            document
                                                .getElementById('fileInput')
                                                ?.click()
                                        }
                                    >
                                        <input
                                            type='file'
                                            id='fileInput'
                                            style={{ display: 'none' }}
                                            onChange={handleImageFileUpload}
                                        />

                                        {imagePreview ? (
                                            <>
                                                {imageLoading ? (
                                                    <CircularProgress color='secondary' />
                                                ) : (
                                                    <>
                                                        <img
                                                            src={imagePreview}
                                                            alt='Selected'
                                                            style={{
                                                                maxWidth:
                                                                    '100%',
                                                                maxHeight:
                                                                    '100%',
                                                                objectFit:
                                                                    'cover',
                                                            }}
                                                        />
                                                        <IconButton
                                                            aria-label='remove image'
                                                            onClick={
                                                                handleRemoveImage
                                                            }
                                                            sx={{
                                                                position:
                                                                    'absolute',
                                                                top: '5px',
                                                                right: '5px',
                                                                backgroundColor:
                                                                    'white',
                                                                '&:hover': {
                                                                    backgroundColor:
                                                                        '#AB41C2',
                                                                    color: 'white',
                                                                },
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {imageLoading ? (
                                                    <CircularProgress color='secondary' />
                                                ) : (
                                                    <>
                                                        <Image
                                                            src={
                                                                UploadImageIcon
                                                            }
                                                            alt='Upload Image'
                                                        />
                                                        <Typography align='center'>
                                                            <span
                                                                style={{
                                                                    color: '#6941C6',
                                                                    fontWeight:
                                                                        '600',
                                                                    marginRight:
                                                                        '4px',
                                                                }}
                                                            >
                                                                Click to upload
                                                            </span>
                                                            or drag and drop
                                                        </Typography>
                                                        <Typography
                                                            variant='subtitle2'
                                                            display='block'
                                                            align='center'
                                                        >
                                                            Max size: 1MB (PNG,
                                                            JPG, JPEG)
                                                        </Typography>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <Grid
                                        container
                                        direction='row'
                                        justifyContent={'space-between'}
                                        spacing={1}
                                    >
                                        <Grid item xs={12}>
                                            <StyledTypographyLabel>
                                                Product Name
                                            </StyledTypographyLabel>
                                            <StyledTextfieLdSmall
                                                name='name'
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <StyledTypographyLabel>
                                                SKU
                                            </StyledTypographyLabel>
                                            <StyledTextfieLdSmall
                                                name='sku'
                                                value={formData.sku}
                                                onChange={handleInputChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <StyledTypographyLabel>
                                                Category
                                            </StyledTypographyLabel>
                                            <AutocompleteSelectAndSearchOption
                                                addButtonLabel='Category'
                                                placeholder='Search or Select'
                                                autoCompleteOptions={
                                                    categoryOptions
                                                }
                                                shouldRenderAddNewOption={true}
                                                handleAddNewOption={
                                                    handleAddCategory
                                                }
                                                setFieldValue={setCategoryValue}
                                                fieldValue={categoryValue}
                                                setSearchQuery={
                                                    setSearchCategoryQuery
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={5}>
                                            <StyledTypographyLabel>
                                                Manufacturer
                                            </StyledTypographyLabel>
                                            <AutocompleteSelectAndSearchOption
                                                addButtonLabel='Manufacturer '
                                                placeholder='Search or Select'
                                                autoCompleteOptions={
                                                    manufacturerOptions
                                                }
                                                shouldRenderAddNewOption={true}
                                                handleAddNewOption={
                                                    handleAddManufacturer
                                                }
                                                setFieldValue={
                                                    setManufacturerValue
                                                }
                                                fieldValue={manufacturerValue}
                                                setSearchQuery={
                                                    setSearchManufacturerQuery
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={5}>
                                            <StyledTypographyLabel>
                                                Unit of Measure
                                            </StyledTypographyLabel>
                                            <AutocompleteSelectAndSearchOption
                                                addButtonLabel='Unit of Measure'
                                                placeholder='Search or Select'
                                                shouldRenderAddNewOption={true}
                                                autoCompleteOptions={uomOptions}
                                                handleAddNewOption={
                                                    handleAddUom
                                                }
                                                setFieldValue={setUomValue}
                                                fieldValue={uomValue}
                                                setSearchQuery={
                                                    setSearchUomQuery
                                                }
                                            />
                                        </Grid>

                                        {[
                                            {
                                                label: 'Length',
                                                name: 'length',
                                                value: formData.length,
                                            },
                                            {
                                                label: 'Width',
                                                name: 'width',
                                                value: formData.width,
                                            },
                                            {
                                                label: 'Height',
                                                name: 'height',
                                                value: formData.height,
                                            },
                                            {
                                                label: 'Weight',
                                                name: 'weight',
                                                value: formData.weight,
                                            },
                                        ].map((item, index) => (
                                            <Grid
                                                key={index}
                                                item
                                                xs={6}
                                                md={5}
                                            >
                                                <StyledTypographyLabel>
                                                    {item.label}
                                                </StyledTypographyLabel>
                                                <StyledTextfieLdSmall
                                                    name={item.name}
                                                    value={item.value}
                                                    onChange={handleInputChange}
                                                    fullWidth
                                                    type='number'
                                                    inputProps={{ min: 0 }}
                                                />
                                            </Grid>
                                        ))}
                                        <Grid item xs={12}>
                                            <StyledTypographyLabel>
                                                Tags
                                            </StyledTypographyLabel>
                                            <Box
                                                display='flex'
                                                alignItems='center'
                                                border='1px solid #D0D5DD'
                                                borderRadius='8px'
                                                padding='4px'
                                                minHeight='35px'
                                                flexWrap='wrap'
                                            >
                                                {tags.map((tag) => (
                                                    <Chip
                                                        key={tag}
                                                        label={tag}
                                                        onDelete={handleDeleteTag(
                                                            tag,
                                                        )}
                                                        sx={{
                                                            marginRight: '4px',
                                                            marginTop: '4px',
                                                            paddingX: '8px',
                                                        }}
                                                    />
                                                ))}
                                                <input
                                                    value={tagInput}
                                                    onChange={(e) =>
                                                        setTagInput(
                                                            e.target.value,
                                                        )
                                                    }
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleAddTag();
                                                        }
                                                    }}
                                                    style={{
                                                        border: 'none',
                                                        outline: 'none',
                                                        flex: 1,
                                                        backgroundColor:
                                                            'transparent',
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 5 }}>
                                <StyledTypographyLabel>
                                    Description
                                </StyledTypographyLabel>
                                <textarea
                                    name='description'
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '99%',
                                        height: '100px',
                                        border: '1px solid #D0D5DD',
                                        borderRadius: '8px',
                                        padding: '8px',
                                        fontSize: '16px',
                                        backgroundColor: 'white',
                                    }}
                                />
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
                            </Tabs>
                            {tabIndex === 0 && (
                                <Box>
                                    <Grid
                                        container
                                        spacing={2}
                                        style={{ marginTop: '8px' }}
                                        justifyContent='space-between'
                                    >
                                        <Grid item xs={12} sm={5}>
                                            <Typography
                                                variant='h6'
                                                sx={{ fontWeight: '500' }}
                                            >
                                                Reorder
                                            </Typography>
                                            <Grid container spacing={1}>
                                                <Grid item xs={5}>
                                                    <StyledTypographyLabel>
                                                        Minimum Quantity
                                                    </StyledTypographyLabel>
                                                    <StyledTextfieLdSmall
                                                        name='minQuantity'
                                                        value={
                                                            formData.minQuantity
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        fullWidth
                                                        type='number'
                                                        inputProps={{ min: 0 }}
                                                    />
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <StyledTypographyLabel>
                                                        Maximum Quantity
                                                    </StyledTypographyLabel>
                                                    <StyledTextfieLdSmall
                                                        fullWidth
                                                        type='number'
                                                        inputProps={{ min: 0 }}
                                                        name='maxQuantity'
                                                        value={
                                                            formData.maxQuantity
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={5}>
                                            <Typography
                                                variant='h6'
                                                sx={{ fontWeight: '500' }}
                                            >
                                                Pricing and Cost
                                            </Typography>
                                            {[
                                                {
                                                    label: 'MSRP',
                                                    name: 'msrp',
                                                    value: formData.price.msrp,
                                                },
                                                {
                                                    label: 'MAPP',
                                                    name: 'mapp',
                                                    value: formData.price.mapp,
                                                },
                                                {
                                                    label: 'Cost',
                                                    name: 'cost',
                                                    value: formData.price.cost,
                                                },
                                                {
                                                    label: 'Sell Price',
                                                    name: 'sell',
                                                    value: formData.price.sell,
                                                },
                                                {
                                                    label: 'Shipping Cost',
                                                    name: 'shippingCost',
                                                    value: formData.price
                                                        .shippingCost,
                                                },
                                                {
                                                    label: 'Shipping Sell Price',
                                                    name: 'shippingSell',
                                                    value: formData.price
                                                        .shippingSell,
                                                },
                                            ].map((item, index) => (
                                                <Grid item key={index} xs={12}>
                                                    <StyledTypographyLabel>
                                                        {item.label}
                                                    </StyledTypographyLabel>
                                                    <StyledTextfieLdSmall
                                                        name={item.name}
                                                        value={item.value}
                                                        onChange={
                                                            handlePriceChange
                                                        }
                                                        fullWidth
                                                        type='number'
                                                        inputProps={{ min: 0 }}
                                                    />
                                                </Grid>
                                            ))}
                                            <StyledTypographyLabel>
                                                Notes
                                            </StyledTypographyLabel>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <textarea
                                                        name='notes'
                                                        value={formData.notes}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        style={{
                                                            height: '100px',
                                                            backgroundColor:
                                                                'white',
                                                            border: '1px solid #D0D5DD',
                                                            borderRadius: '8px',
                                                            width: '100%',
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}

                            {tabIndex === 1 && (
                                <Box>
                                    <Box sx={{ mt: 3 }}>
                                        <StyledPurpleFullWidthButton
                                            startIcon={<AddCircleOutlineIcon />}
                                            onClick={() =>
                                                setOpenAddVendorModal(true)
                                            }
                                        >
                                            Add Vendor
                                        </StyledPurpleFullWidthButton>
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
                                            isVendorLoading={
                                                isVendorProductLoading
                                            }
                                            setSelectedRows={setSelectedRows}
                                            handleFetchData={handleFetchData}
                                            tableRef={tableRef}
                                        />
                                    </Box>
                                </Box>
                            )}

                            {tabIndex === 2 && (
                                <Box sx={{ width: '100%' }}>
                                    <Typography
                                        variant='h6'
                                        style={{ marginTop: '8px' }}
                                    >
                                        Attachments
                                    </Typography>
                                    <StyledAttachmentBox>
                                        <input
                                            ref={fileInputRef}
                                            type='file'
                                            id='fileInput'
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                opacity: 0,
                                                position: 'absolute',
                                                cursor: 'pointer',
                                            }}
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    handleAttachmentUpload(
                                                        e.target.files[0],
                                                    );
                                                }
                                            }}
                                        />
                                        {attachmentLoading ? (
                                            <CircularProgress color='secondary' />
                                        ) : (
                                            <>
                                                <Image
                                                    src={UploadImageIcon}
                                                    alt='Upload Image'
                                                />
                                                <Typography align='center'>
                                                    <span
                                                        style={{
                                                            color: '#6941C6',
                                                            fontWeight: '600',
                                                            marginRight: '4px',
                                                        }}
                                                    >
                                                        Click to upload
                                                    </span>
                                                    or drag and drop
                                                </Typography>
                                                <Typography
                                                    variant='subtitle2'
                                                    display='block'
                                                    align='center'
                                                >
                                                    Max size: 1MB (PNG, JPG,
                                                    JPEG)
                                                </Typography>
                                            </>
                                        )}
                                    </StyledAttachmentBox>

                                    <Box
                                        sx={{
                                            mt: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            border: '1px solid #EAECF0',
                                            borderRadius: '8px',
                                            padding: '10px',
                                            paddingY: '16px',
                                        }}
                                    >
                                        {attachments.map(
                                            (attachment, index) => (
                                                <StyledSelectedAttachmentBox
                                                    key={index}
                                                >
                                                    <StyledFlexBox>
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
                                                    </StyledFlexBox>
                                                    <IconButton
                                                        aria-label='remove file'
                                                        onClick={() =>
                                                            handleAttachmentDelete(
                                                                index,
                                                            )
                                                        }
                                                        sx={{
                                                            backgroundColor:
                                                                'white',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    '#AB41C2',
                                                                color: 'white',
                                                            },
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </StyledSelectedAttachmentBox>
                                            ),
                                        )}
                                        {selectedAttachmentFiles.map(
                                            (file, index) => (
                                                <StyledSelectedAttachmentBox
                                                    key={index}
                                                >
                                                    <StyledFlexBox>
                                                        {
                                                            <FileIcon
                                                                file={file}
                                                            />
                                                        }
                                                        <Typography
                                                            variant='subtitle1'
                                                            sx={{
                                                                fontWeight:
                                                                    '500',
                                                                opacity: 0.8,
                                                            }}
                                                        >
                                                            {file.name}
                                                        </Typography>
                                                    </StyledFlexBox>

                                                    <IconButton
                                                        aria-label='remove file'
                                                        onClick={() =>
                                                            handleAttachmentDelete(
                                                                index,
                                                            )
                                                        }
                                                        sx={{
                                                            backgroundColor:
                                                                'white',
                                                            '&:hover': {
                                                                backgroundColor:
                                                                    '#AB41C2',
                                                                color: 'white',
                                                            },
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </StyledSelectedAttachmentBox>
                                            ),
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Container>
                    <Modal
                        open={openAddVendorModal}
                        onClose={() => setOpenAddVendorModal(false)}
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
                                    New Vendor
                                </Typography>

                                <Button
                                    size='small'
                                    sx={{ color: '#98A2B3' }}
                                    onClick={() => setOpenAddVendorModal(false)}
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
                                            Vendor
                                        </Typography>
                                        <AutocompleteWithAddOption
                                            type='vendor'
                                            autoCompleteOptions={
                                                vendorAutoCompleteOptions
                                            }
                                            handleAddItemDetails={
                                                handleAddVendor
                                            }
                                            setFieldValue={setSelectedVendor}
                                            fieldValue={selectedVendor}
                                            parentType='vendor'
                                            disabled={false}
                                            setCurrentInputOption={() => {
                                                /* do nothing */
                                            }}
                                        />
                                        <Typography
                                            variant='subtitle1'
                                            sx={{
                                                color: '#344054',
                                                mb: '5px',
                                                mt: '10px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            Price
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            type='number'
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    padding: '10px 20px',
                                                    borderRadius: '8px',
                                                },
                                            }}
                                            value={selectedVendorPrice}
                                            onChange={(e) =>
                                                setSelectedVendorPrice(
                                                    parseInt(e.target.value),
                                                )
                                            }
                                            // error={!!errors[field.key]}
                                            // helperText={errors[field.key]}
                                        />
                                        <Divider sx={{ marginY: '16px' }} />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',
                                                gap: '10px',
                                            }}
                                        >
                                            <Button
                                                onClick={() =>
                                                    setOpenAddVendorModal(false)
                                                }
                                                sx={{
                                                    paddingX: '14px',
                                                    borderRadius: '6px',
                                                    backgroundColor: 'white',
                                                    color: '#344054',
                                                    border: '1px solid #D0D5DD',
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleAddVendorProduct}
                                                variant='contained'
                                                sx={{
                                                    paddingX: '14px',
                                                    borderRadius: '6px',
                                                    backgroundColor: '#AB41C2',
                                                    color: '#FFFFFF',
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Apply
                                            </Button>
                                        </Box>
                                    </Box>
                                </FormControl>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            )}
        </Box>
    );
};

export default ItemUpdate;
