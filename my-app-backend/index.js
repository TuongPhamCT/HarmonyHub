const express = require("express");
const app = express();
const port = 5000;
const pool = require('./db');
const cors = require('cors');

app.use(cors());

app.get('/', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});