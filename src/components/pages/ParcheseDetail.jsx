import {Link} from 'react-router-dom';
import { useCarrito } from '../../context/ContextCart';


const ParchaseDetail = () => {
  const {carrito, removeFromCarrito} = useCarrito();
  const totalCompra = carrito.reduce((total, producto) => total + producto.price, 0);
  
  const handleRemoveFromCarrito = (productId) => {
    removeFromCarrito(productId);
  };

  return (
    <div className="detalle-compra">
      <h2 className='title'>Detalle de compra</h2>
      <div className="detalle-compra-resumen">
        <h3>Resumen de productos a comprar</h3>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((producto) => (
              <tr key={producto.id}>
                <td>
                  <div className="detalle-producto">
                    <img src={producto.image} alt={producto.name} />
                    <div className="producto-info">
                      <p>{producto.name}</p>
                      <p>${producto.price.toFixed(2)}</p>
                    </div>
                  </div>
                </td>
                <td>${producto.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleRemoveFromCarrito(producto.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2">
                <strong>Total</strong>
              </td>
              <td>
                <strong>${totalCompra.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="detalle-compra-precio">
        <h3>Total de la compra</h3>
        <p>${totalCompra.toFixed(2)}</p>
        <Link to="/buy">
          <button>Comprar</button>
        </Link>
        
      </div>
    </div>
  );
}

export default ParchaseDetail;
