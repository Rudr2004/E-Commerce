import { buildSchema, GraphQLID, GraphQLString } from "graphql";

const schema = buildSchema(`
  scalar Upload
    type User{
    #id: ID!,
    name: String!,
    email: String!,
    password: String
    #token: String
    }

    type Product{
     id: ID!,
      name: String!,
      description: String!,
      price: Int!,
      category: String!,
      image: Image
    }

    type Image{
    publicId: String!
    url: String!
    }
    

    type Query{
    users: [User]!
    products: [Product!]!
    product(id:ID!): Product
    }

    type Mutation{
      signup(details: UserInput!): User!
      login(login: LoginInput!): User
      createproduct(product: ProductInput!): Product
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
      image: Upload!
    }
    
    `)
    

    export  default schema
