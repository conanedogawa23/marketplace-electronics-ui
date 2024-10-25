export const CREATE_USER_MUTATION = `
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      firstName
      lastName
      email
      phoneNumber
      dateOfBirth
      address
      employeeId
      department
      position
      salary
      hireDate
      employmentStatus
      role
    }
  }
`;

export const UPDATE_USER_MUTATION = `
  mutation UpdateUser($uuid: String!, $user: UpdateUserInput!) {
    updateUser(uuid: $uuid, user: $user) {
        firstName
        lastName
        email
        phoneNumber
        dateOfBirth
        address
        employeeId
        department
        position
        salary
        hireDate
        employmentStatus
        role
        uuid
    }
  }
`;

export const DELETE_USER_MUTATION = `
  mutation DeleteUser($uuid: String!) {
    deleteUser(id: $id) {
      uuid
    }
  }
`;

export const USER_LOGIN_MUTATION = `
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
