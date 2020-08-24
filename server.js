'use strict';
require('dotenv').config({ path: './config/config.env' });

const express = require('express');
const app = express();

app.listen(process.env.PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} started at PORT:${process.env.PORT}`
  );
});
