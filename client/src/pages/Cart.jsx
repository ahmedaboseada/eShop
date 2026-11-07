import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { user } = useAuth();
  const { cart, updateItem, loading } = useCart();
  const navigate = useNavigate();
  const items = cart.items || [];

  const total = items.reduce((sum, item) => {
    const price = item.product?.priceAfterDiscount ?? item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  if (!user) {
    return (
      <section className="section">
        <h1>Cart</h1>
        <p>Sign in to view your cart.</p>
        <Link className="btn btn--primary" to="/signin">
          Sign in
        </Link>
      </section>
    );
  }

  return (
    <section className="section section--tight">
      <div className="section__head">
        <h1>Your cart</h1>
        <p>{items.length ? 'Review items before checkout.' : 'Your cart is empty.'}</p>
      </div>

      {loading ? <p className="muted">Loading…</p> : null}

      <div className="cart-list">
        {items.map((item) => (
          <div className="cart-row" key={item.product?._id || item.product}>
            <img src={item.product?.imageCover} alt="" />
            <div>
              <h3>{item.product?.title}</h3>
              <p className="muted">${Number(item.product?.price || 0).toFixed(2)}</p>
            </div>
            <input
              type="number"
              min="0"
              value={item.quantity}
              onChange={(e) => updateItem(item.product._id, Number(e.target.value))}
              aria-label={`Quantity for ${item.product?.title}`}
            />
          </div>
        ))}
      </div>

      {items.length > 0 ? (
        <div className="cart-summary">
          <p>
            Total <strong>${total.toFixed(2)}</strong>
          </p>
          <button type="button" className="btn btn--primary" onClick={() => navigate('/checkout')}>
            Checkout
          </button>
        </div>
      ) : (
        <Link className="btn btn--ghost" to="/shop">
          Continue shopping
        </Link>
      )}
    </section>
  );
}
