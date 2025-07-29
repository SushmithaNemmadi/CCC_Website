// model/CartModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ecomDbConnection = mongoose.connection.useDb('ecomDb');

const cartSchema = new Schema({
  prods: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
}, {
  timestamps: true
});

const CartModel = ecomDbConnection.model('Cart', cartSchema);
module.exports = CartModel;
