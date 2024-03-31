import { useMutation } from "@apollo/client";
import { Button, Stack } from "@mui/material";

import { DeleteClientDocument } from "generated/graphql";

const DeleteClient = () => {
  let inputId: HTMLInputElement;
  const [updateClient, { loading, error, data }] =
    useMutation(DeleteClientDocument);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Stack direction="row" spacing={2}>
        <label>id</label>
        <input
          placeholder="id"
          ref={(node) => {
            if (node != null) {
              inputId = node;
            }
          }}
        />
      </Stack>
      <Button
        variant="contained"
        onClick={() => {
          updateClient({ variables: { id: inputId.value } });
          inputId.value = "";
        }}
      >
        clientを削除
      </Button>
      <div>{JSON.stringify(data?.deleteClient)}</div>
    </>
  );
};

export default DeleteClient;
