'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const UserController = require('./src/controller');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const DB_NAME = 'serverless';

// init mysql connection
function initPgPool() {
  const pool = new Pool({
    connectionString: `${process.env.PG_CONNECT_STRING}/${DB_NAME}`,
  });
  // init database
  pool.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`).then(() => {
    // init table
    pool.query(`CREATE TABLE IF NOT EXISTS users (
      ID serial NOT NULL,
      NAME           TEXT         NOT NULL,
      EMAIL          CHAR(50)     NOT NULL,
      SITE          CHAR(50)     NOT NULL
    );`);
  });

  return pool;
}
// actually you can make a pool function deal with pg connecting
if (!app.pgPool) {
  app.pgPool = initPgPool();
}

// get user list
app.get('/users', async (req, res) => {
  const data = await UserController.getUserList(app.pgPool);
  res.send(
    JSON.stringify({
      code: 0,
      data,
    }),
  );
});

// add new user
app.post('/users', async (req, res) => {
  let result = '';
  const user = req.body;
  try {
    const data = await UserController.createUser(app.pgPool, user);
    result = {
      code: 0,
      data,
      message: 'Insert Success',
    };
  } catch (e) {
    result = {
      code: e.code,
      message: `Insert Fail: ${e.message}`,
    };
  }

  res.send(JSON.stringify(result));
});

// delete user
app.delete('/users/:name', async (req, res) => {
  let result = '';
  try {
    const { name } = req.params;
    const data = await UserController.deleteUserByName(app.pgPool, name);
    result = {
      code: 0,
      data,
      message: 'Delete Success',
    };
  } catch (e) {
    result = {
      code: 1002,
      data: e,
      message: 'Delete Fail',
    };
  }

  res.send(JSON.stringify(result));
});

module.exports = app;
