import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../../firebase/config";
import ItemQuantitySelector from "./ItemQuantitySelector";
import AddToCart from "../card/AddToCart";

function ItemDetailContainer() {
  const [item, setItem] = useState(null);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
  const [precioTotal, setPrecioTotal] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(dataBase, "items", id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const itemData = docSnapshot.data();
          setItem(itemData);
          setPrecioTotal(itemData.price * cantidadSeleccionada);
        } else {
          console.log("El producto no existe en Firestore.");
        }
      } catch (error) {
        console.error("Error al obtener datos de Firestore:", error);
      }
    }

    fetchProduct();
  }, [cantidadSeleccionada, id]);

  const actualizarCantidad = (nuevaCantidad) => {
    setCantidadSeleccionada(nuevaCantidad);
    if (item) {
      setPrecioTotal(item.price * nuevaCantidad);
    }
  };

  return (
    <> 
    <h3 className="title details-title">Detalle de producto</h3>
    <div className="details">
      {item ? (
        <>
          <div className="details-image">
            <img src={item.image} alt={item.name} />
          </div>

          <div className="details-info">
            <h3>{item.name}</h3>

            <div className="mover">
              <span>{`$${precioTotal.toFixed(2)}`}</span>
              <span>{item.categorys}</span>
            </div>

            <p>{item.longDescription}</p>

            <ItemQuantitySelector
              item={item}
              cantidadSeleccionada={cantidadSeleccionada}
              actualizarCantidad={actualizarCantidad}
            />

            <div style={{color: 'white', fontSize: '20px'}} className="agregar">
              Agregar al Carrito
              <AddToCart producto={{ ...item, price: precioTotal }} classAddToCart={'add-to-cart'} />
            </div>
          </div>
        </>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
    </>
  );
}

export default ItemDetailContainer;
