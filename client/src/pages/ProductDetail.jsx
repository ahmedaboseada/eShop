import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api
      .getProduct(id)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message));
  }, [id]);

  async function handleAdd() {
    if (!user) {
      navigate('/signin', { state: { from: `/product/${id}` } });
      return;
    }
    setBusy(true);
    setMessage('');
    setError('');
    try {
      await addItem(product._id, qty);
      setMessage('Added to cart');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (error && !product) {
    return (
      <section className="section">
        <p className="error">{error}</p>
        <Link to="/shop">Back to shop</Link>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="section">
        <p className="muted">Loading product…</p>
      </section>
    );
  }

  const price = product.priceAfterDiscount ?? product.price;

  return (
    <section className="detail">
      <div className="detail__media">
        <img src={product.imageCover} alt={product.title} />
      </div>
      <div className="detail__copy">
        <p className="eyebrow">{product.category?.name}</p>
        <h1>{product.title}</h1>
        <p className="lede">{product.description}</p>
        <div className="product__meta">
          <span className="price">${Number(price).toFixed(2)}</span>
          {product.brand ? <span className="muted">{product.brand.name}</span> : null}
        </div>
        <div className="detail__actions">
          <label>
            Qty
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </label>
          <button type="button" className="btn btn--primary" disabled={busy || product.quantity < 1} onClick={handleAdd}>
            {product.quantity < 1 ? 'Out of stock' : busy ? 'Adding…' : 'Add to cart'}
          </button>
        </div>
        {message ? <p className="ok">{message}</p> : null}
        {error ? <p className="error">{error}</p> : null}
      </div>
    </section>
  );
}
