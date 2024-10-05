import React, { useEffect, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "../CartItem";
import { formatCurrency } from "../../utilities/formatCurrency";
import { GetProducts } from "../../services";
import "../../css/BuyButton.css"

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [products, setProducts] = useState([]);

  // Obtener productos al montar el componente
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await GetProducts(0);
        if (response.products.length > 0) {
          // Guardar los productos en el estado
          setProducts(response.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((cartItem) => {
            // Buscar el producto correspondiente en el estado de productos
            products.find((i) => i.id === cartItem.id);
            return <CartItem key={cartItem.id} {...cartItem} />;
          })}
          {cartItems.length > 0 ? 
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = products.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div> : null }
        </Stack>

        {cartItems.length > 0 ? 
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a
            style={{
              textDecoration: "none",
              color: "white",
              width: "100%",
              textAlign: "center", // Asegúrate de que el texto esté centrado
              padding: "10px 0", // Agrega un padding para mejorar el clic
              backgroundColor: "black", // Establece un color de fondo si es necesario
              marginTop:"25px"
            }}
            className="toBuybutton"
            href="/#/order"
          >
            Comprar
          </a>
        </div> : <h3>No hay productos en el carrito</h3>}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
