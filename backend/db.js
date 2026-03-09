require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'Your_password123',
  server: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'akoho',
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

const poolPromise = new Promise((resolve, reject) => {
  const maxRetries = 10;
  let attempts = 0;

  const tryConnect = () => {
    attempts++;
    console.log(`Tentative de connexion MSSQL (${attempts}/${maxRetries})...`);

    new sql.ConnectionPool(config)
      .connect()
      .then(pool => {
        console.log('MSSQL pool créé avec succès');
        resolve(pool);
      })
      .catch(err => {
        console.error(`Échec connexion MSSQL: ${err.message}`);
        if (attempts < maxRetries) {
          console.log('Nouvelle tentative dans 5 secondes...');
          setTimeout(tryConnect, 5000);
        } else {
          console.error('Nombre maximum de tentatives atteint');
          reject(err);
        }
      });
  };

  tryConnect();
});

module.exports = { sql, poolPromise };