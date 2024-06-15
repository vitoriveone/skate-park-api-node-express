import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

const config = {
        connectionString: process.env.DATABASE_URL
};

const pool = new Pool(config);


export default pool;