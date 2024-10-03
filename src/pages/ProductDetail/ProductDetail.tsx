import React, { useState } from "react";
import { useParams } from "react-router-dom";
import storeItems from "../../data/items.json";
import { formatCurrency } from "../../utilities/formatCurrency";
import "../../css/ProductDetail.css";
import Navbar from "../../components/navbar/Navbar";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartControl from "../../components/StoreItemButton/StoreItemButton";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  // Usamos useState para la imagen principal, inicializamos con una imagen por defecto
  const [mainImage, setMainImage] = useState("");

  const product = storeItems.find((item) => item.id === Number(id));

  // Si el producto existe, asignamos la imagen principal solo después de buscar el producto
  React.useEffect(() => {
    if (product) {
      setMainImage(product.imgUrl);
    }
  }, [product]);

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  // Placeholder de imágenes adicionales
  const productImages = [
    product.imgUrl,
    "./imgs/book.jpg",
    "./imgs/car.jpg",
    "./imgs/computer.jpg",
  ];

  const quantity = getItemQuantity(Number(id));

  return (
    <>
      <Navbar />
      <div className="product-detail-container">
        {/* Sección de imagen del producto y lista de imágenes adicionales */}
        <div className="product-image-section">
          <img src={mainImage} alt={product.name} className="main-image" />

          {/* Lista de imágenes adicionales */}
          <div className="image-gallery">
            {productImages.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Producto imagen ${index + 1}`}
                className="thumbnail-image"
                onClick={() => setMainImage(imgSrc)} // Cambia la imagen principal
              />
            ))}
          </div>
        </div>

        {/* Sección de información del producto */}
        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="product-price">{formatCurrency(product.price)}</p>

          {/* Control de carrito */}
          <CartControl
            quantity={quantity}
            increaseCartQuantity={() => increaseCartQuantity(product.id)}
            decreaseCartQuantity={() => decreaseCartQuantity(product.id)}
            removeFromCart={() => removeFromCart(product.id)}
          />

          {/* Descripción del producto */}
          <div className="product-description">
            <h3>Descripción</h3>
            <p>
              {product.desc ||
                "No hay descripción disponible para este producto."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
