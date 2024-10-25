import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

export type PODetailsHeaderProps = {
    image: string;
    name: string;
    projectName: string;
    notes: string;
};

export const PODetailsHeader: React.FC<PODetailsHeaderProps> = ({
    image,
    name,
    projectName,
    notes,
}) => {
    return (
        <Stack
            p={'20px 24px'}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
                {image && <Image src={image} alt={name} width={80} />}
                <Box>
                    <Typography fontSize={30} fontWeight={500}>
                        {name}
                    </Typography>
                    <Typography color={'#667085'} fontWeight={600}>
                        {projectName}
                    </Typography>
                </Box>
            </Stack>
            <Stack borderLeft={'1px solid #EAECF0'} paddingLeft={'20px'}>
                <Typography color={'#667085'} lineHeight={'2.5rem'}>
                    Receiving notes
                </Typography>
                <Typography fontSize={'18px'} fontWeight={500}>
                    {notes}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default PODetailsHeader;
