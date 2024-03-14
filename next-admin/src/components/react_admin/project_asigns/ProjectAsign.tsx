"use client";  // クライアントコンポーネント

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Title } from "react-admin";
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { Card } from "@mui/material"
import { useState } from "react";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
});

// クライアントコンポーネント
export const ProjectAsign = () => {  
    const [controlledPosition, setControlledPosition] = useState({x: 0, y: 0});

    const onControlledDragStop: DraggableEventHandler = (e, position) => {
        setControlledPosition({x: 0, y:0})
    };
     
    return (
        <ApolloProvider client={client}>
            <Title title={"プロジェクトアサイン"} />
            <Draggable position={controlledPosition} onStop={onControlledDragStop}>
                <Card variant="outlined">動く文字1</Card>
            </Draggable>
            <Draggable>
                <Card variant="outlined">動く文字2</Card>
            </Draggable>
        </ApolloProvider>
    )
}