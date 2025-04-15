const mongoose = require('mongoose');
const {Schema} = require("mongoose");

// Create Schema
const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category required"],
        minLength: [3, 'Too short category name'],
        maxLength: [32, 'Too long category name'],
    },
    // means: A and B category => url: shoping.com/a-and-b
    slug: {
        type: String,
        lowercase: true,
    },
    image: {
        type: String,
    }
},{
    timestamps: true // Created At, Updated At
})
//Create model
const Category = mongoose.model('Category',CategorySchema)
// Export model
module.exports = Category;