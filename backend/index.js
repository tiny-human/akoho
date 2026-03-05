require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const app = express();

app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'Your_password123',
  server: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'mydb',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

app.get('/api', (req, res) => {
  res.json({ ok: true, message: 'API Node.js OK' });
});

app.get('/api/db', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT 1 AS Number');
    res.json(result.recordset);
  } catch (err) {
    console.error('DB error', err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend démarré sur le port ${port}`));
