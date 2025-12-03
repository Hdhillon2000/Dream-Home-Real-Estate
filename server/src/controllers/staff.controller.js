
import StaffModel from '../models/staff.model.js';
import pool from '../mysql/mysql.js';

export default {
  /**
   * Get all staff records
   */
  getAllStaff: async (req, res) => {
    try {
      const staffModel = await StaffModel;
      const staffRecords = await staffModel.find({ orderBy: 'last_name ASC' });
      return res.status(200).json(staffRecords);
    }
    catch (error) {
      // console.error('Error fetching staff records:', error);
      return res.status(500).json({
        message: 'Error fetching staff records',
        error: error.message
      });
    }
  },

  /**
   * Create a new staff member
   */
  createStaff: async (req, res) => {
    try {
      const staffData = req.body;

      if (!staffData.staff_id || !staffData.first_name || !staffData.last_name || !staffData.email || !staffData.branch_no) {
        return res.status(400).json({ message: 'Missing required fields.' });
      }
      const connection = await pool.getConnection();

      try {
        await connection.execute(
          'CALL Staff_hire_sp(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @success, @message)',
          [
            staffData.staff_id,
            staffData.first_name,
            staffData.last_name,
            staffData.position,
            staffData.branch_no,
            staffData.date_of_birth,
            staffData.salary,
            staffData.telephone,
            staffData.mobile,
            staffData.email
          ]
        );

        const [output] = await connection.execute('SELECT @success AS success, @message AS message');
        const { success, message } = output[0];

        if (success) {
          const staffModel = await StaffModel;
          // console.log('New staff member created with ID:', staffData.staff_id);
          const newStaff = await staffModel.findOne({ staff_id: staffData.staff_id });

          return res.status(201).json({
            message: message,
            staff: newStaff
          });

        }
        else return res.status(400).json({
          message: message
        });

      } finally {
        connection.release();
      }
    }
    catch (error) {
      // console.error('Error creating staff member:', error);
      return res.status(500).json({
        message: 'Error creating staff member',
        error: error.message
      });
    }
  },

  /**
   * Update a staff member
   */
  updateStaff: async (req, res) => {
    try {
      const staffModel = await StaffModel;
      const { staff_id } = req.params;
      const updates = req.body;

      if (updates.staff_id) {
        delete updates.staff_id;
      };

      const result = await staffModel.update({ staff_id }, updates);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Staff member not found.' });
      };

      const updatedStaff = await staffModel.findOne({ staff_id });
      return res.status(200).json({
        message: 'Staff member updated successfully',
        staff: updatedStaff
      });

    } 
    catch (error) {
      // console.error('Error updating staff member:', error);
      return res.status(500).json({
        message: 'Error updating staff member',
        error: error.message
      });
    }
  },

  /**
   * Get a single staff member
   */
  getStaffById: async (req, res) => {
    try {
      const staffModel = await StaffModel;
      const { staff_id } = req.params;

      const staff = await staffModel.findOne({ staff_id });
      if (!staff) {
        return res.status(404).json({ message: 'Staff member not found.' });
      }

      return res.status(200).json(staff);
    } 
    catch (error) {
      // console.error('Error fetching staff member:', error);
      return res.status(500).json({
        message: 'Error fetching staff member',
        error: error.message
      });
      
    }
  }
};

