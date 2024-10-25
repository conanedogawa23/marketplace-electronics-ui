import { gql } from 'graphql-request';

export const LOGIN_MUTATION = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
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
    }
`;
