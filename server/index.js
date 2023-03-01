const express = require('express');
const restaurantRouter = require('./routers/restaurantRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(restaurantRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})