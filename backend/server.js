require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const emailRoutes = require('./src/routes/emails');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// UPDATED CORS (safe + production-ready)
app.use(cors({
  origin: [
    'https://bulkmail-coral-tau.vercel.app',   // your frontend
    'http://localhost:5173'                    // local dev (optional)
  ],
  credentials: true
}));

app.use(express.json());

connectDB();

app.use('/api', authRoutes);
app.use('/api', emailRoutes);

// error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
