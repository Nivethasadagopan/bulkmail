require('dotenv').config();
const bcrypt = require('bcrypt');
const Admin = require('./src/models/Admin');
const connectDB = require('./src/config/db');

(async () => {
  await connectDB();

  const email = 'admin@example.com';
  const newPassword = 'admin123';

  const admin = await Admin.findOne({ email });
  if (!admin) {
    console.log('Admin not found');
    process.exit(1);
  }

  admin.password = await bcrypt.hash(newPassword, 10);
  await admin.save();

  console.log('✅ Admin password reset successfully');
  console.log('Email:', email);
  console.log('New Password:', newPassword);
  process.exit(0);
})();
