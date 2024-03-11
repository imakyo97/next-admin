import { useMutation } from "@apollo/client";
import { DeleteClientDocument } from "@/__generated__/graphql";

const DeleteClient = () => {
    let inputId: HTMLInputElement;
    const [ updateClient, {loading, error, data} ] = useMutation(DeleteClientDocument);
    
  
    if (loading) return "Loading...";
  
    if (error) return `Error! ${error.message}`;
  
    return (
        <>
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateClient({ variables: {id: inputId.value} });
                  inputId.value = '';
                }}
              >
                <ul>
                    <li>
                        <label>id</label>
                        <input
                          placeholder="id"
                          ref={node => {
                            if (node != null) {
                                inputId = node;
                            }
                          }}
                        />
                    </li>
                    <li>
                        <button type="submit">delete client</button>
                    </li>
                </ul>
              </form>
            </div>
            <div>{JSON.stringify(data?.deleteClient)}</div>
        </>
      );
};

export default DeleteClient;
