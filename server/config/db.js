const mongoose = require("mongoose");

let _dbURL = process.env.DB_URL;

let _dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(_dbURL, _dbOptions);
