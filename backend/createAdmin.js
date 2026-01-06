require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const connectDB = require('./src/config/db');

(async () => {
  await connectDB();

  const email = 'admin@example.com';
  const password = 'admin123';

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await Admin.create({
    email,
    password: hashedPassword
  });

  console.log('✅ Admin created successfully');
  console.log('Email:', email);
  console.log('Password:', password);
  process.exit(0);
})();
