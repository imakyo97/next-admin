"use client";  // クライアントコンポーネント

import { GetClientsDocument } from "@/__generated__/graphql";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AllClients from "../../components/apollo_client/clients/AllClients";
import CreateClient from "@/components/apollo_client/clients/CreateClient";
import UpdateClient from "@/components/apollo_client/clients/UpdateClient";
import DeleteClient from "@/components/apollo_client/clients/DeleteClient";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
});

// クライアントコンポーネント
const TestClient = () => {    
    return (
        <ApolloProvider client={client}>
            <DeleteClient />
        </ApolloProvider>
    )
}

// サーバーコンポーネント
// const TestClient = async () => {
//     const { loading, error, data } = await client.query({ query: GetClientsDocument }); 
//     return JSON.stringify(data.allClients);
// }

export default TestClient;
