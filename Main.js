const express = require('express');
const App = express();
const path = require('path');
const session = require('express-session');
const Router = require('./Router')
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

const PORT = process.env.PORT || 5000;

App.use(express.static(path.join(__dirname, './client/build')));

App.use(express.json());

App.use(session({
    key: 'sdfsfs',
    secret: 'asdadadads',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (2000000),
        httpOnly: false
    }
}));

new Router(App);

App.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

App.listen(PORT,console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
