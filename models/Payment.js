const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: [true, 'Order is required'],
            unique: true, // One payment per order
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            min: [0, 'Amount cannot be negative'],
        },
        paymentMethod: {
            type: String,
            enum: ['credit_card', 'paypal', 'bank_transfer'],
            required: [true, 'Payment method is required'],
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
        transactionId: {
            type: String,
            trim: true,
            unique: true,
            sparse: true, // Allows nulls while enforcing uniqueness
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);