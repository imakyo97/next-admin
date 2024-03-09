import { gql } from "../../../__generated__";
import { useQuery } from "@apollo/client"

const GET_CLIENTS = gql ( `   
    query GetClients {
        allClients {
            id
            name
            created_at
            updated_at
        }
    }
` );

const AllClients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);
    console.log(data?.allClients)
  
    if (loading) return "Loading...";
  
    if (error) return `Error! ${error.message}`;
  
    return JSON.stringify(data?.allClients);
};

export default AllClients;
