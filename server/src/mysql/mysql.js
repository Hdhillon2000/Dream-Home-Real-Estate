
import 'dotenv/config';
import { createPool } from 'mysql2/promise';

// Create a connection pool
const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 17620,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully');
    connection.release();
    process.exit(0);
  }
  catch (error) {
    console.error('MySQL connection failed:', error.message);
  };
};

// testConnection();

export default pool;


// Generic stored procedure handler
export async function executeProcedure(procName, params = [], { firstResultOnly = true } = {}) {

  if (!procName || typeof procName !== 'string') throw new Error('Procedure name required');
  
  const placeholders = params.map(() => '?').join(',');
  const sql = `CALL ${procName}(${placeholders})`;
  let connection;
  
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(sql, params);
    // mysql2 returns: [ [resultSet1], [resultSet2], ... , Procedure OK Packet ]

    const cleaned = rows.filter(r => Array.isArray(r));

    return firstResultOnly ? cleaned[0] ?? [] : cleaned;
  } 
  catch (err) {
    console.error(`Procedure ${procName} failed:`, err.message);
    throw err;
  }
  finally {
    if (connection) connection.release();
  };
};

// Optional transactional wrapper
export async function runInTransaction(work) {

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const result = await work(connection);
    await connection.commit();
    return result;
  } 
  catch (err) {
    if (connection) await connection.rollback();
    throw err;
  } 
  finally {
    if (connection) connection.release();
  };
};

// Convenience for procedures inside a transaction
export async function executeProcedureTx(connection, procName, params = [], { firstResultOnly = true } = {}) {

  if (!connection) throw new Error('Connection required');

  const placeholders = params.map(() => '?').join(',');
  const sql = `CALL ${procName}(${placeholders})`;
  const [rows] = await connection.query(sql, params);
  const cleaned = rows.filter(r => Array.isArray(r));

  return firstResultOnly ? cleaned[0] ?? [] : cleaned;
};


// ===== PROCEDURE CREATION & STORAGE =====

/**
 * Executes a CREATE PROCEDURE statement
 * @param {string} procedureSQL - The full CREATE PROCEDURE SQL statement
 */
export async function createProcedure(procedureSQL) {

  if (!procedureSQL || typeof procedureSQL !== 'string') throw new Error('Procedure SQL statement required');
  
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(procedureSQL);
    console.log('Procedure created successfully');
  } 
  catch (err) {
    console.error('Failed to create procedure:', err.message);
    throw err;
  } 
  finally {
    if (connection) connection.release();
  };
};

/**
 * Drops a stored procedure if it exists
 * @param {string} procName - Name of the procedure to drop
 */
export async function dropProcedure(procName) {
  if (!procName || typeof procName !== 'string') {
    throw new Error('Procedure name required');
  }
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(`DROP PROCEDURE IF EXISTS ${procName}`);
    console.log(`Procedure ${procName} dropped successfully`);
  } 
  catch (err) {
    console.error(`Failed to drop procedure ${procName}:`, err.message);
    throw err;
  } 
  finally {
    if (connection) connection.release();
  };
};

/**
 * Creates or replaces a stored procedure
 * @param {string} procName - Name of the procedure
 * @param {string} procedureSQL - The full CREATE PROCEDURE SQL statement
 */
export async function createOrReplaceProcedure(procName, procedureSQL) {
  await dropProcedure(procName);
  await createProcedure(procedureSQL);
};

/**
 * Lists all stored procedures in the database
 * @returns {Array} Array of procedure names
 */
export async function listProcedures() {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES 
             WHERE ROUTINE_TYPE = 'PROCEDURE' AND ROUTINE_SCHEMA = DATABASE()`
    );
    return rows.map(row => row.ROUTINE_NAME);
  } 
  catch (err) {
    console.error('Failed to list procedures:', err.message);
    throw err;
  } 
  finally {
    if (connection) connection.release();
  };
};

/**
 * Checks if a procedure exists
 * @param {string} procName - Name of the procedure to check
 * @returns {boolean} True if procedure exists
 */
export async function procedureExists(procName) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      `SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.ROUTINES 
             WHERE ROUTINE_TYPE = 'PROCEDURE' 
             AND ROUTINE_SCHEMA = DATABASE() 
             AND ROUTINE_NAME = ?`,
      [procName]
    );
    return rows[0].count > 0;
  } 
  catch (err) {
    console.error(`Failed to check if procedure ${procName} exists:`, err.message);
    throw err;
  } 
  finally {
    if (connection) connection.release();
  };
};


// ===== EXAMPLE USAGES =====

// Example 1: Simple procedure call
// const users = await executeProcedure('GetAllUsers');

// Example 2: Procedure with parameters
// const user = await executeProcedure('GetUserById', [123]);

// Example 3: Get all result sets (not just first)
// const [users, stats] = await executeProcedure('GetUsersWithStats', [], { firstResultOnly: false });

// Example 4: Transaction example
// const result = await runInTransaction(async (conn) => {
//     await executeProcedureTx(conn, 'CreateUser', ['John', 'john@example.com']);
//     await executeProcedureTx(conn, 'UpdateUserStats', [userId]);
//     return { success: true };
// });

// Example 5: Error handling
// try {
//     const properties = await executeProcedure('GetPropertiesByCity', ['New York']);
//     console.log('Found properties:', properties.length);
// } catch (error) {
//     console.error('Failed to get properties:', error);
// }