import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    api
      .getOrders()
      .then((res) => setOrders(res.data || []))
      .catch((err) => setError(err.message));
  }, [user]);

  if (!user) {
    return (
      <section className="section">
        <p>Sign in to see orders.</p>
        <Link to="/signin">Sign in</Link>
      </section>
    );
  }

  return (
    <section className="section section--tight">
      <div className="section__head">
        <h1>Orders</h1>
        <p>Your recent purchases.</p>
      </div>
      {error ? <p className="error">{error}</p> : null}
      <div className="order-list">
        {orders.map((order) => (
          <Link key={order._id} to={`/orders/${order._id}`} className="order-row">
            <div>
              <strong>#{order._id.slice(-6).toUpperCase()}</strong>
              <p className="muted">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <span className="status">{order.status}</span>
              <p>${Number(order.totalAmount).toFixed(2)}</p>
            </div>
          </Link>
        ))}
        {!orders.length && !error ? <p className="muted">No orders yet.</p> : null}
      </div>
    </section>
  );
}
