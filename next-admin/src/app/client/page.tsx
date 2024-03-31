// "use client";  // クライアントコンポーネント

import { ApolloClient, InMemoryCache } from "@apollo/client";

import { ProgrammersService } from "src/generated_rest";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

// クライアントコンポーネント
// const TestClient = () => {
//     return (
//         <ApolloProvider client={client}>
//             <DeleteClient />
//         </ApolloProvider>
//     )
// }

// サーバーコンポーネント（GraphQL）
// const TestClient = async () => {
//     const { loading, error, data } = await client.query({ query: GetClientsDocument });
//     return JSON.stringify(data.allClients);
// }

// サーバーコンポーネント（Rest）
const TestClient = async () => {
  const programmers = await ProgrammersService.getProgrammersProgrammersGet();
  return JSON.stringify(programmers);
};

export default TestClient;
