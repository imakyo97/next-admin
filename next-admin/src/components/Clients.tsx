import {
    Edit,
    List,
    Show,
    Create,
    ChipField,
    Datagrid,
    EditButton,
    ReferenceManyField,
    ReferenceField,
    ShowButton,
    SimpleForm,
    SingleFieldList,
    TextField,
    TextInput,
    Filter,
    ReferenceInput,
    ReferenceArrayInput,
    SelectArrayInput,
    DateField,
    useCreate,
    useUpdate,
    useRedirect,
  } from "react-admin";
  import { FieldValues } from "react-hook-form";
  import React from 'react'

  // 以下のコンポーネント実装時に参考にしたサイト
  // https://codesandbox.io/p/sandbox/flamboyant-lederberg-wwqon9o2ow

  export const ClientFilter = (props: any) => (
    <Filter {...props}>
      <TextInput label="Search by name" source="name_contains" alwaysOn />
    </Filter>
  )
  
  export const ClientList = (props: any) => (
    <List filters={<ClientFilter />} {...props}>
      <Datagrid>
        <TextField source="name" label="名前"/>
        <DateField source="created_at" label="登録日時"/>
        <DateField source="updated_at" lable="更新日時"/>
        <EditButton/>
      </Datagrid>
    </List>
  );

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