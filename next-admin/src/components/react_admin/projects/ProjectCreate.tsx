import {
  Create,
  DateInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const ProjectCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput
          source="client_id"
          label="クライアントID"
          reference={"clients"}
        />
        <TextInput source="name" label="名前" />
        <DateInput source="start_date" label="開始日" />
        <DateInput source="end_date" label="終了日" />
      </SimpleForm>
    </Create>
  );
};
