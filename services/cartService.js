const Cart = require('../models/Cart');
const Product = require('../models/Product');

class CartService {
  async addToCart(userId, { productId, quantity }) {
    // Validate product
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.stockQuantity < quantity) {
      throw new Error('Insufficient stock');
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Update cart items
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return cart.populate('items.product'); // Populate product details
  }

  async getCart(userId) {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      throw new Error('Cart not found');
    }
    return cart;
  }
}

module.exports = new CartService();