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
    SelectArrayInput
  } from "react-admin";
  import React from 'react'

  // 以下のコンポーネント実装時に参考にしたサイト
  // https://codesandbox.io/p/sandbox/flamboyant-lederberg-wwqon9o2ow

  export const ProgrammerFilter = (props: any) => (
    <Filter {...props}>
      <TextInput label="Search by name" source="name_contains" alwaysOn />
    </Filter>
  )
  
  export const ProgrammerList = (props: any) => (
    <List filters={<ProgrammerFilter />} {...props}>
      <Datagrid>
        <TextField source="id"/>
        <TextField source="name"/>
        <EditButton/>
        <ShowButton/>
      </Datagrid>
    </List>
  );
  
  export const ProgrammerEdit = (props: any) => (
    <Edit title="Edit a shop" {...props}>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  );