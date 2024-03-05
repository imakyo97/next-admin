import {
    Create,
    SimpleForm,
    TextInput,
    useCreate,
    useRedirect,
} from "react-admin";
import { FieldValues } from "react-hook-form";

export const ClientCreate = (props: any) => {
    const [create, { isLoading, error }] = useCreate();
    const redirect = useRedirect();
    const handleClick = async (data: FieldValues) => {
        await create('Client', { data: {client_data: data} });
        redirect("list", "Client")
    };
    if (error) { return <p>ERROR</p>; }
    return (
        <Create>
            <SimpleForm onSubmit={ handleClick }>
                <TextInput source="name" label="名前"/>
            </SimpleForm>
        </Create>
    );
};
