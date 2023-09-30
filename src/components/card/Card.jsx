import AddToCart from "./AddToCart";
import ButtonDetails from "./ButtonDetails";

function Card({item}) {
  return (
    <article key={item.id}>
      <img src={item.image} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p>${item.price}</p>
        
        <div className="btn-icons">
          <ButtonDetails item={item}/>
          <AddToCart producto={item}/>
        </div>
      </div>
    </article>
  );
}

export default Card;