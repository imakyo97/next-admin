import {
    Create,
    SimpleForm,
    TextInput,
    useCreate,
    useRedirect,
} from "react-admin";
import { FieldValues } from "react-hook-form";

export const ClientCreate = (props: any) => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="name" label="名前"/>
            </SimpleForm>
        </Create>
    );
};
