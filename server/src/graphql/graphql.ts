import { ApolloServer } from 'apollo-server-express'

import fs from 'fs'
import path from 'path'
import { queries } from './queries/queries'
import { mutations } from './mutations/mutations'
import jsonwebtoken from 'jsonwebtoken'

const resolvers: any = {
  Query: queries,
  Mutation: mutations
}

const typeDefs: any = [
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
]

export const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: 'service:conradkay-480:AdwEo9b5E7h_ORW8MvTQEw'
  },
  tracing: true,
  context: async ({ req, res }) => {
    try {
      const token: any = jsonwebtoken.decode(req.cookies['auth-token'])

      return { req, res, userId: token.id }
    } catch (err) {
      if (res) {
        res.clearCookie('auth-token')
      }

      return { req, res, userId: null }
    }
  }
})
