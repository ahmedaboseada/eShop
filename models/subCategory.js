const mongoose = require('mongoose');

const {Schema} = mongoose;
const subCategorySchema = new Schema({
    name: {
        type: String,
        // required: true,
        trim: true, // Remove spaces
        minlength: [2, "Subcategory name must be at least 2 characters"],
        maxlength: [50, "Subcategory name must be at most 50 characters"],
        unique: [true, "Subcategory name must be unique"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Subcategory must belong to a category"],
    }
}, {timestamps: true});

const subCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = subCategory;