import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { UserInfo, Roles} from "../../../models";
import { Navigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const userRole = useSelector((state: UserInfo) => state.user.rol);
    if (userRole !== Roles.ADMIN) {
      return <Navigate replace to="../../" />;
    }
  return (
    <>
      <Navbar />
      <div className="d-flex">
        {/* Sidebar con el rol como parámetro */}
        <Sidebar userRole={userRole} />

        {/* Contenido del Dashboard */}
        <div className="flex-grow-1 p-4">
          {/* Panel de resumen */}
          <section>
            <h2>Resumen</h2>
            <div className="row">
              <div className="col-md-4">Total Ventas: $XX</div>
              <div className="col-md-4">Órdenes Recientes: XX</div>
              <div className="col-md-4">Productos Más Vendidos: XX</div>
            </div>
          </section>

          {/* Gestión de pedidos */}
          <section>
            <h2>Gestión de Pedidos</h2>
            {/* Tabla de pedidos */}
          </section>

          {/* Gestión de productos */}
          <section>
            <h2>Gestión de Productos</h2>
            {/* Tabla de productos */}
          </section>

          {/* Gestión de usuarios */}
          <section>
            <h2>Gestión de Usuarios</h2>
            {/* Tabla de usuarios */}
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
