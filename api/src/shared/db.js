'use strict';

const { Pool } = require('pg');

// 接続プールはモジュールスコープでシングルトンとして保持し、
// 関数呼び出し間で再利用する（コールドスタート以外では使い回される）。
let pool;

function getPool() {
  if (!pool) {
    const connectionString = process.env.POSTGRES_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error('POSTGRES_CONNECTION_STRING is not set');
    }
    pool = new Pool({
      connectionString,
      // Azure Database for PostgreSQL など、TLS必須の接続を想定。
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

async function query(text, params) {
  return getPool().query(text, params);
}

module.exports = { getPool, query };
