const app = require('./app');
// const setupDb = require('../db/dbSetup');
const port = process.env.PORT || 3000;

// setupDb();

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})