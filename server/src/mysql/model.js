
import { pool } from '../mysql/mysql.js';

/**
 * Model class for database operations
 * Similar to Mongoose models but for MySQL
 */
class Model {
  constructor(tableName, schema = {}) {
    this.tableName = tableName;
    this.schema = schema;
  }

  /**
   * Find all records
   * @param {Object} options - Query options (where, limit, offset, orderBy)
   * @returns {Array} Array of records
   */
  async find(options = {}) {
    const { where = {}, limit, offset, orderBy } = options;
    let sql = `SELECT * FROM ${this.tableName}`;
    const params = [];

    if (Object.keys(where).length > 0) {
      const conditions = Object.keys(where).map(key => {
        params.push(where[key]);
        return `${key} = ?`;
      });
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    if (orderBy) sql += ` ORDER BY ${orderBy}`;
    if (limit) sql += ` LIMIT ${parseInt(limit)}`;
    if (offset) sql += ` OFFSET ${parseInt(offset)}`;

    let connection;
    try {
      connection = await pool.getConnection();
      const [rows] = await connection.query(sql, params);
      return rows;
    } finally {
      if (connection) connection.release();
    }
  }

  /**
   * Find one record
   * @param {Object} where - Where conditions
   * @returns {Object|null} Single record or null
   */
  async findOne(where = {}) {
    const results = await this.find({ where, limit: 1 });
    return results[0] || null;
  }

  /**
   * Find by primary key
   * @param {*} id - Primary key value
   * @returns {Object|null} Single record or null
   */
  async findById(id) {
    const pkField = this.schema.primaryKey || `${this.tableName.toLowerCase().slice(0, -1)}_id`;
    return this.findOne({ [pkField]: id });
  }

  /**
   * Create a new record
   * @param {Object} data - Record data
   * @returns {Object} Created record with insertId
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
    } finally {
      if (connection) connection.release();
    }
  }

  /**
   * Update records
   * @param {Object} where - Where conditions
   * @param {Object} data - Data to update
   * @returns {Object} Update result
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
    } finally {
      if (connection) connection.release();
    }
  }

  /**
   * Delete records
   * @param {Object} where - Where conditions
   * @returns {Object} Delete result
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
    } finally {
      if (connection) connection.release();
    }
  }

  /**
   * Count records
   * @param {Object} where - Where conditions
   * @returns {Number} Count of records
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
    } finally {
      if (connection) connection.release();
    }
  }
};

/**
 * Factory function to create a new Model instance
 * @param {string} tableName - Name of the table
 * @param {Object} schema - Schema definition
 * @returns {Model} Model instance
 */
export default createModel = (tableName, schema = {}) => new Model(tableName, schema);

