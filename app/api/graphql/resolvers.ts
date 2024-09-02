const resolvers = {
    // COLORS: {
    //     BLUE: '#4287f5'
    // },
    SearchResult: {
        __resolveType: (obj: { species: any; }) => {
            if (obj.species) {
                return 'Animal'
            }
            return 'Person'
        }
    },
    Person: {
        name: (person: { name: string; }) => {
            return person.name?.slice(0, 1).toUpperCase() + person?.name?.slice(1)
        },
        pets: (person) => {
            return [
                {
                    species: 'Dog',
                    name: 'Fido',
                    id: 1
                },
                {
                    species: 'Cat',
                    name: 'Garfield',
                    id: 2
                },
                {
                    species: 'Dog',
                    name: 'Pluto',
                    id: 3
                },
                {
                    species: 'Cat',
                    name: 'Tom',
                    id: 4
                },
                {
                    species: 'Dog',
                    name: 'Spot',
                    id: 5
                },
                {
                    species: 'Cat',
                    name: 'Felix',
                    id: 6
                },
                {
                    species: 'Dog',
                    name: 'Daisy',
                    id: 7
                },
                {
                    species: 'Cat',
                    name: 'Smokey',
                    id: 8
                }
            ]
        },
    },
    Query: {
        me: () => {
            return 'me'
        },
        people: () => {
            return [
                {
                    name: 'john',
                    id: 30,
                    pets: [1]
                },
                // {
                //     name: 'jane',
                //     id: 25,
                //     pets: [5]
                // }
            ]
        },
        searchQuery: () => {
            return [
                {
                    name: 'john',
                    id: 30,
                    pets: [1]
                },
                {
                    name: 'Tom',
                    id: 21,
                    species: 'Bulldog'
                }
            ]
        }
    }
};


export default resolvers
