const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'HarmonyHub',
    password: '120503',
    port: 5432, 
});

module.exports = pool;
