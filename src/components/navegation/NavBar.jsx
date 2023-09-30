import Brand from './Brand';
import CartWidget from './CartWidget';
import LinkItem from './LinkItem';

function NavBar() {
  return (
    <header className='nav-bar'>
      <Brand />
      <LinkItem />
      <CartWidget />
    </header>
  );
}

export default NavBar;
