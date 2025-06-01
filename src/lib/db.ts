import * as mysql from 'mysql2/promise';

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
  throw new Error('Database configuration environment variables are not set');
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000 // Increased timeout to 30 seconds
});

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database');
    connection.release();
    return true;
  } catch (error) {
    console.error('Failed to connect to MySQL database:', error);
    throw error;
  }
}

export async function query<T>(sql: string, params?: any[]): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default pool;