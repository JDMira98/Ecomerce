import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Col } from "react-bootstrap";
import { StoreItem } from "../../components/StoreItem";
import Slider from "react-slick"; // Importar Slider de react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetProducts } from "../../services";

function Home() {
  const [products, setProducts] = useState([]);

  // Obtener productos al montar el componente
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await GetProducts(0);
        if (response.products.length > 0) {
          // Filtrar solo los productos que tienen active = 1
          const activeProducts = response.products.filter(
            (product) => product.active === 1
          );
          setProducts(activeProducts); // Asignar productos filtrados del response
        }
      } catch (error) {
        console.error("Error fetching products", error);
      }
    }
    fetchProducts();
  }, []);

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
            {products.map((product) => (
              <Col key={product.id} style={{ padding: "5px" }}>
                <StoreItem {...product} />
              </Col>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Home;
