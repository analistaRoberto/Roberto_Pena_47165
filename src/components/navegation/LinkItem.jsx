import { Link } from "react-router-dom";

function ItemListContainer() {
  return (
    <nav>
      <ul className="item-list-container">
        <li><Link to="/">Inicio</Link></li>
        <li className="item-list-container-open">categoria
          <ul className="item-list-container-category">
            <li><Link to="/category/vista">Vista</Link></li>
            <li><Link to="/category/sol">Anteojos de sol</Link></li>
            <li><Link to="/category/niños">Niños</Link></li>
          </ul>
        </li>
        <li><Link to="/contact">contactanos</Link></li>
      </ul>
    </nav>
  );
}

export default ItemListContainer;