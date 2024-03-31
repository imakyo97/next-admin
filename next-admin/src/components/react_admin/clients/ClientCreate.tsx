import { Create, SimpleForm, TextInput } from "react-admin";

export const ClientCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" label="名前" />
      </SimpleForm>
    </Create>
  );
};
