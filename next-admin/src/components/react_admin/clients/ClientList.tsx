import {
    List,
    Datagrid,
    EditButton,
    TextField,
    DateField,
} from "react-admin";

export const ClientList = (props: any) => (
    <List>
      <Datagrid>
        <TextField source="name" label="名前"/>
        <DateField source="created_at" label="登録日時"/>
        <DateField source="updated_at" lable="更新日時"/>
        <EditButton/>
      </Datagrid>
    </List>
);
