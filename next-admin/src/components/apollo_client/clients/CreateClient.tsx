import { useMutation } from "@apollo/client";

import { CreateClientDocument } from "generated/graphql";

const CreateClient = () => {
  let input: HTMLInputElement;
  const [createClient, { loading, error, data }] =
    useMutation(CreateClientDocument);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createClient({ variables: { clientData: { name: input.value } } });
            input.value = "";
          }}
        >
          <input
            ref={(node) => {
              if (node != null) {
                input = node;
              }
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
      <div>{JSON.stringify(data?.createClient)}</div>
    </>
  );
};

export default CreateClient;
