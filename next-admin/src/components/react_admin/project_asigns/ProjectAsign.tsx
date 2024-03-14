"use client";  // クライアントコンポーネント

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Title } from "react-admin";
import Draggable from 'react-draggable';
import { Card } from "@mui/material"

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
});

// クライアントコンポーネント
export const ProjectAsign = () => {    
    return (
        <ApolloProvider client={client}>
            <Title title={"プロジェクトアサイン"} />
            <Draggable>
                <Card variant="outlined">動く文字</Card>
            </Draggable>
        </ApolloProvider>
    )
}