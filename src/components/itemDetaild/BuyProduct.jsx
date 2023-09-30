import { Link } from "react-router-dom";
import {GiShoppingCart} from "react-icons/gi";
import { useCarrito } from '../../context/ContextCart';

const BuyProduct = ({classNames}) => {
  const {addToCarrito} = useCarrito();

  const handleAgregarAlCarro = () => {
    addToCarrito();
  };

  return (
    <Link to="/parchese-detail" className={classNames}>
      <button className={`buy-product ${classNames}`} onClick={handleAgregarAlCarro}>
        comprar producto
        <GiShoppingCart className='buy-product-icon'/>
      </button>
    </Link>
  );
}

export default BuyProduct;
