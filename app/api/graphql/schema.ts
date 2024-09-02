const schema = `#graphql

    # enum STATUS {
    #     IN_PROGRESS
    #     DONE
    #     TODO
    # }

    # type Todo {
    #     status: STATUS!
    # }

    # interface Entity {
    #     id: ID!
    # }

    # type Tweet  implements Entity {
    #     id: ID!
    #     content: String!
    # }

    # type Profile implements Entity {
    #     id: ID!
    #     username: String! @deprecated(reason: "Use 'name' instead")
    #     person: Person!
    # }

    # union SearchResult = Tweet | Profile

    # interface Character {
    #     name: String!
    #     outfit: String!
    #     strengthStat: Int!
    # }
    
    # type Person implements Character {
    #     name: String!
    #     outfit: String!
    #     strengthStat: Int!
    #     profile: Profile!

    #     backgroundStory: String!
    # }

    # type Alien implements Character {
    #     name: String!
    #     outfit: String!
    #     strengthStat: Int!

    #     homeWorld: String!
    # }

    # input SearchInput {
    #     id: ID
    #     name: String
    # }
    # type Query {
    #     me: Person!
    #     characters: [Character!]!
    #     search(input: SearchInput!): [SearchResult!]!
    #     todo: Todo!
    # }

    # type Mutation {
    #     makeTweet(content: String!): Tweet!
    # }

    # type Subscription {

    # }

    # enum COLORS {
    #     BLUE
    #     PURPLE
    #     BROWN
    #     BLACK
    # }

    type Animal {
        id: ID!
        name: String!
        species: String!
    }

    type Person {
        name: String!
        id: ID!
        pets: [Animal!]!
        # favColor: COLORS!
    }

    union SearchResult = Person | Animal

    type Query {
        me: String!
        people: [Person!]!
        searchQuery: [SearchResult!]!
    }
    
`

export default schema
