import { useMutation } from "@apollo/client";
import { UpdateClientDocument } from "@/__generated__/graphql";

const UpdateClient = () => {
    let inputId: HTMLInputElement;
    let inputData: HTMLInputElement;
    const [ updateClient, {loading, error, data} ] = useMutation(UpdateClientDocument);
    
  
    if (loading) return "Loading...";
  
    if (error) return `Error! ${error.message}`;
  
    return (
        <>
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateClient({ variables: {id: inputId.value, clientData: {name: inputData.value} } });
                  inputId.value = '';
                  inputData.value = '';
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
                        <label>name</label>
                        <input
                          placeholder="name"
                          ref={node => {
                            if (node != null) {
                                inputData = node;
                            }
                          }}
                        />
                    </li>
                    <li>
                        <button type="submit">update client</button>
                    </li>
                </ul>
              </form>
            </div>
            <div>{JSON.stringify(data?.updateClient)}</div>
        </>
      );
};

export default UpdateClient;
