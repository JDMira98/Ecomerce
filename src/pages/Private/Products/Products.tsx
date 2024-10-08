import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/Products.css";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Navigate } from "react-router-dom";
import { UserInfo, Roles } from "../../../models";
import { useSelector } from "react-redux";
import {
  AddProductPost,
  GetProducts,
  UpdateProductPost,
  DisableProductPost,
  EnableProductPost,
  GetCategoriesGET,
} from "../../../services";
import Alert from "../../../components/alert/Alert";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[]; // Cambiado a un array de imágenes
  desc: string;
  category: string;
  active: number;
}

    interface Category {
      id: number;
      name: string;
      desc: string;
      active: number;
    }

export default function ProductsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error" | "warning">(
    "success"
  );
  const [searchTerm, setSearchTerm] = useState<string>(""); // Para el buscador
  const [categoryFilter, setCategoryFilter] = useState<string>(""); // Para el filtro por categoría

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetProducts(0);
        if (response.products.length > 0) {
          // Mapeamos los productos para asegurarnos de que las imágenes estén deserializadas
          const deserializedProducts = response.products.map(
            (product: Product) => {
              // Intentamos deserializar images solo si es un string
              let images;
              if (typeof product.images === "string") {
                try {
                  images = JSON.parse(product.images); // Intentamos deserializar
                } catch (error) {
                  console.error("Error parsing images:", error);
                  images = []; // Asignar un array vacío si hay un error
                }
              } else {
                images = product.images; // Si ya es un array, lo usamos directamente
              }

              return {
                ...product,
                images, // Usar el array de imágenes
              };
            }
          );

          setProducts(deserializedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const [categories, setCategories] = useState<Category[]>([]); // Estado para categorías

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetCategoriesGET(0); // Llama al servicio para obtener las categorías
        setCategories(response.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    images: [""], // Cambiado a un array
    desc: "",
    category: "",
    active: 0,
  });

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedProduct(null);
  };

  const handleShow = (product: Product | null = null) => {
    if (product) {
      setNewProduct(product);
      setSelectedProduct(product);
      setEditMode(true);
    } else {
      setNewProduct({
        name: "",
        price: 0,
        images: [""], // Array vacío
        desc: "",
        category: "",
        active: 0,
      });
    }
    setShowModal(true);
  };

  const userRole = useSelector((state: UserInfo) => state.user.rol);

  if (userRole !== Roles.ADMIN) {
    return <Navigate replace to="../" />;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryFilter(e.target.value);
  };

  // Funciones para manejar las URLs de imágenes
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedImages = [...newProduct.images];
    updatedImages[index] = e.target.value;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      images: updatedImages,
    }));
  };

  const handleAddImage = () => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ""],
    }));
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = newProduct.images.filter((_, i) => i !== index);
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      images: updatedImages,
    }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSaveProduct = async () => {
    try {
      const NewproductPost = {
        id: selectedProduct?.id ?? 0,
        name: newProduct.name,
        price: newProduct.price,
        images: newProduct.images, // Usar el array de imágenes
        desc: newProduct.desc,
        category: newProduct.category,
        active: 1,
      };
      const NewproductPost1 = {
        id: selectedProduct?.id ?? 0,
        name: newProduct.name,
        price: newProduct.price,
        images: JSON.stringify(newProduct.images), // Usar el array de imágenes
        desc: newProduct.desc,
        category: newProduct.category,
        active: 1,
      };

      if (editMode && selectedProduct) {
        const result = await UpdateProductPost(NewproductPost1);
        if (result) {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.id === selectedProduct.id ? NewproductPost : p
            )
          );
          setAlertMessage("Producto actualizado correctamente.");
          setAlertType("success");
        }
      } else {
        const result = await AddProductPost(NewproductPost1);
        if (result) {
          setProducts((prevProducts) => [...prevProducts, NewproductPost]);
          setAlertMessage("Producto agregado correctamente.");
          setAlertType("success");
        }
      }

      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
      setAlertType("error");
      setAlertMessage("Error al guardar el producto.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleToggleProduct = async (product: Product) => {
    try {
      if (product.active === 1) {
        await DisableProductPost(Number(product.id));
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, active: 0 } : p
          )
        );
        setAlertMessage("Producto deshabilitado correctamente.");
      } else {
        await EnableProductPost(Number(product.id));
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, active: 1 } : p
          )
        );
        setAlertMessage("Producto habilitado correctamente.");
      }
      setAlertType("success");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error al cambiar el estado del producto:", error);
      setAlertType("error");
      setAlertMessage("Error al cambiar el estado del producto.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar userRole={userRole} />
        <div className="content-container p-4">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="mb-3">
            <Form.Select
              onChange={handleCategoryFilterChange}
              value={categoryFilter}
            >
              <option value="">Filtrar por categoría</option>
              {[...new Set(products.map((product) => product.category))].map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </Form.Select>
          </div>
          <div className="d-flex justify-content-start mb-3">
            <Button
              variant="primary"
              onClick={() => handleShow(null)}
              className="d-flex align-items-center"
            >
              <i className="bi bi-plus me-2"></i>
              Agregar Producto
            </Button>
          </div>
          {products.length === 0 ? (
            <h1>No hay productos disponibles</h1>
          ) : (
            <div className="row">
              {filteredProducts
                .sort((a, b) => b.active - a.active)
                .map((product) => (
                  <div className="col-md-4 mb-4" key={product.id}>
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0]
                            : undefined
                        } // Validar que images no sea undefined y mostrar la primera imagen si existe
                        alt={product.name}
                        className="product-image"
                      />
                      {(!product.images || product.images.length === 0) && (
                        <div className="no-image-text">No hay imágenes</div> // Mensaje si no hay imágenes
                      )}
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text style={{ marginTop: "20px" }}>
                          {product.category}
                        </Card.Text>
                        <Card.Text>
                          <strong>Precio:</strong> ${product.price}
                        </Card.Text>
                        <div className="d-flex" style={{ gap: "10px" }}>
                          <Button
                            variant="outline-warning"
                            onClick={() => handleShow(product)}
                            className="d-flex align-items-center"
                          >
                            <i className="bi bi-pencil me-2"></i>
                            Editar
                          </Button>
                          <Button
                            variant={
                              product.active === 1
                                ? "outline-danger"
                                : "outline-success"
                            }
                            onClick={() => handleToggleProduct(product)}
                            className="d-flex align-items-center"
                          >
                            {product.active === 1 ? (
                              <>
                                <i className="bi bi-x-circle me-2"></i>
                                Deshabilitar
                              </>
                            ) : (
                              <>
                                <i className="bi bi-check-circle me-2"></i>
                                Habilitar
                              </>
                            )}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
            </div>
          )}
        </div>
        {showAlert && <Alert message={alertMessage} type={alertType} />}
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Editar Producto" : "Agregar Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre del Producto
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={newProduct.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={newProduct.price}
                onChange={handleChange}
              />
            </div>

            {/* Manejo de múltiples URLs de imágenes */}
            {newProduct.images.length > 0 ? (
              newProduct.images.map((image, index) => (
                <div className="mb-3" key={index}>
                  <label htmlFor={`image-${index}`} className="form-label">
                    URL de Imagen {index + 1}
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      id={`image-${index}`}
                      value={image}
                      onChange={(e) => handleImageChange(e, index)}
                    />
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay imágenes. Agrega una imagen.</p>
            )}

            <Button variant="secondary" onClick={handleAddImage}>
              Agregar otra imagen
            </Button>

            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="desc"
                value={newProduct.desc}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Categoría
              </label>
              <select
                className="form-control"
                id="category"
                value={newProduct.category}
                onChange={handleChange}
              >
                <option value="">Selecciona una categoría</option>
                {categories
                  .filter((category) => category.active === 1) // Filtra solo las categorías activas
                  .map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            {editMode ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
