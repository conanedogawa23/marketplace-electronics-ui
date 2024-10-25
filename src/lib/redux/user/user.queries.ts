export const USER_LIST_QUERY = `
    query UserList {
        userList {
        _id
        uuid
        firstName
        lastName
        email
        phoneNumber
        dateOfBirth
        employeeId
        department
        position
        salary
        hireDate
        employmentStatus
        role
        createdAt
        updatedAt
        }
    }
`;
