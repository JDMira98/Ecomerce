import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Col } from "react-bootstrap";
import storeItems from "../../data/items.json";
import { StoreItem } from "../../components/StoreItem";
import { ShoppingCartProvider } from "../../context/ShoppingCartContext";
import Slider from "react-slick"; // Importar Slider de react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  // Configuración del slider
  const sliderSettings = {
    dots: true, // Muestra puntos de navegación
    infinite: true, // Loop infinito
    speed: 500, // Velocidad del slider
    slidesToShow: 3, // Cantidad de slides que se muestran a la vez en pantallas grandes
    slidesToScroll: 1, // Número de slides que se desplazan por vez
    responsive: [
      {
        breakpoint: 1024, // Para pantallas medianas
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Para pantallas pequeñas
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        {/* Contenedor centrado con padding */}
        <div
          className="d-flex justify-content-center"
          style={{ padding: "20px" }}
        >
          <div style={{ maxWidth: "1200px", width: "100%" }}>
            <h2
              className="d-flex justify-content-center"
              style={{ color: "GrayText" }}
            >
              Creamos una experiencia...
            </h2>
            <Slider {...sliderSettings}>
              {storeItems.map((item) => (
                <Col key={item.id}>
                  <StoreItem {...item} />
                </Col>
              ))}
            </Slider>
          </div>
        </div>
      </ShoppingCartProvider>
    </>
  );
}

export default Home;
