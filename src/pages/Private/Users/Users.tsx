import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { Roles, UserInfo } from "../../../models";
import { Navigate } from "react-router-dom";
import UserTable from "../../../components/UserTable/UserTable"; // Importa el nuevo componente
import { Footer } from "../../../components/Footer";

const Users: React.FC = () => {
  const userRole = useSelector((state: UserInfo) => state.user.rol);

  if (userRole !== Roles.ADMIN) {
    return <Navigate replace to="../dashboard" />;
  }

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar userRole={userRole} />

        <div className="flex-grow-1 p-4">
          {/* Componente UserTable */}
          <UserTable />
        </div>
      </div>
    <Footer />
    </>
  );
};

export default Users;
