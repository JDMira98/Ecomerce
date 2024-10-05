import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../css/BuyButton.css";

export const BuyButton: React.FC = () => {
  const navigate = useNavigate();

  const handleComprar = () => {
    navigate(`/order`); // Redirigir a la página de pedido
  };

  return (
    <Button className="w-100 toBuybutton" onClick={handleComprar}>
      Comprar
    </Button>
  );
};

export default BuyButton;
