import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import { AuthGuard, RoleGuard } from "./guards";
import { AdminRoutes, PrivateRoutes, PublicRoutes, Roles } from "./models";
import { Dashboard, Users } from "./pages/Private";
import store from "./redux/store";
import { RoutesWithNotFound } from "./utilities";
import "bootstrap-icons/font/bootstrap-icons.css";


const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Private = lazy(() => import("./pages/Private/Private"));
const Home = lazy(() => import("./pages/Home/Home"));
const Profile = lazy(() => import("./pages/Private/Profile/Profile"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>Cargando</>}>
        <Provider store={store}>
          <HashRouter>
            <RoutesWithNotFound>
              <Route path="/" element={<Home />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
              <Route element={<RoleGuard rol={Roles.USER} />}>
                <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
              </Route>
              <Route element={<RoleGuard rol={Roles.ADMIN} />}>
                <Route path={AdminRoutes.DASHBOARD} element={<Dashboard />} />
                <Route path={AdminRoutes.USERS} element={<Users />} />
                <Route path={AdminRoutes.PROFILE} element={<Profile />} />
              </Route>
            </RoutesWithNotFound>
          </HashRouter>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;