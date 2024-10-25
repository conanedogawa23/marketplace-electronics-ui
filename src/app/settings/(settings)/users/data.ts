import { faker } from '@faker-js/faker';

export interface User {
    id: number | string;
    createdAt: string;
    dateOfBirth: string;
    department: string;
    email: string;
    employeeId: string;
    employmentStatus: string;
    firstName: string;
    hireDate: string;
    lastName: string;
    phoneNumber: string;
    position: string;
    role: string;
    salary: number;
    updatedAt: string;
    uuid: string;

    // add more fields here
    status: 'active' | 'inactive';
}

// create fake random user uing faker v8

export function createRandomUser(): User {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const phoneNumber = faker.phone.number();
    const dateOfBirth = faker.date.birthdate().toISOString();
    const hireDate = faker.date.past({ years: 10 }).toISOString();
    const department = faker.commerce.department();
    const position = faker.person.jobTitle();
    const role = faker.person.jobType();
    const employmentStatus = faker.datatype.boolean()
        ? 'Full-time'
        : 'Part-time';
    const salary = faker.number.int({ min: 30000, max: 100000 });
    const employeeId = `EMP${faker.number.int({ min: 1000, max: 9999 })}`;
    const uuid = faker.string.uuid();
    const updatedAt = faker.date.recent({ days: 2 }).toISOString();
    const status = faker.datatype.boolean() ? 'active' : 'inactive';

    const user: User = {
        id: faker.string.uuid(),
        createdAt: faker.date.past({ years: 10 }).toISOString(),
        dateOfBirth,
        department,
        email,
        employeeId,
        employmentStatus,
        firstName,
        hireDate,
        lastName,
        phoneNumber,
        position,
        role,
        salary,
        updatedAt,
        uuid,
        status,
    };

    return user;
}

export const UsersData: User[] = Array.from({ length: 10 }, () =>
    createRandomUser(),
);
