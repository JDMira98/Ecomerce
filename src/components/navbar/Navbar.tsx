import React from "react";
import { Logout } from "../../components/logout";
import { AppStore } from "../../redux/store"; // Asegúrate de importar correctamente tu store
import { useSelector } from "react-redux";


const Navbar: React.FC = () => {
  // Obtener el nombre del usuario desde el estado de Redux
  const userName = useSelector((state: AppStore) => state.user.name);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {/* Texto centrado con el nombre del usuario */}
              <span className="navbar-text fs-5 fw-semibold me-3   text-center">
                {userName ? ` ${userName}` : "Cargando..."}
              </span>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;