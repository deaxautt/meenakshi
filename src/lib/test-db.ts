import { testConnection } from './db';

async function main() {
  try {
    await testConnection();
    console.log('Database connection test completed successfully');
  } catch (error) {
    console.error('Database connection test failed:', error);
    process.exit(1);
  }
}

main();