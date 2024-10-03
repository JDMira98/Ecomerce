import React from "react";
import { Button } from "react-bootstrap";

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
        <Button className="w-100" onClick={increaseCartQuantity}>
          + Add to Cart
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
            <Button onClick={decreaseCartQuantity}>-</Button>
            <div>
              <span className="fs-3">{quantity}</span> in cart
            </div>
            <Button onClick={increaseCartQuantity}>+</Button>
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
