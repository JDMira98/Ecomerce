import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Col } from "react-bootstrap";
import { StoreItem } from "../../components/StoreItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetProducts } from "../../services";
import "bootstrap-icons/font/bootstrap-icons.css"; // Importar los íconos de Bootstrap
import "../../css/Slider.css"; // Añadir el CSS para las flechas
import WhatsAppButton  from "../../components/WhatsappButton/WhatsappButton";
function Home() {
  const [products, setProducts] = useState([]);

  interface Product {
    id: number;
    name: string;
    price: number;
    images: string[]; // Cambiado a un array de imágenes
    desc: string;
    category: string;
    active: number;
  }

  // Obtener productos al montar el componente
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await GetProducts(0);
        if (response.products.length > 0) {
          const deserializedProducts = response.products.map(
            (product: Product) => {
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

          const filteredProducts = deserializedProducts.filter(
            (product) => product.active === 1 && product.images.length > 0
          );

          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Componente para las flechas
  const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-next-arrow`} onClick={onClick}>
        <i className="bi bi-chevron-compact-right"></i>{" "}
        {/* Icono de Bootstrap */}
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-prev-arrow`} onClick={onClick}>
        <i className="bi bi-chevron-compact-left"></i>{" "}
        {/* Icono de Bootstrap */}
      </div>
    );
  };

  // Configuración del slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />, // Flecha siguiente personalizada
    prevArrow: <PrevArrow />, // Flecha anterior personalizada
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
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
              <Col key={product.id}>
                <StoreItem {...product} />
              </Col>
            ))}
          </Slider>
        </div>
        <WhatsAppButton />
      </div>
    </>
  );
}

export default Home;
