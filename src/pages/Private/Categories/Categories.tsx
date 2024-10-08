import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { UserInfo, Roles } from "../../../models";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  GetCategoriesGET,
  AddCategoriePost,
  UpdateCategoriePost,
  EnablecategoriePost,
  DisableCategoriePost,
} from "../../../services";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";

interface Category {
  id: number;
  name: string;
  description: string;
  active: number; // Cambiado a number (1 o 0)
}

const CategoriesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false); // Para saber si estamos editando
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null); // Nueva categoría para manejar la edición
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    active: 1, // Por defecto la categoría es activa (1)
  });
  const userRole = useSelector((state: UserInfo) => state.user.rol); // Obtener el rol del usuario

  // Cargar categorías al montar el componente
  useEffect(() => {
    async function fetchCategories() {
      const response = await GetCategoriesGET(0); // Cargar categorías
      if (response) {
        setCategories(response.categories);
      }
    }
    fetchCategories();
  }, []);

  const handleShowModal = () => {
    setNewCategory({ name: "", description: "", active: 1 }); // Resetear los datos cuando se va a agregar
    setEditMode(false); // Desactivar el modo edición
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editMode && currentCategory) {
      // Si estamos en modo de edición, actualizar la categoría actual
      setCurrentCategory((prev) => (prev ? { ...prev, [name]: value } : prev));
    } else {
      // Si no, simplemente estamos agregando
      setNewCategory((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCategory = async () => {
    try {
      const lastCategoryId =
        categories.length > 0 ? categories[categories.length - 1].id : 0;
      const newId = lastCategoryId + 1;

      const AddCategorie = {
        id: newId, // Asignar el nuevo ID
        name: newCategory.name,
        description: newCategory.description,
        active: 1,
      };

      const response = await AddCategoriePost(AddCategorie);

      if (response === "categorie added successfully.") {
        setCategories((prev) => [...prev, AddCategorie]);
        setNewCategory({ name: "", description: "", active: 1 });
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
    }
  };

  const handleToggleActive = async (id: number, isActive: number) => {
    try {
      if (isActive === 1) {
        await DisableCategoriePost(id); // Deshabilitar categoría
      } else {
        await EnablecategoriePost(id); // Habilitar categoría
      }

      setCategories((prev) =>
        prev.map((category) =>
          category.id === id
            ? { ...category, active: category.active === 1 ? 0 : 1 }
            : category
        )
      );
    } catch (error) {
      console.error("Error al cambiar el estado de la categoría:", error);
    }
  };

  const handleEditCategory = (id: number) => {
    const categoryToEdit = categories.find((cat) => cat.id === id);
    if (categoryToEdit) {
      setCurrentCategory(categoryToEdit); // Guardar la categoría actual para edición
      setEditMode(true); // Cambiar al modo edición
      setShowModal(true); // Abrir el modal
    }
  };

  const handleUpdateCategory = async () => {
    if (currentCategory) {
      try {
        const response = await UpdateCategoriePost(currentCategory);
        if (response === "Categorie updated successfully.") {
          setCategories((prev) =>
            prev.map((cat) =>
              cat.id === currentCategory.id
                ? { ...cat, ...currentCategory }
                : cat
            )
          );
          handleCloseModal(); // Cerrar el modal
        }
      } catch (error) {
        console.error("Error al actualizar la categoría:", error);
      }
    }
  };

  if (userRole !== Roles.ADMIN) {
    return <Navigate replace to="../" />;
  }

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar userRole={userRole} />
        <div className="container">
          <h2>Categorías</h2>
          <Button variant="primary" onClick={handleShowModal}>
            Agregar Categoría
          </Button>

          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      checked={category.active === 1}
                      onChange={() =>
                        handleToggleActive(category.id, category.active)
                      }
                      label={
                        category.active === 1 ? "" : ""
                      }
                    />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEditCategory(category.id)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal para agregar/editar categoría */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editMode ? "Editar Categoría" : "Agregar Categoría"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="categoryName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={
                      editMode && currentCategory
                        ? currentCategory.name
                        : newCategory.name
                    }
                    onChange={handleInputChange}
                    placeholder="Ingrese el nombre de la categoría"
                  />
                </Form.Group>

                <Form.Group controlId="categoryDescription" className="mt-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={
                      editMode && currentCategory
                        ? currentCategory.description
                        : newCategory.description
                    }
                    onChange={handleInputChange}
                    placeholder="Ingrese la descripción"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              {editMode ? (
                <Button variant="primary" onClick={handleUpdateCategory}>
                  Actualizar
                </Button>
              ) : (
                <Button variant="primary" onClick={handleAddCategory}>
                  Agregar
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
