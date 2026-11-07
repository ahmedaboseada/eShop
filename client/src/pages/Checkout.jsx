import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, refresh } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!user) {
    return (
      <section className="section">
        <p>Please sign in to checkout.</p>
        <Link to="/signin">Sign in</Link>
      </section>
    );
  }

  async function placeOrder(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await api.createOrder(address);
      await refresh();
      navigate(`/orders/${res.data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section section--narrow">
      <div className="section__head">
        <h1>Checkout</h1>
        <p>{(cart.items || []).length} item(s) ready to ship.</p>
      </div>
      <form className="form" onSubmit={placeOrder}>
        <label>
          Shipping address
          <textarea
            required
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, city, postal code"
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button className="btn btn--primary" type="submit" disabled={busy || !(cart.items || []).length}>
          {busy ? 'Placing order…' : 'Place order'}
        </button>
      </form>
    </section>
  );
}
