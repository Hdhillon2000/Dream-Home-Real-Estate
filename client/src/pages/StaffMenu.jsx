/**
 * @file StaffMenu.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Presents workflows for hiring and updating staff members.
 */
import { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/AuthContext.js';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function StaffMenu() {
  const [staffRecords, setStaffRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    staff_id: '',
    firstName: '',
    lastName: '',
    position: '',
    branchNo: '',
    dob: '',
    salary: '',
    telephone: '',
    mobile: '',
    email: ''
  });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();

  // Fetch staff records
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('/api/staff', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setStaffRecords(data);
        }
      } catch (error) {
        console.error('Error fetching staff:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          staff_id: formData.staff_id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          position: formData.position,
          branch_no: formData.branchNo,
          date_of_birth: formData.dob,
          salary: parseFloat(formData.salary),
          telephone: formData.telephone,
          mobile: formData.mobile,
          email: formData.email
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setStaffRecords(prev => [...prev, result.staff]);
        setFormData({
          staff_id: '',
          firstName: '',
          lastName: '',
          position: '',
          branchNo: '',
          dob: '',
          salary: '',
          telephone: '',
          mobile: '',
          email: ''
        });
        alert('Staff member added successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating staff:', error);
      alert('An error occurred while creating the staff member.');
    }
  };

  const handleEdit = (staff) => {
    setEditingId(staff.staff_id);
    setFormData({
      staff_id: staff.staff_id,
      firstName: staff.first_name,
      lastName: staff.last_name,
      position: staff.position,
      branchNo: staff.branch_no,
      dob: staff.date_of_birth ? staff.date_of_birth.split('T')[0] : '',
      salary: staff.salary,
      telephone: staff.telephone,
      mobile: staff.mobile,
      email: staff.email
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/staff/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          position: formData.position,
          branch_no: formData.branchNo,
          date_of_birth: formData.dob,
          salary: parseFloat(formData.salary),
          telephone: formData.telephone,
          mobile: formData.mobile,
          email: formData.email
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setStaffRecords(prev =>
          prev.map(staff =>
            staff.staff_id === editingId ? result.staff : staff
          )
        );
        setEditingId(null);
        setFormData({
          staff_id: '',
          firstName: '',
          lastName: '',
          position: '',
          branchNo: '',
          dob: '',
          salary: '',
          telephone: '',
          mobile: '',
          email: ''
        });
        alert('Staff member updated successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      alert('An error occurred while updating the staff member.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      staff_id: '',
      firstName: '',
      lastName: '',
      position: '',
      branchNo: '',
      dob: '',
      salary: '',
      telephone: '',
      mobile: '',
      email: ''
    });
  };

  return (
    <div className="bg-pearl min-h-screen">
      {/* Page Header */}
      <section className="section-top pb-8 bg-white">
        <div className="container-lg">
          <p className="eyebrow">Administration</p>
          <h1 className="text-h1 mb-4">Staff Directory</h1>
          <p className="text-xl text-deepsea/70 max-w-2xl">
            {user?.role === 'admin' ?
              'Manage team members and keep records current.' :
              'View team members (contact an admin for changes).'}
          </p>
        </div>
      </section>

      <section className="section bg-pearl">
        <div className="container-lg">
          {/* Form Section (Admin only) */}
          {user?.role === 'admin' && (
            <Card variant="white" className="mb-8">
              <h3 className="text-h4 mb-2">
                {editingId ? "Update Staff Member" : "Add New Staff"}
              </h3>
              <p className="text-deepsea/60 mb-6">
                {editingId ?
                  "Update the details for the selected staff member." :
                  "Collect the required onboarding details for new team members."}
              </p>

              <form onSubmit={editingId ? handleUpdate : handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="form-label">Staff ID</label>
                    <input
                      type="text"
                      name="staff_id"
                      className="form-input"
                      placeholder="DH104"
                      value={formData.staff_id}
                      onChange={handleInputChange}
                      required
                      readOnly={!!editingId}
                    />
                  </div>
                  <div>
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      placeholder="Alex"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      placeholder="Kachur"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Position</label>
                    <input
                      type="text"
                      name="position"
                      className="form-input"
                      placeholder="Sales Associate"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Branch Number</label>
                    <input
                      type="text"
                      name="branchNo"
                      className="form-input"
                      placeholder="B001"
                      value={formData.branchNo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      className="form-input"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="form-label">Salary</label>
                    <input
                      type="number"
                      name="salary"
                      className="form-input"
                      min="0"
                      step="0.01"
                      placeholder="55000"
                      value={formData.salary}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Telephone</label>
                    <input
                      type="tel"
                      name="telephone"
                      className="form-input"
                      placeholder="416-555-1234"
                      value={formData.telephone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="form-label">Mobile</label>
                    <input
                      type="tel"
                      name="mobile"
                      className="form-input"
                      placeholder="437-555-9876"
                      value={formData.mobile}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                  <div className="lg:col-span-2">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="alex.kachur@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" variant="forest">
                      {editingId ? 'Update Staff' : 'Add Staff'}
                    </Button>
                    {(editingId || formData.staff_id) && (
                      <Button type="button" variant="ghost" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* Staff Directory Table */}
          <Card variant="white">
            <h3 className="text-h4 mb-6">All Staff Members</h3>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="spinner" />
              </div>
            ) : staffRecords.length === 0 ? (
              <p className="text-deepsea/60 py-8 text-center">No staff records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="data-table__header">
                    <tr>
                      <th className="data-table__cell text-left">ID</th>
                      <th className="data-table__cell text-left">Name</th>
                      <th className="data-table__cell text-left">Position</th>
                      <th className="data-table__cell text-left">Salary</th>
                      <th className="data-table__cell text-left">Phone</th>
                      <th className="data-table__cell text-left">Email</th>
                      {user?.role === 'admin' && (
                        <th className="data-table__cell text-right">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {staffRecords.map((staff) => (
                      <tr key={staff.staff_id} className="data-table__row">
                        <td className="data-table__cell font-medium">{staff.staff_id}</td>
                        <td className="data-table__cell">{staff.first_name} {staff.last_name}</td>
                        <td className="data-table__cell">{staff.position}</td>
                        <td className="data-table__cell">${staff.salary?.toLocaleString()}</td>
                        <td className="data-table__cell">{staff.telephone || 'N/A'}</td>
                        <td className="data-table__cell">{staff.email}</td>
                        {user?.role === 'admin' && (
                          <td className="data-table__cell text-right">
                            <button
                              type="button"
                              className="text-forest hover:text-deepsea font-medium transition-colors"
                              onClick={() => handleEdit(staff)}
                            >
                              Edit
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}
