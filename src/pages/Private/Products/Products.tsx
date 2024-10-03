import React, { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
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
} from "../../../services";
import Alert from "../../../components/alert/Alert";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  category: string;
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetProducts(0);
        if (response.products.length > 0) {
          setProducts(response.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
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
        image: "",
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

const handleSaveProduct = async () => {
  try {
    const NewproductPost = {
      id: selectedProduct?.id ?? 0,
      name: newProduct.name,
      price: newProduct.price,
      image: newProduct.image,
      desc: newProduct.desc,
      category: newProduct.category,
      active: 1,
    };

    if (editMode && selectedProduct) {
      const result = await UpdateProductPost(NewproductPost);
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
      const result = await AddProductPost(NewproductPost);
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
          <div className="d-flex justify-content-start mb-3">
            <Button
              variant="primary"
              onClick={() => handleShow(null)}
              className="d-flex align-items-center"
            >
              <i className="bi bi-plus me-2"></i>{" "}
              {/* Icono de agregar de Bootstrap Icons */}
              Agregar Producto
            </Button>
          </div>

          {products.length === 0 ? (
            <h1>No hay productos disponibles</h1>
          ) : (
            <div className="row">
              {products
                .sort((a, b) => b.active - a.active) // Ordenar por 'active', primero los activos (1) luego los inactivos (0)
                .map((product) => (
                  <div className="col-md-4 mb-4" key={product.id}>
                    <Card className="h-100">
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.category}</Card.Text>
                        <Card.Text>{product.desc}</Card.Text>
                        <Card.Text>
                          <strong>Precio:</strong> ${product.price}
                        </Card.Text>
                        <div className="d-flex" style={{ gap: "10px" }}>
                          <Button
                            variant="warning"
                            onClick={() => handleShow(product)}
                            className="d-flex align-items-center"
                          >
                            <i className="bi bi-pencil me-2"></i>
                            Editar
                          </Button>

                          <Button
                            variant={
                              product.active === 1 ? "danger" : "success"
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
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Editar Producto" : "Agregar Nuevo Producto"}
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
                placeholder="Nombre"
                value={newProduct.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="desc"
                rows={3}
                placeholder="Descripción"
                value={newProduct.desc}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="0.00"
                value={newProduct.price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Categoría
              </label>
              <select
                className="form-select"
                id="category"
                value={newProduct.category}
                onChange={handleChange}
              >
                <option value="">Seleccione una categoría</option>
                <option value="electronics">Electrónicos</option>
                <option value="clothing">Ropa</option>
                <option value="books">Libros</option>
                <option value="home">Hogar</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                URL de la Imagen
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="URL de la Imagen"
                value={newProduct.image}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveProduct}>
            Guardar Producto
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
