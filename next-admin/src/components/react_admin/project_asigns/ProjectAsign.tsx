"use client";  // クライアントコンポーネント

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DeleteClient from "@/components/apollo_client/clients/DeleteClient";
import { Title } from "react-admin";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
});

// クライアントコンポーネント
export const ProjectAsign = () => {    
    return (
        <ApolloProvider client={client}>
            <Title title={"プロジェクトアサイン"} />
            
        </ApolloProvider>
    )
}