const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('./models/UserModel');
const Product = require('./models/productModel');
const Category = require('./models/CategoryModel');
const Cart = require('./models/CartModel');
const Order = require('./models/OrderModel');
const PurchaseBook = require('./models/PurchaseBookModel');
const Inventory = require('./models/InventoryModel');

const app = express();
const PORT = 5000;

// ===== MongoDB Connection =====
const uri = "mongodb+srv://nemmadisushmitha:5mnqJxr0OKGKpXy3@cluster0.i1xnhnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// ===== Middlewares =====
app.use(express.json());
app.use(cors());

// ===== JWT Secret =====
const JWT_SECRET = 'X9@v3&nA2!zLm7#pKd$8rB*Q1tJw%fGc';

// ===== Token Authentication Middleware =====
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied: No token provided.', logout: true });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Access Denied: Invalid token.', logout: true });
    }
    req.userId = decoded.userId;
    next();
  });
}

// ======= NEW: VERIFY TOKEN =======
app.get('/api/verifyToken', authenticateToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found', logout: true });
    }
    res.status(200).json({ valid: true, user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to verify token', error: err.message });
  }
});

// ======= AUTH: REGISTER =======
app.post('/register', async (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await UserModel.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, phone, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Registration successful', userData: savedUser });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// ======= AUTH: LOGIN =======
app.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await UserModel.findOne({ phone });

    if (!user) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      message: `Welcome ${user.name}, you are logged in!`,
      token,
      userData: {
        _id: user._id,
        name: user.name,
        phone: user.phone
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ======= PRODUCTS =======
app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add product' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: 'Product not found' });
  }
});

// ======= CATEGORIES =======
app.post('/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const saved = await newCategory.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add category' });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().populate('Prod');
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('Prod');
    res.json(category);
  } catch (err) {
    res.status(404).json({ error: 'Category not found' });
  }
});

// ======= CART =======
app.post('/cart', async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const saved = await newCart.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create cart' });
  }
});

app.get('/cart/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate('prods');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// ======= ORDERS =======
app.post('/orders', authenticateToken, async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to place order' });
  }
});

app.get('/orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('prod');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// ======= PURCHASE BOOK =======
app.post('/purchase', async (req, res) => {
  try {
    const purchase = new PurchaseBook(req.body);
    const saved = await purchase.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to record purchase' });
  }
});

app.get('/purchase/:userId', async (req, res) => {
  try {
    const purchases = await PurchaseBook.find({ user: req.params.userId }).populate('items.productId');
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
});

// ======= INVENTORY =======
app.post('/inventory', async (req, res) => {
  try {
    const inv = new Inventory(req.body);
    const saved = await inv.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add inventory item' });
  }
});

app.get('/inventory', async (req, res) => {
  try {
    const inv = await Inventory.find().populate('godownItem.productId');
    res.json(inv);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// ======= MOCK CART FOR TESTING =======
app.get('/cartItems', (req, res) => {
  res.json({
    cartItems: [
      { id: 1, name: 'Product 1', quantity: 2 },
      { id: 2, name: 'Product 2', quantity: 1 }
    ]
  });
});

// ======= BUY (UPDATE ADDRESS + ORDER CONFIRM) =======
app.post('/buy', authenticateToken, async (req, res) => {
  const { address } = req.body;

  try {
    await UserModel.findByIdAndUpdate(req.userId, { address });
    res.json({ message: "Order is successful and address is saved." });
  } catch (err) {
    res.status(500).json({ message: "Failed to update address", error: err.message });
  }
});

// ======= START SERVER =======
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
