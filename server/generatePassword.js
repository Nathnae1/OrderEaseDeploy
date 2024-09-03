const bcrypt = require('bcryptjs');

const passwords = [
  'password123', // Replace with desired passwords for each email
  'password345',
  'password678',
  'password901',
  'password234',
  'password567'
];

passwords.forEach(async (password, index) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log(`Hashed password for User ${index + 1}: ${hash}`);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
});
