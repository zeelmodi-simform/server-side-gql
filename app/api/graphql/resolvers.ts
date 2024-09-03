import { db } from "@/db/db";
import { issues, SelectIssues, users } from "@/db/schema";
import { GQLContext } from "@/types";
import { signin, signup } from "@/utils/auth";
import { and, asc, desc, eq, or, sql } from "drizzle-orm";
import { GraphQLError } from "graphql";


export const resolvers = {
    Query: {
        me: async (_, __, ctx: GQLContext) => {            
            return ctx.user;
        },
        issues: async(_, { input }: {
            input?: {
                statuses?: SelectIssues['status'][]
            }
        }, ctx: GQLContext) => {
            if(!ctx.user) {
                throw new GraphQLError('UNAUTHORIZED!', {
                    extensions: {
                        code: 'AUTH_ERROR',
                        status: 401
                    },
                })
            }

            const andFilters = [eq(issues.userId, ctx.user.id)];

            if (input?.statuses?.length) {
                const statusFilters = input.statuses?.map((status: SelectIssues['status']) => eq(issues.status, status));
                andFilters.push(or(...statusFilters))
            }

            const data = await db.query.issues.findMany({
                where: and(...andFilters),
                orderBy: [asc(
                    sql`case ${issues.status} when "backlog" then 1 when "inprogress" then 2 when "done" then 3 end`),
                    desc(issues.createdAt)],
                
            })

            return data;
        }
    },
    Mutation: {
        signin:  async (_, { input }, ctx: GQLContext) => {
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
        },
        createIssue: async (_,{input}, ctx: GQLContext) => {
            if(!ctx.user) {
                throw new GraphQLError('UNAUTHORIZED!', {
                    extensions: {
                        code: 'AUTH_ERROR',
                        status: 401
                    },
                })
            }

            const data = await db.insert(issues).values({userId: ctx.user.id, ...input}).returning();

            return data[0];
        },
        editIssue: async (_, { input }, ctx: GQLContext) => {
            if(!ctx.user) {
                throw new GraphQLError('UNAUTHORIZED!', {
                    extensions: {
                        code: 'AUTH_ERROR',
                        status: 401
                    },
                })
            }

            const { id, ...updatedInput } = input
            
            const results = await db.update(issues).set(updatedInput ?? {})
                .where(and(eq(issues.userId, ctx.user.id), eq(issues.id, id)))
                .returning()

            return results[0];
        }
    },
    IssueStatus: {
        BACKLOG: 'backlog',
        TODO: 'todo',
        IN_PROGRESS: 'inprogress',
        DONE: 'done',
    },
    Issue: {
        user: (issue, _, ctx: GQLContext) => {
            if(!ctx.user) {
                throw new GraphQLError('UNAUTHORIZED!', {
                    extensions: {
                        code: 'AUTH_ERROR',
                        status: 401
                    },
                })
            }

            return db.query.users.findFirst({
                where: eq(users.id, issue.userId)
            })
        }
    },
    User: {
        issues: (user, _, ctx: GQLContext) => {
            if(!ctx.user) {
                throw new GraphQLError('UNAUTHORIZED!', {
                    extensions: {
                        code: 'AUTH_ERROR',
                        status: 401
                    },
                })
            }

            return db.query.issues.findMany({
                where: eq(issues.userId, user.id)
            })
        }
    }
}