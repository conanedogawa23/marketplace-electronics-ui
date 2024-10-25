'use client';

import { z } from 'zod';

import { AccessLevel } from '@/lib/redux/types';

export const permissionSchema = z.object({
    id: z
        .string({
            message: 'Please select a Permission',
        })
        .or(z.literal(false))
        .optional(),
});

export const moduleSchema = z
    .object({
        accessLevel: z.nativeEnum(AccessLevel).optional(),
        name: z.string().or(z.literal(false)),
        permissions: z.array(permissionSchema).optional().default([]),
    })
    .refine(
        (value) => {
            return !value.name || !!value.accessLevel;
        },
        {
            message: 'Please select access level',
        },
    );

export const UserFormSchema = z
    .object({
        // Step 1
        image: z.string().min(1, 'Image is required'),
        firstName: z.string().trim().min(3, {
            message: 'First name must be at least 3 characters long',
        }),
        lastName: z.string().trim().min(3, {
            message: 'Last name must be at least 3 characters long',
        }),
        department: z.string().refine((val) => val !== 'none', {
            message: 'Please select a department',
        }),
        employeeId: z.string().trim().min(3, {
            message: 'Employee ID must be at least 3 characters long',
        }),
        email: z.string().email('Invalid email address'),
        phone: z
            .string()
            .min(10, {
                message: 'Phone number must be at least 10 characters long',
            })
            .regex(new RegExp('^\\+?[1-9]\\d{1,14}$'), {
                message: 'Invalid phone number',
            }),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .regex(
                /[a-z]/,
                'Password must contain at least one lowercase letter',
            )
            .regex(
                /[A-Z]/,
                'Password must contain at least one uppercase letter',
            )
            .regex(/[0-9]/, 'Password must contain at least one digit')
            .regex(
                /[^a-zA-Z0-9]/,
                'Password must contain at least one special character',
            ),
        confirmPassword: z.string(),
        // Step 2
        modules: z.array(moduleSchema).optional().default([]),
        // Step 3
        projectPermissions: z
            .object({
                projectID: z
                    .string()
                    .min(1)
                    .refine((val) => val !== 'none', {
                        message: 'Please select a Project',
                    })
                    .optional(),
                permissionID: z
                    .string({ message: 'Please select a Role' })
                    .optional(),
            })
            .optional(),
    })
    .superRefine((data, ctx) => {
        console.log('🚀 ~ .superRefine ~ data:', data);

        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: "Passwords don't match",
                path: ['confirmPassword'],
            });
            ctx.addIssue({
                code: 'custom',
                message: "Passwords don't match",
                path: ['password'],
            });
        }
    });
