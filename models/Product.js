const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            maxLength: [100, 'Product name cannot exceed 100 characters'],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required'],
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        stockQuantity: {
            type: Number,
            required: [true, 'Stock quantity is required'],
            min: [0, 'Stock quantity cannot be negative'],
            default: 0,
        },
        sku: {
            type: String,
            required: [true, 'SKU is required'],
            unique: true,
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);