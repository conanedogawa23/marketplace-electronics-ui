'use client';

import { styled } from '@mui/material/styles';
import Image from 'next/image';

import SidebarLogoIcon from '../../../../public/assets/logoLight.png';

const StyledSidebarLogo = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(1),
    display: 'flex',
}));

function SidebarLogo() {
    return (
        <>
            <StyledSidebarLogo sx={{ padding: '0px 8px' }}>
                <Image
                    src={SidebarLogoIcon}
                    alt='Logo'
                    style={{
                        width: '100%',
                        maxWidth: '132px',
                    }}
                    height={30}
                />
            </StyledSidebarLogo>
        </>
    );
}

export default SidebarLogo;
