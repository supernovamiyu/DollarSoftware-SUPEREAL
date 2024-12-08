const express = require('express');

const userRoutes = require('../routes/user.routes');
const categoriesRoutes = require('../routes/category.routes');
const cityRoutes = require('../routes/city.routes');
const deliveryStateRoutes = require('../routes/delivery-state.routes');
const sendMethodRoutes = require('../routes/send-method.routes');
const productRoutes = require('../routes/product.routes');
const pricesRoutes = require('../routes/prices.routes');
const deliveryRoutes = require('../routes/delivery.routes');


const app = express();


// Middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Endpoints

app.use('/user', userRoutes);
app.use('/categories', categoriesRoutes);
app.use('/city', cityRoutes);
app.use('/delivery-state', deliveryStateRoutes);
app.use('/send-method', sendMethodRoutes);
app.use('/product', productRoutes);
app.use('/prices', pricesRoutes);
app.use('/delivery', deliveryRoutes);


module.exports = app;


