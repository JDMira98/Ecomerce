import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartControl from "../../components/StoreItemButton/StoreItemButton"; // Importar el componente
import "../../css/storeItems.css"
type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  images: string;
};

export function StoreItem({ id, name, price, images }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="cardstoreitems">
      <Link to={`/product/${id}`}>
        <Card.Img variant="top" src={images[0]} className="imgcontrol" />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-6">{name}</span>
        </Card.Title>
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <CartControl
          quantity={quantity}
          increaseCartQuantity={() => increaseCartQuantity(id)}
          decreaseCartQuantity={() => decreaseCartQuantity(id)}
          removeFromCart={() => removeFromCart(id)}
        />
      </Card.Body>
    </Card>
  );
}

export default StoreItem;
