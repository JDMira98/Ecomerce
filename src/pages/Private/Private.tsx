import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AdminRoutes, PrivateRoutes, Roles } from "../../models";
import { RoutesWithNotFound } from '../../utilities';

import {RoleGuard } from "../../guards";

const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
const Users = lazy(() => import("./Users/Users"));

function Private() {
  return (
    <RoutesWithNotFound>
        <Route path={AdminRoutes.DASHBOARD} element={<Dashboard />} />
        <Route path={AdminRoutes.USERS} element={<Users />} />
    </RoutesWithNotFound>
  );
}
export default Private;
