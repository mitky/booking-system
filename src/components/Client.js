import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const authLink = setContext((_, { headers }) => {
    return {
    headers: {
         ...headers, 'x-hasura-admin-secret': '5d48sa5kESbszlEY2aH2C147DdjXFcSMG9coN1VZVXj7iXHYnqkeGFQ5HxCBFyzD'
       }                                      
     }
   });
  
  const httpLink = createHttpLink({
    uri: 'https://valued-piranha-75.hasura.app/v1/graphql',
   });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });



export default client;