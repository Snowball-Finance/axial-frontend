import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.snowapi.net/graphql", // TODO: Need to add on the .env
  }),
  cache: new InMemoryCache(),
})
