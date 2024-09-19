import { lazy } from 'react';
import {  Route, Navigate } from 'react-router-dom';
import { AdminRoutes } from "../../models";
import { RoutesWithNotFound } from '../../utilities';


const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
const Users = lazy(() => import("./Users/Users"));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={AdminRoutes.DASHBOARD} />} />
      <Route path={AdminRoutes.DASHBOARD} element={<Dashboard />} />
      <Route path={AdminRoutes.USERS} element={<Users />} />
    </RoutesWithNotFound>
  );
}
export default Private;
