import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api
      .getProducts({ limit: 4 })
      .then((res) => setFeatured(res.data.items || []))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <p className="brand-mark">eShop</p>
          <h1>Objects worth keeping.</h1>
          <p className="lede">
            A focused storefront for thoughtfully made electronics, home goods, and everyday essentials.
          </p>
          <div className="cta-row">
            <Link className="btn btn--primary" to="/shop">
              Browse the shop
            </Link>
            <Link className="btn btn--ghost" to="/signin">
              Sign in
            </Link>
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
            alt=""
          />
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Featured now</h2>
          <p>A short edit from the current collection.</p>
        </div>
        <div className="grid">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
