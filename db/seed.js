const express = require('express');
const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'web2_zad2',
    password: process.env.DB_PASSWORD,
    port: 5432
});

const sql_create_sessions = `CREATE TABLE IF NOT EXISTS session (
    sid varchar NOT NULL COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL
  )
  WITH (OIDS=FALSE);`

const sql_create_session_index1 = `ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE`
const sql_create_session_index2 = `CREATE INDEX IDX_session_expire ON session(expire)`


const sql_create_users = `CREATE TABLE users (
    user_id serial,
    name varchar NOT NULL,
    password varchar NOT NULL
  );
`
const sql_insert_into_users = `
INSERT INTO users (name, password) VALUES ('Ivo Ivic', '1234');
INSERT INTO users (name, password) VALUES ('Ana Anic', '5678');
INSERT INTO users (name, password) VALUES ('Pero Peric', 'abcd');
INSERT INTO users (name, password) VALUES ('Karlo Karlic', 'ab12');
INSERT INTO users (name, password) VALUES ('Grga Grgic', 'qwerty');

`

let table_names = [
    "session",
    "users"
]

let tables = [
    sql_create_sessions,
    sql_create_users
];

let table_data = [
    sql_insert_into_users,
    undefined
    
]

let indexes = [
  sql_create_session_index1,
  sql_create_session_index2
]

if ((tables.length !== table_data.length) || (tables.length !== table_names.length)) {
    console.log("tables, names and data arrays length mismatch.")
    
}

(async () => {
    console.log("Creating and populating tables");
    for (let i = 0; i < tables.length; i++) {
        console.log("Creating table " + table_names[i] + ".");
        try {
            await pool.query(tables[i], [])
            console.log("Table " + table_names[i] + " created.");
            if (table_data[i] !== undefined) {
                try {
                    await pool.query(table_data[i], [])
                    console.log("Table " + table_names[i] + " populated with data.");
                } catch (err) {
                    console.log("Error populating table " + table_names[i] + " with data.")
                    return console.log(err.message);
                }
            }
        } catch (err) {
            console.log("Error creating table " + table_names[i])
            return console.log(err.message);
        }
    }

    console.log("Creating indexes");
    for (let i = 0; i < indexes.length; i++) {
        try {
            await pool.query(indexes[i], [])
            console.log("Index " + i + " created.")
        } catch (err) {
            console.log("Error creating index " + i + ".")
        }
    }

    await pool.end();
})()
