import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { BASE_URL } from "@env";

export const rickAndMortyClient = new ApolloClient({
  link: new HttpLink({ uri: BASE_URL }),
  cache: new InMemoryCache(),
});
