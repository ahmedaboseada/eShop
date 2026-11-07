import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, signout } = useAuth();
  const { count } = useCart();

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand">
          eShop
        </Link>
        <nav className="nav__links" aria-label="Primary">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/cart">Cart{count > 0 ? ` (${count})` : ''}</NavLink>
          {user ? (
            <>
              <NavLink to="/orders">Orders</NavLink>
              <button type="button" className="linkish" onClick={signout}>
                Sign out
              </button>
            </>
          ) : (
            <NavLink to="/signin">Sign in</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
