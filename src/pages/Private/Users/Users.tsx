import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { UserInfo } from "../../../models";

const Users: React.FC = () => {
  const userRole = useSelector((state: UserInfo) => state.rol);
  return (
    <>
      <Navbar />
      <div className="d-flex">
        {/* Sidebar con el rol como parámetro */}
        <Sidebar userRole={userRole} />

        {/* Contenido del Dashboard */}
        <div className="flex-grow-1 p-4">
          <h1>Bienvenido al Users</h1>
          {/* Aquí va el contenido del dashboard */}
        </div>
      </div>
    </>
  );
};

export default Users;
