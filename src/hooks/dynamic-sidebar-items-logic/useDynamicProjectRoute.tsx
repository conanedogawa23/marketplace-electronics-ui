import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const useDynamicProjectRoute = () => {
    const router = usePathname();

    const dynamicProjectRoute = /^\/projects\/projects\/[^/]+/;
    const dynamicProjectRouteMatch = router.match(dynamicProjectRoute);
    let dynamicPartOfProjectRoute = '';

    if (dynamicProjectRouteMatch) {
        dynamicPartOfProjectRoute = dynamicProjectRouteMatch[0].split('/')[3];
    }

    const isDynamicProjectRoute = dynamicProjectRoute.test(router);

    const dynamicProjectItems = useMemo(() => {
        if (!isDynamicProjectRoute) return null;
        return [
            {
                title: 'Overview',
                icon: 'Dashboard',
                href: `/projects/projects/${dynamicPartOfProjectRoute}/overview`,
            },
            // {
            //     title: 'Purchasing',
            //     icon: 'ShoppingCart',
            //     href: `/projects/projects/${dynamicPartOfProjectRoute}/purchasing`,
            // },
            {
                title: 'Stocks',
                icon: 'TrendingUp',
                href: `/projects/projects/${dynamicPartOfProjectRoute}/stocks`,
            },
            {
                title: 'Allocations',
                icon: 'Description',
                href: `/projects/projects/${dynamicPartOfProjectRoute}/allocations`,
            },
        ];
    }, [dynamicPartOfProjectRoute, isDynamicProjectRoute]);

    return { dynamicProjectItems, isDynamicProjectRoute };
};
