import { gql } from "@apollo/client";

export const ADD_ITEM_MUTATION = gql`
  mutation AddItem(
    $name: String!
    $description: String
    $price: Float!
    $category: String!
    $image: Upload!
  ) {
    createproduct(
      name: $name
      description: $description
      price: $price
      category: $category
      image: $image
    ) {
      id
      name
      description
      price
      category
      image {
        publicId
        url
      }
    }
  }
`;
