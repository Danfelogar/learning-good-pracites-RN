import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const rickAndMortyClient = new ApolloClient({
  link: new HttpLink({ uri: process.env.EXPO_PUBLIC_BASE_URL }),
  cache: new InMemoryCache(),
});
