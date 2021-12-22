import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { env, IS_DEV } from "environment";

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: IS_DEV ? env.DEVAPIADDR : env.APIADDR,
  }),
  cache: new InMemoryCache(),
})

export const query = apolloClient.query