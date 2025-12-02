/**
 * @file BranchMenu.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Manages branch lookup, updates, and creation.
 */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/AuthContext.js';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function BranchMenu() {
  const [branchRecords, setBranchRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    branch_no: '',
    street: '',
    city: '',
    postcode: ''
  });
  const [lookupResult, setLookupResult] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('/api/branches', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setBranchRecords(data);
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLookup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/branches/${formData.branch_no}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const branch = await response.json();
        setLookupResult(branch);
      } else {
        const error = await response.json();
        setLookupResult(null);
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error looking up branch:', error);
      setLookupResult(null);
      alert('An error occurred while looking up the branch.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setBranchRecords(prev => [...prev, result.branch]);
        setFormData({ branch_no: '', street: '', city: '', postcode: '' });
        alert('Branch created successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating branch:', error);
      alert('An error occurred while creating the branch.');
    }
  };

  const handleEdit = (branch) => {
    setEditingId(branch.branch_no);
    setFormData({
      branch_no: branch.branch_no,
      street: branch.street,
      city: branch.city,
      postcode: branch.postcode
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/branches/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          street: formData.street,
          city: formData.city,
          postcode: formData.postcode
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setBranchRecords(prev =>
          prev.map(branch =>
            branch.branch_no === editingId ? result.branch : branch
          )
        );
        setEditingId(null);
        setFormData({ branch_no: '', street: '', city: '', postcode: '' });
        alert('Branch updated successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating branch:', error);
      alert('An error occurred while updating the branch.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ branch_no: '', street: '', city: '', postcode: '' });
  };

  return (
    <div className="bg-pearl min-h-screen">
      {/* Page Header */}
      <section className="section-top pb-8 bg-white">
        <div className="container-lg">
          <p className="eyebrow">Administration</p>
          <h1 className="text-h1 mb-4">Branch Operations</h1>
          <p className="text-xl text-deepsea/70 max-w-2xl">
            {user?.role === 'admin' ?
              'Manage branch locations and keep addresses accurate.' :
              'View branch locations (contact an admin for changes).'}
          </p>
        </div>
      </section>

      <section className="section bg-pearl">
        <div className="container-lg">
          {/* Branch Lookup */}
          <Card variant="white" className="mb-8">
            <h3 className="text-h4 mb-2">Find Branch Address</h3>
            <p className="text-deepsea/60 mb-6">
              Enter a branch number to retrieve the street and city details.
            </p>

            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="form-label">Branch Number</label>
                <input
                  type="text"
                  name="branch_no"
                  className="form-input"
                  placeholder="B002"
                  value={formData.branch_no}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="sm:self-end">
                <Button type="submit" variant="forest">
                  Find Address
                </Button>
              </div>
            </form>

            {lookupResult && (
              <div className="bg-fog rounded-lg p-4">
                <p className="font-bold text-deepsea mb-1">Branch {lookupResult.branch_no}</p>
                <p className="text-deepsea/70">
                  {lookupResult.street}, {lookupResult.city}, {lookupResult.postcode}
                </p>
              </div>
            )}
          </Card>

          {/* Branch Directory */}
          <Card variant="white" className="mb-8">
            <h3 className="text-h4 mb-6">Branch Directory</h3>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="spinner" />
              </div>
            ) : branchRecords.length === 0 ? (
              <p className="text-deepsea/60 py-8 text-center">No branch records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="data-table__header">
                    <tr>
                      <th className="data-table__cell text-left">Branch</th>
                      <th className="data-table__cell text-left">Street</th>
                      <th className="data-table__cell text-left">City</th>
                      <th className="data-table__cell text-left">Post Code</th>
                      {user?.role === 'admin' && (
                        <th className="data-table__cell text-right">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {branchRecords.map((branch) => (
                      <tr key={branch.branch_no} className="data-table__row">
                        <td className="data-table__cell font-medium">{branch.branch_no}</td>
                        <td className="data-table__cell">{branch.street}</td>
                        <td className="data-table__cell">{branch.city}</td>
                        <td className="data-table__cell">{branch.postcode}</td>
                        {user?.role === 'admin' && (
                          <td className="data-table__cell text-right">
                            <button
                              type="button"
                              className="text-forest hover:text-deepsea font-medium transition-colors"
                              onClick={() => handleEdit(branch)}
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

          {/* Create/Update Form (Admin only) */}
          {user?.role === 'admin' && (
            <Card variant="white">
              <h3 className="text-h4 mb-2">
                {editingId ? "Update Branch Details" : "Open a New Branch"}
              </h3>
              <p className="text-deepsea/60 mb-6">
                {editingId ?
                  "Update the details for the selected branch." :
                  "Enter details for a new branch location."}
              </p>

              <form onSubmit={editingId ? handleUpdate : handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {!editingId && (
                    <div>
                      <label className="form-label">Branch Number</label>
                      <input
                        type="text"
                        name="branch_no"
                        className="form-input"
                        placeholder="B010"
                        value={formData.branch_no}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label className="form-label">Street</label>
                    <input
                      type="text"
                      name="street"
                      className="form-input"
                      placeholder="35 Raven Street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-input"
                      placeholder="Toronto"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Post Code</label>
                    <input
                      type="text"
                      name="postcode"
                      className="form-input"
                      placeholder="M5V 3K7"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" variant="forest">
                    {editingId ? 'Update Branch' : 'Create Branch'}
                  </Button>
                  {(editingId || formData.branch_no) && (
                    <Button type="button" variant="ghost" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
