import React, { useEffect, useState } from "react";
import { GetUsers, DisableUserPost, EnableUserPost } from "../../services";

const fetchUsers = async () => {
  const response = await GetUsers(0);
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
    fetchUsers()
      .then((data) => {
        // Ordenar usuarios, primero habilitados (active === 1), luego deshabilitados (active === 0)
        const sortedUsers = data.sort((a: any, b: any) => b.active - a.active);
        setUsers(sortedUsers);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleToggleUser = async (userId: number, isActive: number) => {
    try {
      if (isActive === 0) {
        await EnableUserPost(userId); // Habilitar usuario
      } else {
        await DisableUserPost(userId); // Deshabilitar usuario
      }

      // Actualizar el estado de los usuarios
      setUsers(
        (prevUsers) =>
          prevUsers
            .map((user) =>
              user.id === userId
                ? { ...user, active: isActive === 0 ? 1 : 0 }
                : user
            )
            .sort((a, b) => b.active - a.active) // Volver a ordenar después de cambiar el estado
      );
    } catch (err) {
      console.error("Error al cambiar el estado del usuario:", err);
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <table className="table table-bordered table-hover table-bg-semi-transparent">
        <thead className="thead-dark">
          <tr>
            <th>
              <i className="bi bi-person-badge"></i> ID
            </th>
            <th>
              <i className="bi bi-person"></i> Nombre
            </th>
            <th>
              <i className="bi bi-envelope"></i> Email
            </th>
            <th>
              <i className="bi bi-telephone"></i> Teléfono
            </th>
            <th>
              <i className="bi bi-people"></i> Rol
            </th>
            <th>
              <i className="bi bi-gear"></i> Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className={user.active === 0 ? "table-danger" : ""}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={`btn btn-${
                      user.active === 0 ? "success" : "danger"
                    } btn-sm me-2`}
                    onClick={() => handleToggleUser(user.id, user.active)}
                  >
                    {user.active === 0 ? (
                      <>
                        <i className="bi bi-check-circle me-1"></i> Habilitar
                      </>
                    ) : (
                      <>
                        <i className="bi bi-x-circle me-1"></i> Deshabilitar
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
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
