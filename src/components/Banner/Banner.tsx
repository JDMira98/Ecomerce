import React from "react";
import { Button } from "react-bootstrap";
import "../../css/Banner.css"; // Asegúrate de tener un archivo CSS para el banner

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-content">
        <h1 className="banner-title">Bienvenido a Harmony galeria.</h1>
        <p className="banner-subtitle">
          Las mejores ofertas y productos exclusivos
        </p>
        <Button className="banner-button" href="#/shop">
          Comprar Ahora
        </Button>
      </div>
    </div>
  );
};

export default Banner;
