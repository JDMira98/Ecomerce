import { lazy } from 'react';
import {  Route, Navigate } from 'react-router-dom';
import { AdminRoutes } from "../../models";
import { RoutesWithNotFound } from '../../utilities';


const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
const Users = lazy(() => import("./Users/Users"));
const Products = lazy(() => import("./Products/Products"));
const Profile = lazy(() => import("./Profile/Profile"));
const Categories = lazy(() => import("./Categories/Categories"));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={AdminRoutes.DASHBOARD} />} />
      <Route path={AdminRoutes.DASHBOARD} element={<Dashboard />} />
      <Route path={AdminRoutes.USERS} element={<Users />} />
      <Route path={AdminRoutes.PRODUCTS} element={<Products />} />
      <Route path={AdminRoutes.CATEGORIES} element={<Categories />} />
      <Route path={AdminRoutes.PROFILE} element={<Profile />} />
    </RoutesWithNotFound>
  );
}
export default Private;
