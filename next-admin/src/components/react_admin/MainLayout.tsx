import { Layout } from 'react-admin';
import { MainMenu } from './MainMenu';

export const MainLayout = (props: object) => <Layout {...props} menu={MainMenu} />;