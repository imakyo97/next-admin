import {
    Edit,
    SimpleForm,
    TextInput,
    useUpdate,
    useRedirect,
} from "react-admin";
import { FieldValues } from "react-hook-form";

export const ClientEdit = (props: any) => {
    const [update, { isLoading, error }] = useUpdate();
    const redirect = useRedirect();
    const handleClick = async (data: FieldValues) => {
        await update('Client', {
            id: data.id, 
            data: {client_data: {name: data.name}} 
        });
        redirect("list", "Client")
    };
    if (error) { return <p>ERROR</p>; }
    return (
        <Edit>
          <SimpleForm onSubmit={ handleClick }>
            <TextInput source="name" label="名前"/>
          </SimpleForm>
        </Edit>
    )
};
