import { gql } from "../../__generated__";


export const GET_CLIENTS = gql ( `   
    query GetClients {
        allClients {
            id
            name
            created_at
            updated_at
        }
    }
` );
