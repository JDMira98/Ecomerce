import React, { useEffect, useState } from "react";
import { GetUsers } from "../../services";

// Simula una llamada a la API que obtiene todos los usuarios
const fetchUsers = async () => {
  const response = await GetUsers(0);
  console.log("res: "+ response);
  if (response.output !== "Todos los usuarios retornados.") {
    throw new Error("Error al obtener los usuarios");
  }
     const data = await response.users;
     return data;
};

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamar a la API cuando el componente se monta
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Usuarios</h2>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
