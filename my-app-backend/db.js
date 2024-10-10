const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '192.168.100.242',
    database: 'HarmonyHub',
    password: '120503',
    port: 5432, 
});

module.exports = pool;
