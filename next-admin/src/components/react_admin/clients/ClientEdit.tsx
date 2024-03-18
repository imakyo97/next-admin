import {
    Edit,
    SimpleForm,
    TextInput,
} from "react-admin";

export const ClientEdit = (props: any) => {
    return (
        <Edit>
          <SimpleForm>
            <TextInput source="name" label="名前"/>
          </SimpleForm>
        </Edit>
    )
};
