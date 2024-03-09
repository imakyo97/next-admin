"use client"; 


import AllClients from "../../components/apollo_client/clients/AllClients";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql",
    cache: new InMemoryCache(),
});

const TestClient = () => {    
    return (
        <ApolloProvider client={client}>
            <AllClients />
        </ApolloProvider>
    )
}

export default TestClient;
