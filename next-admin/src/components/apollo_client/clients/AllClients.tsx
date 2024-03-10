import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../../gqls/clients";

const AllClients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    console.log(data?.allClients)
  
    if (loading) return "Loading...";
  
    if (error) return `Error! ${error.message}`;
  
    return JSON.stringify(data?.allClients);
};

export default AllClients;
