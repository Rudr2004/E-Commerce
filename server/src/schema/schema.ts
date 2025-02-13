import { buildSchema, GraphQLID, GraphQLString } from "graphql";


const schema = buildSchema(`
    type User{
    #id: ID!,
    name: String!,
    email: String!,
    password: String!
    }

    type Query{
    users: [User]!
    }

    type Mutation{
      addUser(details: UserInput!): User!
    }
      input UserInput{
    name: String!,
    email: String!,
    password: String!
      }
    `)
    

    export  default schema