import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../../components/StoreItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetProducts, GetCategoriesGET } from "../../services"; // Añadir GetCategories
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/Slider.css";
import WhatsAppButton from "../../components/WhatsappButton/WhatsappButton";
import Banner from "../../components/Banner/Banner";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Estado para las categorías

  interface Product {
    id: number;
    name: string;
    price: number;
    images: string[];
    desc: string;
    category: string;
    active: number;
  }

    interface Category {
      id: number;
      name: string;
      desc: string;
      active: number;
    }

  // Obtener productos y categorías al montar el componente
useEffect(() => {
  async function fetchData() {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        GetProducts(0),
        GetCategoriesGET(0), // Llamada a GetCategories
      ]);

      // Procesar productos
      if (productsResponse.products.length > 0) {
        const deserializedProducts = productsResponse.products.map(
          (product: Product) => {
            let images;
            if (typeof product.images === "string") {
              try {
                images = JSON.parse(product.images);
              } catch (error) {
                console.error("Error parsing images:", error);
                images = [];
              }
            } else {
              images = product.images;
            }

            return { ...product, images };
          }
        );

        const filteredProducts = deserializedProducts.filter(
          (product) => product.active === 1 && product.images.length > 0
        );
        setProducts(filteredProducts);
      }

      // Procesar categorías y filtrar las que estén activas
      if (categoriesResponse.categories.length > 0) {
        const activeCategories = categoriesResponse.categories.filter(
          (category: Category) => category.active === 1
        );
        setCategories(activeCategories); // Solo las categorías activas
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchData();
}, []);

  // Componente para las flechas
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-next-arrow`} onClick={onClick}>
        <i className="bi bi-chevron-compact-right"></i>{" "}
        {/* Icono de Bootstrap */}
      </div>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-prev-arrow`} onClick={onClick}>
        <i className="bi bi-chevron-compact-left"></i>{" "}
        {/* Icono de Bootstrap */}
      </div>
    );
  };

  // Animación para los productos
  const fadeInAnimation = {
    animation: "fadeIn 0.5s ease-in",
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
      <Banner />
      {/* Sección de categorías */}
      <div className="categories-section" style={{ marginTop: "50px" }}>
        <h3
          className="d-flex justify-content-center"
          style={{ color: "GrayText" }}
        >
          Categorías Populares
        </h3>
        <Row className="justify-content-center">
          {categories.map((category) => (
            <Col
              key={category.id}
              className="category-item"
              md={3}
              style={{ margin: "10px 0" }}
            >
              <div
                className="category-card"
                style={{
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid lightgray",
                }}
              >
                <h5>{category.name}</h5>
              </div>
            </Col>
          ))}
        </Row>
      </div>
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

          {/* Slider de productos */}
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <Col key={product.id} style={fadeInAnimation}>
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
