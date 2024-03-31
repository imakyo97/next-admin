import { ClientCreate } from "./ClientCreate";
import { ClientEdit } from "./ClientEdit";
import { ClientList } from "./ClientList";

export const resource = {
  list: ClientList,
  create: ClientCreate,
  edit: ClientEdit,
};

export default resource;
