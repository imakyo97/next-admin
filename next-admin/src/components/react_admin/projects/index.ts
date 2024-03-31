import { ProjectCreate } from "./ProjectCreate";
import { ProjectEdit } from "./ProjectEdit";
import { ProjectList } from "./ProjectList";

export const resource = {
  list: ProjectList,
  create: ProjectCreate,
  edit: ProjectEdit,
};

export default resource;
