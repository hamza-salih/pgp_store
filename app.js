const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const fetchPublicKeyRouter = require('./routes/fetch_public_key');
const actionRoutes = require('./routes/actionRoutes');
const ihmRoutes = require('./routes/ihmRoutes');
const logout = require('./routes/auth/logout');
const register = require('./routes/auth/register');

// Import post routes
const createPostRoutes = require('./routes/product/create');
const deletePostRoutes = require('./routes/product/delete');
const readPostRoutes = require('./routes/product/read');
const updatePostRoutes = require('./routes/product/update');

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

// Add post routes
app.use('/posts', createPostRoutes);
app.use('/posts', deletePostRoutes);
app.use('/posts', readPostRoutes);
app.use('/posts', updatePostRoutes);

// -------------------------------------------------------------------------------------
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

app.get('/listPost', (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'post', 'list.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'index.html'));
});

app.get('/CreatePost', (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'user', 'add_Post.html'));
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'ihm', 'test.html'));
});
// -------------------------------------------------------------------------------------

app.use('/Action_Management', actionRoutes);
app.use('/IHM', ihmRoutes);
// app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
