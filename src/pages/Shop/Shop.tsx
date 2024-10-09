import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { GetProducts, GetCategoriesGET } from "../../services";
import { StoreItem } from "../../components/StoreItem";
import "../../css/Shop.css";
import Navbar from "../../components/navbar/Navbar";
import { Footer } from "../../components/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string;
  desc: string;
  category: string;
  active: number;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda

  // Obtener productos y categorías al montar el componente
  useEffect(() => {
    async function fetchData() {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          GetProducts(0),
          GetCategoriesGET(0),
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

        if (categoriesResponse.categories.length > 0) {
          setCategories(categoriesResponse.categories);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Filtrar productos por categoría seleccionada y término de búsqueda
  const filteredProducts = products
    .filter((product) => {
      return selectedCategory === "all"
        ? true
        : product.category === selectedCategory;
    })
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Navbar />
      <div className="shop-container">
        <h2 className="shop-title">Todos nuestros productos.</h2>

        {/* Buscador de productos */}
        <div style={{marginBottom:"20px"}} className="search-section">
          <Form.Control
            type="text"
            placeholder="Buscar productos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="product-search"
          />
        </div>

        {/* Filtro por categoría */}
        <div className="filter-section">
          <Form.Select
            aria-label="Filter by category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">Todas las categorías</option>
            {categories.filter((category) => category.active === 1).map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Mostrar productos */}
        <Row className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.filter((product) => product.active === 1).map((product) => (
              <Col
                key={product.id}
                xs={12}
                md={6}
                lg={4}
                className="product-item"
              >
                <StoreItem {...product} />
              </Col>
            ))
          ) : (
            <p>No hay productos que coincidan con la búsqueda</p>
          )}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
