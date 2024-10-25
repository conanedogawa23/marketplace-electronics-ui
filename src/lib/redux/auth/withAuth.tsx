'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Loading from '@/components/loading';

import { useAuth } from './useAuth';

export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>,
) {
    return function WithAuth(props: P) {
        const { user } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!user) {
                router.push('/auth/login');
            }
        }, [user, router]);

        if (!user) {
            return <Loading />; // or a loading spinner
        }

        return <WrappedComponent {...props} />;
    };
}
