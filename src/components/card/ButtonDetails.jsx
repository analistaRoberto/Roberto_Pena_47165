import { Link } from "react-router-dom";

function ButtonDetails({item}) {
  return(
    <Link to={`/item/${item.id}`}>Ver Más</Link>
  );
}

export default ButtonDetails;