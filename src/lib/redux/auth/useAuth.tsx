// authHooks.ts
import { INVENTORY, LOGIN } from '@/common/page-paths';
import { isAPIError } from '@/utils/fn';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
    authSelector,
    clearCredentials,
    setCredentials,
    setErrorMessage,
} from '@/lib/redux/auth/slice';

import { useLoginUserNewMutation } from '.';
import { useAppDispatch } from '../hooks';

export const useAuth = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        user: storedUser,
        token: storedToken,
        error,
    } = useSelector(authSelector);

    const [loginFn, loginContext] = useLoginUserNewMutation();

    const handleLogin = useCallback(
        async ({
            email,
            password,
            rememberMe,
        }: {
            email: string;
            password: string;
            rememberMe: boolean;
        }) => {
            try {
                const resultAction = await loginFn({
                    email,
                    password,
                }).unwrap();
                const { user, token } = resultAction;
                dispatch(setCredentials({ user, token, rememberMe }));
                router.push(INVENTORY); // Redirect to dashboard after login
            } catch (error) {
                if (isAPIError(error)) {
                    toast.error('Invalid email or password. Please try again.');
                    dispatch(setErrorMessage(error.message));
                }
            }
        },
        [dispatch, loginFn, router],
    );

    const handleLogout = useCallback(async () => {
        dispatch(clearCredentials());
        router.push(LOGIN);
    }, [dispatch, router]);

    return {
        user: storedUser,
        token: storedToken,
        login: handleLogin,
        logout: handleLogout,
        loginContext,
        error,
    };
};
