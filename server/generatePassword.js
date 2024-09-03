const bcrypt = require('bcryptjs');

const passwords = [
  'password123', // Replace with desired passwords for each email
  'password123',
  'password123',
  'password123',
  'password123',
  'password123'
];

passwords.forEach(async (password, index) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log(`Hashed password for User ${index + 1}: ${hash}`);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
});
