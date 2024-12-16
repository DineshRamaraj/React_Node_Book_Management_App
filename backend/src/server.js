require("dotenv").config();
const express = require("express");
const { initializeDB } = require("./database/db");
const router = require("./routes/router");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: false, error_msg: "End Point Not Found" });
});

const PORT = process.env.PORT || 5000;

initializeDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running at http://locahost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Server Error: ${error.message}`);
    process.exit(1);
  });

module.exports = app;
