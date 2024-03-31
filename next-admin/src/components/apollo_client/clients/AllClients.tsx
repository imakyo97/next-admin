import { useQuery } from "@apollo/client";

import { GetClientsDocument } from "generated/graphql";

const AllClients = () => {
  const { loading, error, data } = useQuery(GetClientsDocument);
  console.log(data?.allClients);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return JSON.stringify(data?.allClients);
};

export default AllClients;
