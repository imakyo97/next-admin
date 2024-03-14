"use client"; 

import React from 'react';
import { Component } from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { Admin, DataProvider, Resource, CustomRoutes } from 'react-admin';
import { Route } from "react-router-dom";
import clients from './clients'
import { MainLayout } from './MainLayout';
import { ProjectAsign } from "./project_asigns"


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
        <Admin dataProvider= { dataProvider } layout={ MainLayout }>
            <Resource name="Client" {...clients} />
            <CustomRoutes>
                <Route path="/project_asigns" element={<ProjectAsign />} />
            </CustomRoutes>
        </Admin>
    );
};

export default AdminApp;
