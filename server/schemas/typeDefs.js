const typeDefs= `#graphql
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: String
    savedBooks: [Book]
}

type Book {
    bookID: ID!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookAuthor: Array!, description: String!, title: String!, bookID: ID!, image: Image, link: String!)
    removeBook(bookID: ID!): User
}
`