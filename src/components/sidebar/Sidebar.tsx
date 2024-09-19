import { NavLink } from "react-router-dom";

function Sidebar({ userRole }) {
  return (
    <div
      className="d-flex flex-column p-3 bg-light"
      style={{ width: "250px", height: "100vh" }}
    >
      <h2>Mi Aplicación</h2>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="../../private/Dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Perfil
          </NavLink>
        </li>

        {/* Sección visible solo para Admin */}
        {userRole === "Admin" && (
          <>
            <li className="mt-3">
              <span className="text-muted">Administración</span>
            </li>
            <li>
              <NavLink
                to="../../private/Users"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Usuarios
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
