import { Layout } from "react-admin";

import { MainMenu } from "components/react_admin/MainMenu";

export const MainLayout = (props: object) => (
  <Layout {...props} menu={MainMenu} />
);
