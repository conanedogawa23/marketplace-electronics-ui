import { LOGIN } from '@/common/page-paths';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Loading from '@/components/loading';

import { useAppDispatch, useAppSelector } from '../hooks';
import { authSelector, clearCredentials, setCredentials } from './slice';

interface AuthInitializerProps {
    children: React.ReactNode;
}

export const AuthInitializer: React.FC<AuthInitializerProps> = ({
    children,
}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, token, error } = useAppSelector(authSelector);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (storedToken && storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    dispatch(
                        setCredentials({
                            user: parsedUser,
                            token: storedToken,
                            rememberMe: true,
                        }),
                    );
                } catch (error) {
                    console.error('Failed to parse user data:', error);
                    dispatch(clearCredentials());
                    // Redirect to login page
                    router.push(LOGIN);
                }
            } else {
                dispatch(clearCredentials());
                router.push(LOGIN);
            }
            setIsLoading(false);
        };

        if (!user || !token || error) {
            initializeAuth();
        }
    }, [dispatch, error, router, token, user]);

    if (isLoading) {
        return <Loading />;
    }

    return <>{children}</>;
};
