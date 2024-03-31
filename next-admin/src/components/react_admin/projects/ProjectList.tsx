import {
  List,
  EditButton,
  TextField,
  DateField,
  TextInput,
  TopToolbar,
  SelectColumnsButton,
  FilterButton,
  CreateButton,
  ExportButton,
  DatagridConfigurable,
  WrapperField,
  Pagination,
  ReferenceField,
} from "react-admin";

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const projectFilters = [
  <TextInput
    key="client_id"
    label="クライアントID"
    source="client_id"
    alwaysOn
    resettable
  />,
  <TextInput key="name" label="名前" source="name" alwaysOn resettable />,
];

const ProjectPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

export const ProjectList = () => (
  <List
    actions={<ListActions />}
    filters={projectFilters}
    pagination={<ProjectPagination />}
  >
    <DatagridConfigurable>
      <TextField source="id" label="プロジェクトID" />
      <ReferenceField
        source="client_id"
        reference="clients"
        label="クライアントID"
      />
      <TextField source="name" label="名前" />
      <DateField source="start_date" label="開始日" />
      <DateField source="end_date" lable="終了日" />
      <DateField source="created_at" label="登録日時" showTime />
      <DateField source="updated_at" lable="更新日時" showTime />
      <WrapperField label="Actions">
        <EditButton />
      </WrapperField>
    </DatagridConfigurable>
  </List>
);
