'use strict';

function ApiError(code, msg) {
  const e = new Error(msg);
  e.code = code;
  return e;
};

module.exports = {
  async getUserList(pgPool) {
    const client = await pgPool.connect();
    const { rows } = await client.query({
      text: 'select * from users'
    });
    await client.end();
    return rows;
  },
  async createUser(pgPool, user) {
    const { name, email, site } = user;
    const existUser = await this.getUserByName(pgPool, name);
    if (existUser) {
      throw new ApiError(1000, `Name ${name} exist.`);
    }
    const client = await pgPool.connect();
    const { rowCount } = await client.query({
      text: 'INSERT INTO users(name, email, site) VALUES($1, $2, $3)',
      values: [name, email, site],
    });
    await client.end();
    return rowCount === 1;
  },
  async getUserByName(pgPool, name) {
    try {
      const client = await pgPool.connect();
      const { rows } = await client.query({
        name: 'fetch-user',
        text: 'SELECT * FROM users WHERE name = $1',
        values: [name],
      });
      await client.end();
      if (rows.name) {
        return rows;
      }
      return false;
    } catch (e) {
      throw new ApiError(1001, e);
    }
  },
  async deleteUserByName(pgPool, name) {
    const client = await pgPool.connect();
    const { rows } = await client.query({
      text: 'DELETE FROM users WHERE name = $1',
      values: [name],
    });
    await client.end();
    return rows;
  },
};
