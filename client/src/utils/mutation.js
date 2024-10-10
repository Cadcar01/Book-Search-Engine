import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookAuthor: [String]!, $description: String!, $title: String!, $bookID: ID!) {
    saveBook(bookAuthor: $bookAuthor, description: $description, title: $title, bookID: $bookID) {
      bookAuthor
      description
      title
      bookID
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookID) {
    addComment(bookID: $bookID) {
      bookID
      }
    }
  }
`;
