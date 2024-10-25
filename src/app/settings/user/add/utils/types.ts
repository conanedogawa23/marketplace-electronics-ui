import { type z } from 'zod';

import { type AccessLevel } from '@/lib/redux/types';

import { type UserFormSchema } from './schema';

export type UserForm = z.infer<typeof UserFormSchema>;

// export type Step2Module = z.infer<typeof moduleSchema>;
export type Step2Module = {
    accessLevel: AccessLevel;
    name: string;
    permissions: {
        id?: string | false | undefined;
    }[];
};

export type Step2 = {
    modules: (Step2Module | { name: false })[];
};
