
import {GiShoppingCart} from "react-icons/gi";
import { useCarrito } from "../../context/ContextCart"; 
import BuyProduct from "../itemDetaild/BuyProduct";

function CartWidget() {
  const { carrito, removeFromCarrito, active, setActive } = useCarrito();

  const handleRemoveFromCarrito = (productId) => {
    removeFromCarrito(productId);
  };

  const handleIconClick = () => {
    setActive(!active);
  };

  return(
    <div className="icon-shopping-cart">
      <GiShoppingCart onClick={handleIconClick}/>
      <span className="count-shopping">{carrito.length}</span>
      
      <div className={`items-cart-widget ${active ? "active" : ""}`}>
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>Precio: ${item.price}</p>
              </div>
              <button className="btn-remove" onClick={() => handleRemoveFromCarrito(item.id)}>x</button>
            </li>
          ))}
        </ul>
        
        <BuyProduct classNames={'cart-widget-buy-produc'} />
      </div>
    </div>
  );
}

export default CartWidget;