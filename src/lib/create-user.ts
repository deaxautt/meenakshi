import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
  throw new Error('Database configuration environment variables are not set');
}

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectTimeout: 30000 // Increased timeout to 30 seconds
};

async function createTestUser() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Test@123', salt);
    
    // Generate UUID for user ID using uuid package
    const userId = uuidv4();
    
    // Insert user
    const [result] = await connection.execute(
      'INSERT INTO users (id, email, full_name, password_hash, email_verified) VALUES (?, ?, ?, ?, ?)',
      [userId, 'test@example.com', 'Test User', hashedPassword, true]
    );
    
    console.log('Test user created successfully');
    console.log('Email: test@example.com');
    console.log('Password: Test@123');
    
    await connection.end();
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
}

// Execute the function
createTestUser();