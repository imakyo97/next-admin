// "use client";  // クライアントコンポーネント

import AllClients from "../../components/apollo_client/clients/AllClients";
import { GET_CLIENTS } from "../../gqls/clients";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
});

// クライアントコンポーネント
// const TestClient = () => {    
//     return (
//         <ApolloProvider client={client}>
//             <AllClients />
//         </ApolloProvider>
//     )
// }

// サーバーコンポーネント
const TestClient = async () => {
    const { loading, error, data } = await client.query({ query: GET_CLIENTS }); 
    return JSON.stringify(data.allClients);
}

export default TestClient;
