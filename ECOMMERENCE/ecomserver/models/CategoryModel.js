// model/CategoryModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ecomDbConnection = mongoose.connection.useDb('ecomDb');

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  Prod: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true
});

const CategoryModel = ecomDbConnection.model('Category', categorySchema);
module.exports = CategoryModel;
