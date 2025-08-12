import app from './app.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 3000;

pool.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  } else {
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});