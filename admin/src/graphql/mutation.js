export const ADD_ITEM_MUTATION = `
  mutation AddItem($product: ProductInput!) {
    createproduct(product: $product) {
      id
      name
      description
      price
      category
      image
    }
  }
`;

export const REMOVE_ITEM_MUTATION = `
   mutation remove($id: ID!){
      removeproduct(id: $id){
        id
  }
}
`;

export const LIST_ITEM = `
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
