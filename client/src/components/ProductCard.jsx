import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const price = product.priceAfterDiscount ?? product.price;
  return (
    <article className="product">
      <Link to={`/product/${product._id}`} className="product__media">
        <img src={product.imageCover} alt={product.title} loading="lazy" />
      </Link>
      <div className="product__body">
        <p className="eyebrow">{product.category?.name || 'Collection'}</p>
        <h3>
          <Link to={`/product/${product._id}`}>{product.title}</Link>
        </h3>
        <div className="product__meta">
          <span className="price">${Number(price).toFixed(2)}</span>
          {product.priceAfterDiscount ? (
            <span className="price price--muted">${Number(product.price).toFixed(2)}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
