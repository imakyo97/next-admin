import {
  DateInput,
    Edit,
    ReferenceInput,
    SimpleForm,
    TextInput,
} from "react-admin";

export const ProjectEdit = (props: any) => {
  return (
    <Edit>
      <SimpleForm>
        <ReferenceInput source="client_id" label="クライアントID" reference={"clients"}/>
        <TextInput source="name" label="名前"/>
        <DateInput source="start_date" label="開始日"/>
        <DateInput source="end_date" label="終了日"/>
      </SimpleForm>
    </Edit>
  )
};
