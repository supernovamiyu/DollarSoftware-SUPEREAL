const path = require('path');
require('dotenv').config({ 
    path: path.resolve(__dirname, 'backend/.env') 
});

const express = require('express');
const cors = require('cors');

// Importar rutas API
const userRoutes = require('../routes/user.routes');
const categoriesRoutes = require('../routes/category.routes');
const cityRoutes = require('../routes/city.routes');
const deliveryStateRoutes = require('../routes/delivery-state.routes');
const sendMethodRoutes = require('../routes/send-method.routes');
const productRoutes = require('../routes/product.routes');
const detailDeliveryRoutes = require('../routes/detail-delivery.routes');
const deliveryRoutes = require('../routes/delivery.routes');
const opinionsRoutes = require('../routes/opinions.routes');
const authRoutes = require('../routes/auth.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 1. Configuración para servir archivos estáticos del frontend
app.use(express.static(path.resolve(__dirname, '../../../')));

// 2. Todas tus rutas API (se mantienen igual)
app.use('/users', userRoutes);
app.use('/categories', categoriesRoutes);
app.use('/city', cityRoutes);
app.use('/delivery-state', deliveryStateRoutes);
app.use('/send-method', sendMethodRoutes);
app.use('/products', productRoutes);
app.use('/detail-delivery', detailDeliveryRoutes);
app.use('/delivery', deliveryRoutes);
app.use('/opinions', opinionsRoutes);
app.use('/auth', authRoutes);

// 3. Catch-all para SPA (DEBE IR AL FINAL)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../index.html'));
});

console.log('Ruta absoluta al index.html:', path.resolve(__dirname, '../../../index.html'));


module.exports = app;
