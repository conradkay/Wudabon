import ApolloClient from 'apollo-client'

import { ApolloLink } from 'apollo-link'

import { onError } from 'apollo-link-error'

import { HttpLink } from 'apollo-link-http'

import { InMemoryCache } from 'apollo-cache-inmemory'

export const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `GQL ERROR: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) {
        console.error(`[Network error]: ${networkError}`)
      }
    }),
    new HttpLink({
      uri: `http://localhost:4000/graphql`,
      credentials: 'include'
    })
  ]),
  cache: new InMemoryCache()
})
