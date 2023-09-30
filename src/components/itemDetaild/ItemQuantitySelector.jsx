import {useState} from 'react';

const ItemQuantitySelector = ({item, cantidadSeleccionada, actualizarCantidad}) => {
  const [value, setValue] = useState(cantidadSeleccionada);

  const handleIncrement = () => {
    if (value < item.stock) {
      const newValue = value + 1;
      setValue(newValue);
      actualizarCantidad(newValue); 
    }
  }

  const handleDecrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      actualizarCantidad(newValue); 
    }
  }

  return (
    <div className='item-quantity-selector'>
      <button onClick={handleDecrement}>-</button>
      <span>{value}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
}

export default ItemQuantitySelector;