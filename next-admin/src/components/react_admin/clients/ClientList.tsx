import {
    List,
    Datagrid,
    EditButton,
    TextField,
    DateField,
    TextInput
} from "react-admin";

const clientFilters = [
  <TextInput source="name" label="Search" alwaysOn />,
];

export const ClientList = (props: any) => (
    <List filters={clientFilters}>
      <Datagrid>
        <TextField source="name" label="名前"/>
        <DateField source="created_at" label="登録日時"/>
        <DateField source="updated_at" lable="更新日時"/>
        <EditButton/>
      </Datagrid>
    </List>
);
