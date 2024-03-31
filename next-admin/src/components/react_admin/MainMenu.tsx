import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Menu } from "react-admin";

export const MainMenu = () => (
  <Menu>
    <Menu.ResourceItems />
    <Menu.DashboardItem
      to="/project_asigns"
      primaryText="プロジェクトアサイン"
      leftIcon={<PersonAddIcon />}
    />
  </Menu>
);
