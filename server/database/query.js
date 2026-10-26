import dotenv from 'dotenv';

import pg from 'pg';

dotenv.config();

let pool_instance = null;

const getConnectionString = () => {
  try {
    return useRuntimeConfig()?.DB_CONNECTION_STRING;
  } catch {
    // Necessary to query the database when the Nuxt service is not up (for migrations and tests)
    return process.env.DB_CONNECTION_STRING;
  }
};

const getPool = () => {
  if (!pool_instance) {
    pool_instance = new pg.Pool({
      connectionString: getConnectionString(),
    });
  }
  return pool_instance;
};

const closePool = async () => {
  if (pool_instance) {
    await pool_instance.end();
    pool_instance = null;
  }
};

const executeSQLQuery = async (sql_query, parameter_list) => {
  const pool = getPool();

  if (parameter_list) {
    return pool.query(sql_query, parameter_list);
  }

  return pool.query(sql_query);
};

export {
  closePool,
  executeSQLQuery,
};
