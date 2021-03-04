const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Route Dependencies
const defaultRoutes = require('./routes/index.route');
const adminRoutes = require('./routes/admin.route');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(res => {
    console.log('mongoDB connected to ' + res.connection.host);
})
.catch(e => {
    console.log(e);
})

// Routes
app.use('/', defaultRoutes);
app.use('/user', adminRoutes);
app.use('/admin', userRoutes);
app.use('/auth', authRoutes);

// Listen on a port
app.listen(PORT, () => {
    console.log('Listening on ' + PORT);
})