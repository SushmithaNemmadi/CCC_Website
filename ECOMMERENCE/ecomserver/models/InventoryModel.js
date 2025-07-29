// model/InventoryModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ecomDbConnection = mongoose.connection.useDb('ecomDb');

const inventorySchema = new Schema({
  godownItem: {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
    name: { type: String, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    location: { type: String, trim: true }
  }
}, {
  timestamps: true
});

const InventoryModel = ecomDbConnection.model('Inventory', inventorySchema);
module.exports = InventoryModel;
