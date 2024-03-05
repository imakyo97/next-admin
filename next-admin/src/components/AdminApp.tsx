"use client"; 

import React from 'react';
import { Component } from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { Admin, DataProvider, Resource } from 'react-admin';
import { ProgrammerList, ProgrammerEdit } from './Programmers';
import { ClientList, ClientCreate, ClientEdit } from './Clients';


const AdminApp = () => {
    const [dataProvider, setDataProvider] = React.useState<DataProvider | null>(null)
    React.useEffect(() => {
        buildGraphQLProvider({ clientOptions: { uri: 'http://localhost:8000/graphql' } })
            .then(graphQlDataProvider => setDataProvider(graphQlDataProvider));
    }, []);

    if (!dataProvider) {
        return <div>Loading </div>;
    }

    return (
        <Admin dataProvider= { dataProvider } >
            <Resource name="Programmer" list = { ProgrammerList } edit={ ProgrammerEdit }/>
            <Resource name="Client" list = { ClientList } create={ ClientCreate } edit={ ClientEdit }/>
        </Admin>
    );
};

export default AdminApp;
