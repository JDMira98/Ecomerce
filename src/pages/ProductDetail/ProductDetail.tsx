import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../utilities/formatCurrency";
import "../../css/ProductDetail.css";
import Navbar from "../../components/navbar/Navbar";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartControl from "../../components/StoreItemButton/StoreItemButton";
import { GetProducts } from "../../services";
import BuyButton from "../../components/BuyButton/BuyButton"; // Asegúrate de importar el componente

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[]; // Cambiado a array de imágenes
  desc: string;
  category: string;
  active: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>(""); // Imagen principal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await GetProducts(Number(id)); // Obtener producto desde el servicio
        const productData = response.products[0];

        // Deserializar imágenes (ya que vienen como un string JSON)
        const images = JSON.parse(productData.images);

        // Establecer el producto y la imagen principal
        setProduct({ ...productData, images });
        setMainImage(images[0] || ""); // Establecer la primera imagen como principal

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error al cargar el producto");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

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
            {product.images.map((imgSrc, index) => (
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

          {/* Botón de compra debajo de la descripción */}
          {quantity > 0 ? (
            <BuyButton  />
          ) : (
            <h1>Agrégalo al carrito!</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
