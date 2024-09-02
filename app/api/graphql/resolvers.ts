import { GQLContext } from "@/types";
import { signin, signup } from "@/utils/auth";
import { GraphQLError } from "graphql";


export const resolvers = {
    Query: {
        me: async (_, __, ctx: GQLContext) => {            
            return ctx.user;
        }
    },
    Mutation: {
        signin:  async (_, { input }, ctx) => {
            const data = await signin(input);            
            
            if (!data?.token || !data?.user) {
                throw new GraphQLError('UNAUTHORIZED!', {
                    extensions: {
                        code: 'AUTH_ERROR',
                        status: 401
                    },
                })
            }

            return {...data.user, token: data.token}

        },
        createUser: async (_, { input }, ctx) => {
            const data = await signup(input);            

            if (!data?.token || !data?.user) {
                throw new GraphQLError('UNAUTHORIZED!', {
                    extensions: {
                        code: 'AUTH_ERROR',
                        status: 401
                    },
                })
            }

            return {...data.user, token: data.token}
        }
    }
}