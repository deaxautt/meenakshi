import { testConnection, query } from './db';

async function checkDatabase() {
  try {
    // Test connection
    await testConnection();
    console.log('Successfully connected to database!\n');

    // Check tables
    console.log('Checking tables...');
    
    const tables = [
      'users',
      'products',
      'categories',
      'orders',
      'order_items',
      'reviews'
    ];

    for (const table of tables) {
      try {
        const [result] = await query(`SHOW TABLES LIKE '${table}'`);
        if (Array.isArray(result) && result.length > 0) {
          console.log(`✓ Table '${table}' exists`);
          
          // Get table structure
          const [columns] = await query(`DESCRIBE ${table}`);
          console.log(`  Columns:`, columns);
        } else {
          console.log(`✗ Table '${table}' does not exist`);
        }
      } catch (error) {
        console.error(`Error checking table '${table}':`, error);
      }
    }

  } catch (error) {
    console.error('Database check failed:', error);
    process.exit(1);
  }
}

checkDatabase();