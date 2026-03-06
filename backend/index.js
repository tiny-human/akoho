require('dotenv').config();
const express = require('express');
const { poolPromise } = require('./db');
const app = express();

app.use(express.json());


app.get('/api', (req, res) => {
  res.json({ ok: true, message: 'API Node.js OK' });
});

app.get('/api/db', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT 1 AS Number');
    res.json(result.recordset);
  } catch (err) {
    console.error('DB error', err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend démarré sur le port ${port}`));
