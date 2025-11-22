
import pool from '../mysql/mysql.js';

/**
 * Model class for database operations
 * Similar to Mongoose models but for MySQL
 */
class Model {
  constructor(tableName, classOptions = {}) {
    this.tableName = tableName;
    this.classOptions = classOptions;
  };

  
  /**
   * Finds records in the database table based on the provided options.
   * 
   * @async
   * @param {Object} [queryOptions={}] - Query options for finding records
   * @param {Object} [queryOptions.where={}] - Key-value pairs for WHERE conditions (combined with AND)
   * @param {number} [queryOptions.limit] - Maximum number of records to return
   * @param {number} [queryOptions.offset] - Number of records to skip
   * @param {string} [queryOptions.orderBy] - ORDER BY clause (e.g., 'column_name ASC')
   * @param {string} [queryOptions.select='*'] - Columns to select (comma-separated or '*' for all)
   * @returns {Promise<Array>} Array of rows matching the query criteria
   * @throws {Error} Throws error if database query fails
   * @example
   * // Find all users
   * const users = await model.find();
   * 
   * @example
   * // Find users with specific conditions
   * const activeUsers = await model.find({
   *   where: { status: 'active', role: 'admin' },
   *   limit: 10,
   *   offset: 0,
   *   orderBy: 'created_at DESC',
   *   select: 'id, name, email'
   * });
   */
  async find(queryOptions = {}) {
    const { where = {}, limit, offset, orderBy, select = '*' } = queryOptions;
    let sql = `SELECT ${select} FROM ${this.tableName}`;
    const params = [];

    if (Object.keys(where).length > 0) {
      const conditions = Object.keys(where).map(key => {
        params.push(where[key]);
        return `${key} = ?`;
      });
      sql += ` WHERE ${conditions.join(' AND ')}`;
    };

    if (orderBy) sql += ` ORDER BY ${orderBy}`;
    if (limit) sql += ` LIMIT ${parseInt(limit)}`;
    if (offset) sql += ` OFFSET ${parseInt(offset)}`;

    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.query(sql, params);
      return rows;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (connection) connection.release();
    };
  };

  
  /**
   * Finds a single record matching the specified criteria.
   * 
   * @async
   * @param {Object} [where={}] - The conditions to match for finding the record.
   * @param {Object} [queryOptions={}] - Additional query options to apply to the search.
   * @returns {Promise<Object|null>} A promise that resolves to the first matching record or null if no record is found.
   */
  async findOne(where = {}, queryOptions = {}) {
    const results = await this.find({ where, limit: 1, ...queryOptions });
    return results[0] || null;
  };

  /**
   * Find by primary key
   * @param {*} id - Primary key value
   */
  async findById(id) {
    const pkField = this.classOptions.primaryKey || `${this.tableName.toLowerCase().slice(0, -1)}_id`;
    return this.findOne({ [pkField]: id });
  };


  /**
   * Creates a new record in the database table.
   * 
   * @async
   * @param {Object} data - An object containing the field names and values to insert.
   * @returns {Promise<Object>} A promise that resolves to an object containing the inserted data and the insertId.
   * @throws {Error} Throws an error if the database operation fails.
   * 
   * @example
   * const newRecord = await model.create({ name: 'John', age: 30 });
   * // Returns: { name: 'John', age: 30, insertId: 1 }
   */
  async create(data) {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map(() => '?').join(',');

    const sql = `INSERT INTO ${this.tableName} (${fields.join(',')}) VALUES (${placeholders})`;

    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.query(sql, values);
      return { ...data, insertId: result.insertId };
    }
    catch (error) {
      throw error;
    }
    finally {
      if (connection) connection.release();
    };
  };

  /**
   * Update records
   * @param {Object} where - Where conditions
   * @param {Object} data - Data to update
   */
  async update(where, data) {
    const setFields = Object.keys(data).map(key => `${key} = ?`).join(',');
    const setValues = Object.values(data);

    const whereFields = Object.keys(where).map(key => `${key} = ?`);
    const whereValues = Object.values(where);

    const sql = `UPDATE ${this.tableName} SET ${setFields} WHERE ${whereFields.join(' AND ')}`;
    const params = [...setValues, ...whereValues];

    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.query(sql, params);
      return { affectedRows: result.affectedRows };
    }
    catch (error) {
      throw error;
    }
    finally {
      if (connection) connection.release();
    };
  };

  /**
   * Delete records
   * @param {Object} where - Where conditions
   */
  async delete(where) {
    const conditions = Object.keys(where).map(key => `${key} = ?`);
    const params = Object.values(where);

    const sql = `DELETE FROM ${this.tableName} WHERE ${conditions.join(' AND ')}`;

    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.query(sql, params);
      return { affectedRows: result.affectedRows };
    }
    catch (error) {
      throw error;
    }
    finally {
      if (connection) connection.release();
    };
  };

  /**
   * Count records
   * @param {Object} where - Where conditions
   */
  async count(where = {}) {
    let sql = `SELECT COUNT(*) as count FROM ${this.tableName}`;
    const params = [];

    if (Object.keys(where).length > 0) {
      const conditions = Object.keys(where).map(key => {
        params.push(where[key]);
        return `${key} = ?`;
      });
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.query(sql, params);
      return rows[0].count;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (connection) connection.release();
    };
  };

};


/**
 * Factory function to create a new Model instance
 * @param {string} tableName - Name of the table
 * @param {Object} classOptions - Class options
 * 
 */
export default async function createModel(tableName, classOptions = {}) {
  return new Model(tableName, classOptions);
};

