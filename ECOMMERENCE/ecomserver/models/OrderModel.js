// model/OrderModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Use custom DB connection
const ecomDbConnection = mongoose.connection.useDb('ecomDb');

const orderSchema = new Schema({
  prod: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  delPt: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    name: String,
    phone: String,
    street: String,
    city: String,
    pincode: String
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  },
  approxDate: {
    type: Date
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

const OrderModel = ecomDbConnection.model('Order', orderSchema);
module.exports = OrderModel;
