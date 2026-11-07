const API_BASE = import.meta.env.VITE_API_URL || '';

function getToken() {
  return localStorage.getItem('eshop_token');
}

export function setToken(token) {
  if (token) localStorage.setItem('eshop_token', token);
  else localStorage.removeItem('eshop_token');
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(payload.message || 'Request failed');
    err.status = res.status;
    err.payload = payload;
    throw err;
  }
  return payload;
}

export const api = {
  health: () => request('/api/health'),
  signup: (body) => request('/api/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
  signin: (body) => request('/api/auth/signin', { method: 'POST', body: JSON.stringify(body) }),
  signout: () => request('/api/auth/signout', { method: 'POST', body: '{}' }),
  me: () => request('/api/auth/me'),
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
    ).toString();
    return request(`/api/products${qs ? `?${qs}` : ''}`);
  },
  getProduct: (id) => request(`/api/products/${id}`),
  getCategories: () => request('/api/categories'),
  getBrands: () => request('/api/brands'),
  getCart: () => request('/api/cart'),
  addToCart: (productId, quantity = 1) =>
    request('/api/cart/items', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
  updateCartItem: (productId, quantity) =>
    request('/api/cart/items', { method: 'PATCH', body: JSON.stringify({ productId, quantity }) }),
  clearCart: () => request('/api/cart', { method: 'DELETE' }),
  createOrder: (shippingAddress) =>
    request('/api/orders', { method: 'POST', body: JSON.stringify({ shippingAddress }) }),
  getOrders: () => request('/api/orders'),
  getOrder: (id) => request(`/api/orders/${id}`),
};
