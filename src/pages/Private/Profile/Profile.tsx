import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppStore, } from "../../../redux/store";
import { GetUsers, UpdateUserPost } from "../../../services"; // Servicio para obtener el perfil
import { UserKey, updateUser } from "../../../redux/states/user"; // Ajusta esto según tu estructura
import { clearLocalStorage } from "../../../utilities"; // Para limpiar datos si es necesario
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "../../../css/profile.css"; // Importa el archivo CSS para estilos personalizados
import Alert from "../../../components/alert/Alert";
import { Navigate } from "react-router-dom";
import { UserInfo, Roles } from "../../../models";
import { Footer } from "../../../components/Footer";

const Profile: React.FC = () => {

  

  const dispatch = useDispatch();
  const userId = useSelector((state: AppStore) => state.user.id); // Asegurarse que "id" esté bien definido
  const userRole = useSelector((state: UserInfo) => state.user.rol); // Obtener el rol del usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );

   const [userData, setUserData] = useState<{
     id: number;
     name: string;
     email: string;
     phone: string;
   }>({
     id: 0,
     name: "",
     email: "",
     phone: ""
   });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await GetUsers(userId); // Asegúrate de que la API responde correctamente
        if (response.users && response.users.length > 0) {
          setUserData({
            id: response.users[0].id,
            name: response.users[0].name,
            email: response.users[0].email,
            phone: response.users[0].phone,
          });
        } else {
          setError("No se encontraron datos del usuario");
        }
      } catch (err) {
        setError("Error al cargar el perfil: " + err);
      } finally {
        setLoading(false);
      }
    };

    if (userId !== 0) {
      fetchUserProfile();
    } else {
      clearLocalStorage(UserKey); // Limpiar datos si el usuario no está logueado
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(updateUser(userData)); // Actualizar el perfil
      const result = await UpdateUserPost(userData);
      
      if (result === "User updated successfully.") {
        setAlertType("success");
        setAlertMessage("Usuario actualizado correctamente.");
        setShowAlert(true);

        // Desvanece la alerta después de 3 segundos
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }

      
    } catch (error) {
      setError("Error al actualizar el perfil: " + error);
    }
  };

  if (userRole !== Roles.ADMIN) {
    return <Navigate replace to="../" />;
  }


  if (loading) return <div>Cargando perfil...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div style={{marginBottom:"200px"}} className="d-flex">
        {/* Sidebar con el rol como parámetro */}
        <Sidebar userRole={userRole} />
        <div className="container mt-5 d-flex justify-content-center align-items-top">
          <div className="profile-form-container">
            <h1 className="text-center">Perfil de Usuario</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Guardar Cambios
              </button>
            </form>
          </div>
          {showAlert && <Alert message={alertMessage} type={alertType} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
