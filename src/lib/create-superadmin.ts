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

async function createSuperAdmin() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Check if superadmin already exists
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      ['admin@meenakshi.com']
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      console.log('Superadmin already exists');
      await connection.end();
      return;
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('SuperAdmin@123', salt);
    
    // Generate UUID for user ID
    const userId = uuidv4();
    
    // Insert superadmin user
    await connection.execute(
      'INSERT INTO users (id, email, full_name, password_hash, email_verified, is_superadmin, created_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [userId, 'admin@meenakshi.com', 'Super Admin', hashedPassword, true, true]
    );
    
    console.log('Superadmin created successfully');
    console.log('Email: admin@meenakshi.com');
    console.log('Password: SuperAdmin@123');
    
    await connection.end();
  } catch (error) {
    console.error('Error creating superadmin:', error);
    process.exit(1);
  }
}

// Execute the function
createSuperAdmin();