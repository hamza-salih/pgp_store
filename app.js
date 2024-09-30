const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const fetchPublicKeyRouter = require('./routes/fetch_public_key');

const actionRoutes = require('./routes/actionRoutes');
// const ihmRoutes = require('./routes/ihmRoutes');
const logout = require('./routes/auth/logout');
const register = require('./routes/auth/register');

// Import post routes
const createPostRoutes = require('./routes/post/create');
const readPostRoutes = require('./routes/post/read');
const updatePostRoutes = require('./routes/post/update');
const deletePostRoute = require('./routes/post/delete');
const detailsRouter = require('./routes/post/details');
const displayUser = require('./routes/user/list');
const userUpdateRouter = require('./routes/user/update');
const UserDetailsRouter = require('./routes/user/details');
const deleteUserRoute = require('./routes/user/delete');

function isAuthenticated(req, res, next) {
    if (req.session && req.session.correctUser) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
}

function isAdmin(req, res, next) {
    if (req.session.userID != 2) {
        return next();
    } else {
        res.redirect('/home');
    }
}


function isAuthenticated(req, res, next) {
    if (req.session && req.session.correctUser) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
}

function isAdmin(req, res, next) {
    if (req.session && req.session.userID == 2) {
        return next();
    } else {
        res.redirect('/home');
    }
}




const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/IHM', express.static(path.join(__dirname, 'IHM')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/routes/fetch_public_key', fetchPublicKeyRouter);
app.use('/logout', logout);
app.use('/register', register);

// post routes
app.use('/posts', createPostRoutes);
app.use('/posts', readPostRoutes);
app.use('/postDetails', detailsRouter);
app.use('/posts', updatePostRoutes);
app.use('/posts/delete', deletePostRoute);

// user routes 
app.use('/users', displayUser);
app.use('/users', userUpdateRouter);
app.use('/userDetails', UserDetailsRouter);
app.use('/users/delete', deleteUserRoute);



app.get('/Dashboard', isAuthenticated, isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'admin', 'dashboard.html'));
});

app.get('/header', (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'public', 'partials', 'header.html'));
});


app.get('/auth/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'auth', 'register.html'));
});

app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'auth', 'login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'auth', 'login.html'));
});

app.get('/decrypt', (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'encryption', 'encrypt.html'));
});

app.get('/decryptMessage', (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'encryption', 'decryption.html'));
});

app.get('/listPost', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'post', 'list.html'));
});

app.get('/home', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'index.html'));
});

app.get('/CreatePost', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'post', 'create.html'));
});

app.get('/editPost', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'post', 'edit.html'));
});

app.get('/postDetails', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'post', 'details.html'));
});

app.get('/userDetails', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'user', 'details.html'));
});

app.get('/settings', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'user', 'edit.html'));
});


// -------------------------------------------------------------------------------------

app.use('/Action_Management', actionRoutes);
// app.use('/IHM', ihmRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
