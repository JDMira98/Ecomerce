import React, { useState, useEffect } from "react";
import { formatCurrency } from "../../utilities/formatCurrency";
import { GetProducts } from "../../services";
import { Button, Form } from "react-bootstrap";
import "../../css/order.css";
import Navbar from "../../components/navbar/Navbar";
import { useShoppingCart } from "../../context/ShoppingCartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string;
  desc: string;
  category: string;
  active: number;
}

const Order: React.FC = () => {
  const { cartItems } = useShoppingCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    cedula: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    departamento: "",
  });

  // Obtener productos al montar el componente
  useEffect(() => {
    async function fetchProducts() {
      try {
        if (cartItems.length > 0) {
          const ids = cartItems.map((item) => item.id); // Cambiado a `item.id`
          const response = await GetProducts(0);
          const fetchedProducts = response.products.filter((product: Product) =>
            ids.includes(product.id)
          );
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [cartItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    // Aquí puedes manejar la lógica de envío de datos
  };

  // Calcular total
  const totalAmount = products.reduce((total, product) => {
    const item = cartItems.find((p) => p.id === product.id); // Cambiado a `p.id`
    return total + (item ? product.price * item.quantity : 0); // Asegúrate que `item.quantity` existe
  }, 0);

  return (
    <>
      <Navbar />

      <div className="pedido-container">
        <h2>Detalle del Pedido</h2>

        {products.length > 0 ? (
          products.map((product) => {
            const selectedItem = cartItems.find((p) => p.id === product.id); // Cambiado a `p.id`
            return (
              <div key={product.id} className="pedido-detalle">
                <img
                  src={JSON.parse(product.images)[0]}
                  alt={product.name}
                  className="pedido-imagen"
                />
                <h3>{product.name}</h3>
                <p>Cantidad: {selectedItem?.quantity}</p>{" "}
                {/* Asegúrate que `quantity` está definido */}
                <p>Precio Unitario: {formatCurrency(product.price)}</p>
              </div>
            );
          })
        ) : (
          <p>Cargando detalles del producto...</p>
        )}

        <p className="envio-gratis">¡Envío Gratis!</p>
        <p className="total">Total: {formatCurrency(totalAmount)}</p>

        <Form onSubmit={handleSubmit} className="pedido-form">
          <h3>Datos de Envío</h3>
          <Form.Group controlId="nombreCompleto">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="cedula">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="telefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="ciudad">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="departamento">
            <Form.Label>Departamento</Form.Label>
            <Form.Control
              type="text"
              name="departamento"
              value={formData.departamento}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button className="w-100 toBuybutton" type="submit">
            Confirmar Pedido
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Order;
