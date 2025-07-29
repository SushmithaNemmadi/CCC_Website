const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect to specific DB
const ecomDbConnection = mongoose.connection.useDb('Ecomdb');

// Updated user schema with detailed address object
const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },

  // Replace string with structured address object
  address: {
    houseno: String,
    street: String,
    village: String,
    landmark: String,
    city: String,
    district: String
  },

  dp: {
    type: String,
    default: 'https://placehold.co/100x100/A0B0C0/FFFFFF?text=DP'
  },
  cart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  order: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  history: [{ type: Schema.Types.ObjectId, ref: 'PurchaseBook' }]
}, {
  timestamps: true
});

// Export the model
const UserModel = ecomDbConnection.model('User', userSchema);
module.exports = UserModel;
