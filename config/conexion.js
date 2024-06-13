import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

const config = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        max: parseInt(process.env.DB_MAX),
        min: parseInt(process.env.DB_MIN),
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MILLIS),
        connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT_MILLIS)
};

const pool = new Pool(config);


export default pool;