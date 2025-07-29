// model/PurchaseBookModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ecomDbConnection = mongoose.connection.useDb('ecomDb');

const purchaseBookSchema = new Schema({
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtPurchase: { type: Number, required: true }
  }],
  total: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

const PurchaseBookModel = ecomDbConnection.model('PurchaseBook', purchaseBookSchema);
module.exports = PurchaseBookModel;
