const cartService = require('../services/cartService');

class CartController {
  async addToCart(req, res, next) {
    try {
      const { productId, quantity = 1 } = req.body;
      if (!productId || quantity < 1) {
        return res.status(400).json({ message: 'Product ID and valid quantity are required' });
      }
      const cart = await cartService.addToCart(req.user.id, { productId, quantity });
      return res.status(200).json({
        message: 'Item added to cart',
        cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCart(req, res, next) {
    try {
      const cart = await cartService.getCart(req.user.id);
      return res.status(200).json({
        message: 'Cart retrieved successfully',
        cart,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();