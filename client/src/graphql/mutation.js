export const GET_PRODUCT = `
query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      image
    }
  }
`;

export const GET_ALL_PRODUCT = `
query {
    products {
        id
        name
        description
        price
        image
    }
   }
`;

export const LOGIN_MUTATION = `
mutation login($login: LoginInput!) {
  login(login: $login) {
    email,
    password
  }
}
`;
export const SIGNUP_MUTATION = `
mutation Signup($details: UserInput!) {
    signup(details: $details) {
        name
        email
        password
    }
 }
`;
