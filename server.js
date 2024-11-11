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

app.use(express.urlencoded({ extended: true }));

//pohrana sjednica u postgres bazu korštenjem connect-pg-simple modula
app.use(session({
    store: new pgSession({
        pool: db.pool,
    }),
    secret: "web2_projekt",
    resave: false,
    saveUninitialized: true
}))

app.use('/', homeRouter);
app.use('/submitData', fetchRouter);

app.listen(3000);

