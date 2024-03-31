import {
  List,
  EditButton,
  TextField,
  DateField,
  TextInput,
  SearchInput,
  TopToolbar,
  SelectColumnsButton,
  FilterButton,
  CreateButton,
  ExportButton,
  DatagridConfigurable,
  WrapperField,
  Pagination,
} from "react-admin";

const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const clientFilters = [
  <TextInput
    key="search_name"
    label="Search"
    source="name"
    alwaysOn
    resettable
  />,
  <TextInput
    key="created_at"
    label="created_at"
    source="created_at"
    type="date"
    alwaysOn
    resettable
  />,
  <SearchInput key="updated_at" source="updated_at" alwaysOn />,
];

const ClientPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

export const ClientList = () => (
  <List
    actions={<ListActions />}
    filters={clientFilters}
    pagination={<ClientPagination />}
  >
    <DatagridConfigurable>
      <TextField source="name" label="名前" />
      <DateField source="created_at" label="登録日時" />
      <DateField source="updated_at" lable="更新日時" />
      <WrapperField label="Actions">
        <EditButton />
      </WrapperField>
    </DatagridConfigurable>
  </List>
);
