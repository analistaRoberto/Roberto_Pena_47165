import { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const ContextCart = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [active, setActive] = useState(false);
  const [detallesCompra, setDetallesCompra] = useState([]); // Agrega estado para los detalles de compra
  const [resumenCompra, setResumenCompra] = useState([]);

  const addToCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);
    if (productoExistente) {
    } else {
      setCarrito([...carrito, producto]);
    }
  };

  const removeFromCarrito = (productId) => {
    const updatedCarrito = carrito.filter((item) => item.id !== productId);
    setCarrito(updatedCarrito);
  };

  const addDetalleCompra = (detalle) => {
    setDetallesCompra([...detallesCompra, detalle]);

    const totalCompra = detalle.productos.reduce((total, producto) => total + producto.price, 0);

    const detalleCompra = {
      fecha: new Date().toLocaleDateString(),
      productos: detalle.productos,
      total: totalCompra,
    };

    setDetallesCompra([...detallesCompra, detalleCompra]);
    setResumenCompra([...resumenCompra, detalleCompra]);
  };
  

  return (
    <CarritoContext.Provider value={
      { carrito, 
        addToCarrito, 
        removeFromCarrito, 
        active, 
        setActive, 
        detallesCompra, 
        addDetalleCompra,
        resumenCompra
      }}>
        {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  return useContext(CarritoContext);
};
