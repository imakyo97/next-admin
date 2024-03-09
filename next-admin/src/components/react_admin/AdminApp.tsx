"use client"; 

import React from 'react';
import { Component } from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { Admin, DataProvider, Resource } from 'react-admin';
import clients from './clients'


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
            <Resource name="Client" {...clients} />
        </Admin>
    );
};

export default AdminApp;
