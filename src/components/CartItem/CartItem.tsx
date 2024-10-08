import React, { useEffect, useState } from "react";
import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utilities/formatCurrency";
import { GetProducts } from "../../services";
import "bootstrap-icons/font/bootstrap-icons.css"; // Importar los íconos de Bootstrap

type CartItemProps = {
  id: number;
  quantity: number;
};

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[]; // Cambiado a un array de imágenes
  desc: string;
  category: string;
  active: number;
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const [item, setItem] = useState<null | {
    id: number;
    name: string;
    price: number;
    images: string[];
  }>(null);

  // Obtener el producto por ID desde el servicio
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await GetProducts(id); // Llama al servicio con el ID
        const product = response.products.find((p: Product) => p.id === id);

        if (product) {
          // Intentamos deserializar las imágenes si están en formato JSON string
          let images;
          if (typeof product.images === "string") {
            try {
              images = JSON.parse(product.images);
            } catch (error) {
              console.error("Error parsing images:", error);
              images = []; // Si hay error, usamos un array vacío
            }
          } else {
            images = product.images;
          }

          // Actualizamos el estado con el producto obtenido
          setItem({
            id: product.id,
            name: product.name,
            price: product.price,
            images: images, // Array de imágenes
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (item === null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      
      <img
        src={item.images[0]} // Usamos la primera imagen del array
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
        alt={item.name}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              X{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
    </Stack>
  );
}

export default CartItem;
