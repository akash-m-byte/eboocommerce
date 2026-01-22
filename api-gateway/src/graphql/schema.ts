import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    description: String
    categoryId: String
  }

  type CartItem {
    productId: String!
    quantity: Int!
  }

  type Cart {
    id: ID!
    userId: String!
    items: [CartItem!]!
  }

  type Order {
    id: ID!
    userId: String!
    status: String!
    total: Float!
  }

  type Query {
    products(limit: Int, offset: Int): [Product!]!
    cart(userId: String!): Cart
    order(id: ID!): Order
  }

  type Mutation {
    addToCart(userId: String!, productId: String!, quantity: Int!): Cart
    checkout(userId: String!): Order
  }
`;
