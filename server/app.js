const express = require('express');
const restaurantRouter = require('./routers/restaurantRouter');
const dealRouter = require('./routers/dealRouter');
const { setupDb } = require('../db/dbSetup');
const app = express();

setupDb();

app.use(express.json());
app.use(restaurantRouter);
app.use(dealRouter);

module.exports = app;