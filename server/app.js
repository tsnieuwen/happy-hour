const express = require('express');
const restaurantRouter = require('./routers/restaurantRouter');
const { setupDb } = require('../db/dbSetup');
const app = express();

setupDb();

app.use(express.json());
app.use(restaurantRouter);

module.exports = app;