const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});


const sql_drop_users = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS session;
`;

const sql_create_sessions = `
CREATE TABLE IF NOT EXISTS session (
    sid varchar NOT NULL COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL
);
`;

const sql_create_session_index = `
CREATE INDEX IF NOT EXISTS IDX_session_expire ON session(expire);
`;

const sql_create_users = `
CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    name varchar UNIQUE,
    password varchar NOT NULL
);
`;

const sql_insert_into_users = `
INSERT INTO users (name, password) VALUES
('Ivo Ivic', '1234'),
('Ana Anic', '5678'),
('Pero Peric', 'abcd'),
('Karlo Karlic', 'ab12'),
('Grga Grgic', 'qwerty')
ON CONFLICT (name) DO NOTHING;
`;

(async () => {
    try {
        console.log("Creating and populating tables...");
        await pool.query(sql_drop_users);
        await pool.query(sql_create_sessions);
        await pool.query(sql_create_session_index);
        console.log("Session table OK");
        await pool.query(sql_create_users);
        await pool.query(sql_insert_into_users);
        console.log("Users table OK");
    } catch (err) {
        console.error("Seed error:", err);
    } finally {
        await pool.end();
    }
})();
