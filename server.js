const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg')
const db = require('./db')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const homeRouter = require('./routes/home.routes');
const fetchRouter = require('./routes/fetch.routes');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new pgSession({
        pool: db.pool,
    }),
    secret: process.env.SESSION_SECRET || 'web2_projekt',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/', homeRouter);
app.use('/submitData', fetchRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

