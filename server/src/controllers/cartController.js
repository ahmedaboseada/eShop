const Cart = require('../models/Cart');
const Product = require('../models/Product');

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
}

async function getCart(req, res, next) {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      populate: [{ path: 'category', select: 'name' }, { path: 'brand', select: 'name' }],
    });
    res.json({
      success: true,
      data: cart || { user: req.user._id, items: [] },
    });
  } catch (error) {
    next(error);
  }
}

async function addToCart(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId || quantity < 1) {
      return res.status(400).json({ success: false, message: 'Valid productId and quantity required' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (product.quantity < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    const cart = await getOrCreateCart(req.user._id);
    const idx = cart.items.findIndex((item) => item.product.toString() === productId);
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
}

async function updateCartItem(req, res, next) {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity == null || quantity < 0) {
      return res.status(400).json({ success: false, message: 'Valid productId and quantity required' });
    }
    const cart = await getOrCreateCart(req.user._id);
    if (quantity === 0) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    } else {
      const idx = cart.items.findIndex((item) => item.product.toString() === productId);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Item not in cart' });
      }
      cart.items[idx].quantity = quantity;
    }
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
}

async function clearCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
}

module.exports = { getCart, addToCart, updateCartItem, clearCart };
