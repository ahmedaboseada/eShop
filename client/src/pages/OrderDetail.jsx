import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getOrder(id)
      .then((res) => setOrder(res.data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <section className="section">
        <p className="error">{error}</p>
        <Link to="/orders">Back</Link>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="section">
        <p className="muted">Loading…</p>
      </section>
    );
  }

  return (
    <section className="section section--narrow">
      <div className="section__head">
        <h1>Order #{order._id.slice(-6).toUpperCase()}</h1>
        <p>
          Status: <span className="status">{order.status}</span>
        </p>
      </div>
      <p className="muted">{order.shippingAddress}</p>
      <div className="cart-list">
        {order.items.map((item) => (
          <div className="cart-row" key={item.product?._id || item.product}>
            <img src={item.product?.imageCover} alt="" />
            <div>
              <h3>{item.product?.title || 'Product'}</h3>
              <p className="muted">
                {item.quantity} × ${Number(item.unitPrice).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p>
        Total <strong>${Number(order.totalAmount).toFixed(2)}</strong>
      </p>
      <Link className="btn btn--ghost" to="/shop">
        Keep shopping
      </Link>
    </section>
  );
}
