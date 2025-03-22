const express = require('express');
const cors = require('cors');


// RUTAS

const userRoutes = require('../routes/user.routes');
const categoriesRoutes = require('../routes/category.routes');
const cityRoutes = require('../routes/city.routes');
const deliveryStateRoutes = require('../routes/delivery-state.routes');
const sendMethodRoutes = require('../routes/send-method.routes');
const productRoutes = require('../routes/product.routes');
const detailDeliveryRoutes = require('../routes/detail-delivery.routes');
const deliveryRoutes = require('../routes/delivery.routes');
const opinionsRoutes = require('../routes/opinions.routes');


const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Endpoints

app.use('/users', userRoutes);
app.use('/categories', categoriesRoutes);
app.use('/city', cityRoutes);
app.use('/delivery-state', deliveryStateRoutes);
app.use('/send-method', sendMethodRoutes);
app.use('/products', productRoutes);
app.use('/detail-delivery', detailDeliveryRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/opinions', opinionsRoutes);



module.exports = app;
