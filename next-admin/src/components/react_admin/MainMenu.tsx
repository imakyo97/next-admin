import { Menu } from 'react-admin';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const MainMenu = () => (
    <Menu>
        <Menu.ResourceItems />
        <Menu.Item to="/project_asigns" primaryText="プロジェクトアサイン" leftIcon={<PersonAddIcon />}/>
    </Menu>
);
