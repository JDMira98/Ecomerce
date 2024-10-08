import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import { AuthGuard, RoleGuard } from "./guards";
import { AdminRoutes, PublicRoutes, Roles } from "./models";
import { Dashboard, Users } from "./pages/Private";
import store from "./redux/store";
import { RoutesWithNotFound } from "./utilities";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Private = lazy(() => import("./pages/Private/Private"));
const Home = lazy(() => import("./pages/Home/Home"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const Order = lazy(() => import("./pages/Order/Order"));
const Profile = lazy(() => import("./pages/Private/Profile/Profile"));
const Products = lazy(() => import("./pages/Private/Products/Products"));
const Categories = lazy(() => import("./pages/Private/Categories/Categories"));



function App() {
  return (
    <div className="App">
      <ShoppingCartProvider>
        <Suspense fallback={<>Cargando</>}>
          <Provider store={store}>
            <HashRouter>
              <RoutesWithNotFound>
                <Route path="/" element={<Home />} />
                <Route path={PublicRoutes.LOGIN} element={<Login />} />
                <Route path={PublicRoutes.REGISTER} element={<Register />} />
                <Route path={PublicRoutes.SHOP} element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path={PublicRoutes.ORDER} element={<Order />} />
                <Route element={<AuthGuard privateValidation={true} />}>
                  <Route
                    path={`${AdminRoutes.PRIVATE}/*`}
                    element={<Private />}
                  />
                </Route>
                <Route element={<RoleGuard rol={Roles.USER} />}>
                  <Route path={AdminRoutes.DASHBOARD} element={<Dashboard />} />
                </Route>
                <Route element={<RoleGuard rol={Roles.ADMIN} />}>
                  <Route path={AdminRoutes.DASHBOARD} element={<Dashboard />} />
                  <Route path={AdminRoutes.USERS} element={<Users />} />
                  <Route path={AdminRoutes.PRODUCTS} element={<Products />} />
                  <Route
                    path={AdminRoutes.CATEGORIES}
                    element={<Categories />}
                  />
                  <Route path={AdminRoutes.PROFILE} element={<Profile />} />
                </Route>
              </RoutesWithNotFound>
            </HashRouter>
          </Provider>
        </Suspense>
      </ShoppingCartProvider>
    </div>
  );
}

export default App;