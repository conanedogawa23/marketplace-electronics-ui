export const STEPS = [
    'User Details & Password',
    'Company Permissions',
    'Project Permissions',
] as const;

export const STEP_FIELDS = [
    {
        id: 'Step 1',
        name: STEPS[0],
        fields: [
            'image',
            'department',
            'email',
            'employeeId',
            'firstName',
            'lastName',
            'phone',
            'password',
            'confirmPassword',
        ],
    },
    {
        id: 'Step 2',
        name: STEPS[1],
        fields: ['modules'],
    },
    // {
    //     id: 'Step 3',
    //     name: STEPS[2],
    //     fields: ['project'],
    // },
] as const;

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
];
