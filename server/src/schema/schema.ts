import { buildSchema, GraphQLID, GraphQLString } from "graphql";


const schema = buildSchema(`
    type User{
    #id: ID!,
    name: String!,
    email: String!,
    password: String
    #token: String
    }

    type Product{
      name: String!,
      description: String!,
      price: Int!,
      category: String!,
      image: String
    }

    type Query{
    users: [User]!
    product: [Product]!
    }

    type Mutation{
      signup(details: UserInput!): User!
      login(login: LoginInput!): User
      createproduct(product: ProductInput!): Product!
    }
      input UserInput{
    name: String!,
    email: String!,
    password: String!
}
    input LoginInput {
    email: String!
    password: String!
    }

    input ProductInput{
      name: String!,
      description: String!,
      price: Int!,
      category: String!,
      #image: String
    }
    
    `)
    

    export  default schema