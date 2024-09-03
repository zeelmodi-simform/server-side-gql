export const schema = `#graphql

    enum IssueStatus {
        DONE
        TODO
        IN_PROGRESS
        BACKLOG
    }

    type Issue {
        id: ID!
        name: String!
        content: String!
        userId: ID!
        projectId: ID!
        status: IssueStatus!
        user: User!
        createdAt: String!
    }

    input CreateIssueInput {
        name: String!
        content: String!
        status: IssueStatus
    }

    type User {
        id: ID!
        email: String!
        password: String!
        createdAt: String!
        token: String!
        issues: [Issue!]!
        # projects: [Project!]!
    }

    input AuthInput {
        email: String!
        password: String!
    }

    input IssuesFilterInput {
        statuses: [IssueStatus!]
    }

    input EditIssueInput {
        name: String
        content: String
        status: IssueStatus
        id: ID!
    }

    type Query {
        me: User
        issues(input: IssuesFilterInput): [Issue]!
        # issues: [Issue!]!
        # user(id: ID!): User
    }

    type Mutation {
        signin(input: AuthInput!): User!
        createUser(input: AuthInput!): User!
        createIssue(input: CreateIssueInput!): Issue!
        editIssue(input: EditIssueInput!): Issue!
    }
`;