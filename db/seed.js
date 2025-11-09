const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const sql_create_sessions = `CREATE TABLE IF NOT EXISTS session (
    sid varchar NOT NULL COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL
  );`;

const sql_create_session_index2 = `CREATE INDEX IF NOT EXISTS IDX_session_expire ON session(expire)`


const sql_create_users = `CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    name varchar NOT NULL,
    password varchar NOT NULL
  );
`;

const sql_insert_into_users = `
INSERT INTO users (name, password) VALUES ('Ivo Ivic', '1234');
INSERT INTO users (name, password) VALUES ('Ana Anic', '5678');
INSERT INTO users (name, password) VALUES ('Pero Peric', 'abcd');
INSERT INTO users (name, password) VALUES ('Karlo Karlic', 'ab12');
INSERT INTO users (name, password) VALUES ('Grga Grgic', 'qwerty');

`;

(async () => {
    try {
        console.log("Creating and populating tables...");
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
