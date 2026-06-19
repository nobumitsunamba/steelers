'use strict';

const { Pool } = require('pg');
const { trackException } = require('./telemetry');

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
  try {
    return await getPool().query(text, params);
  } catch (err) {
    // DBクエリのエラーは Application Insights にトラッキングする。
    trackException(err, { kind: 'db_query', query: text });
    throw err;
  }
}

module.exports = { getPool, query };
