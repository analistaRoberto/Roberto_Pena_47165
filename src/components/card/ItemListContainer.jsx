import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import {dataBase} from '../../firebase/config';

import Card from "./Card";

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const {category} = useParams();

  useEffect(() => {
    const itemsCollection = collection(dataBase, "items");
  
    async function getItems() {
      try {
        const querySnapshot = await getDocs(itemsCollection);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setItems(data);
      } catch (error) {
        console.error('Error al obtener datos de Firestore:', error);
      }
    }

    getItems();
  }, [category]);

  const filteredItems = category ? items.filter((item) => item.categorys === category) : items;

  return (
    <section className="card-catalog">
      <h2 className="title">Explora Nuestra Colección de Anteojos</h2>
      {filteredItems.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </section>
  );
}
                          
export default ItemListContainer;