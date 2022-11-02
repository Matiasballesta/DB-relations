require('dotenv').config();
const server = require("./src/app.js");
const PORT = process.env.PORT

const { conn } = require("./src/db.js");

conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
      console.log("Running on Port 3000");
    });
  });