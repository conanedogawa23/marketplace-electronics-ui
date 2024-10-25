'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useGetUnAuthorizedProductDetailsQuery } from '@/lib/redux/inventory';

import Logo from '../../../../public/assets/logoLight.png';

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

interface ProductDetails {
    name: string;
    sku: string;
    price: string;
    type: string;
    description: string;
    imageUrl: string;
    serialized?: boolean;
    serialNumber?: string;
}

const ItemDetailsPage: React.FC = () => {
    const params = useParams();
    const [id, serialNo] = params.slugs as string[];
    console.log('id', id);
    console.log('serialNo', serialNo);

    const { data, error, isLoading } = useGetUnAuthorizedProductDetailsQuery({
        uuid: id,
    });
    const [productDetails, setProductDetails] = useState<ProductDetails | null>(
        null,
    );
    console.log('data', data);
    useEffect(() => {
        if (data) {
            setProductDetails({
                name: data.name,
                sku: data.sku,
                price: data.price?.cost,
                type: data.type,
                description: data.description,
                imageUrl: data.image?.url,
            });
        }
    }, [data]);
    return (
        <Container>
            <Box sx={{ mt: 6 }}>
                <Box sx={{ mb: 4 }}>
                    <Image src={Logo} alt='logo' width={200} />
                </Box>

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
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={productDetails?.imageUrl as string}
                                alt='product'
                                style={{
                                    objectFit: 'contain',
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
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
                                    {(productDetails && productDetails.name) ||
                                        'N/A'}
                                </StyledTypographyValue>
                            </Grid>
                            {['sku', 'price', 'type', 'description'].map(
                                (key, index) => (
                                    <Grid item xs={5} key={index}>
                                        <StyledTypographyLabel>
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </StyledTypographyLabel>
                                        <StyledTypographyValue>
                                            {productDetails &&
                                                productDetails[
                                                    key as keyof ProductDetails
                                                ]}
                                        </StyledTypographyValue>
                                    </Grid>
                                ),
                            )}
                        </Grid>
                        {serialNo && (
                            <Grid item xs={5}>
                                <StyledTypographyLabel>
                                    Serial Number
                                </StyledTypographyLabel>
                                <StyledTypographyValue>
                                    {serialNo}
                                </StyledTypographyValue>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};
export default ItemDetailsPage;
