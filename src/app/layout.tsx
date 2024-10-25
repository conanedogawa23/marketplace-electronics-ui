'use client';

import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Sidebar } from '@/components/Sidebar/Sidebar';

import { Providers } from '@/lib/providers';

const bodyStyles: React.CSSProperties = {
    overflowY: 'hidden',
    height: '100%',
    margin: 0,
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='en'>
            <body style={bodyStyles}>
                <Providers>
                    <Box display={'flex'} height={'100vh'}>
                        <Sidebar />
                        {children}
                    </Box>
                    <ToastContainer
                        position='top-center'
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </Providers>
            </body>
        </html>
    );
}
