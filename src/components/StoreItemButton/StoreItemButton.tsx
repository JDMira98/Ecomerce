import React from "react";
import { Button } from "react-bootstrap";
import "../../css/storeItems.css"
import "bootstrap-icons/font/bootstrap-icons.css"; // Importar los íconos de Bootstrap

type CartControlProps = {
  quantity: number;
  increaseCartQuantity: () => void;
  decreaseCartQuantity: () => void;
  removeFromCart: () => void;
};

const CartControl = ({
  quantity,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
}: CartControlProps) => {
  return (
    <div className="mt-auto">
      {quantity === 0 ? (
        <Button className="w-50 buttoncart" onClick={increaseCartQuantity}>
          <i className="bi bi-cart"> </i>
          Agregar
        </Button>
      ) : (
        <div
          className="d-flex align-items-center flex-column"
          style={{ gap: ".5rem" }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: ".5rem" }}
          >
            <Button className="buttoncart" onClick={decreaseCartQuantity}>
              <i className="bi bi-dash"></i>
            </Button>
            <div>
              <span className="fs-3">{quantity}</span> En carrito
            </div>
            <Button className="buttoncart " onClick={increaseCartQuantity}>
              <i className="bi bi-plus"></i>
            </Button>
          </div>
          <Button variant="danger" size="sm" onClick={removeFromCart}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartControl;
