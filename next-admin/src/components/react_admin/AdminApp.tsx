"use client";

import React from "react";
import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";

import dataProvider from "src/app/dataProvider";

import clients from "./clients";
import { MainLayout } from "./MainLayout";
import { ProjectAsign } from "./project_asigns";

const AdminApp = () => {
  return (
    <Admin dataProvider={dataProvider} layout={MainLayout}>
      <Resource name="clients" {...clients} />
      <CustomRoutes>
        <Route path="/project_asigns" element={<ProjectAsign />} />
      </CustomRoutes>
    </Admin>
  );
};

export default AdminApp;
