/**
 * @file ClientMenu.jsx
 * @author Alex Kachur
 * @since 2025-11-01
 * @purpose Manages client onboarding and maintenance.
 */
import { useEffect, useState } from 'react';
import { useAuth } from '../components/auth/AuthContext.js';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function ClientMenu() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    client_id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactMethod: '',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: formData.client_id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          preferred_contact: formData.contactMethod,
          notes: formData.notes
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setClients(prev => [...prev, result.client]);
        setFormData({
          client_id: '', firstName: '', lastName: '', email: '',
          phone: '', contactMethod: '', notes: ''
        });
        alert('Client registered successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating client:', error);
      alert('An error occurred while registering the client.');
    }
  };

  const handleEdit = (client) => {
    setEditingId(client.client_id);
    setFormData({
      client_id: client.client_id,
      firstName: client.first_name,
      lastName: client.last_name,
      email: client.email,
      phone: client.phone || '',
      contactMethod: client.preferred_contact,
      notes: client.notes || ''
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/clients/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          preferred_contact: formData.contactMethod,
          notes: formData.notes
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setClients(prev =>
          prev.map(client =>
            client.client_id === editingId ? result.client : client
          )
        );
        setEditingId(null);
        setFormData({
          client_id: '', firstName: '', lastName: '', email: '',
          phone: '', contactMethod: '', notes: ''
        });
        alert('Client updated successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating client:', error);
      alert('An error occurred while updating the client.');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      client_id: '', firstName: '', lastName: '', email: '',
      phone: '', contactMethod: '', notes: ''
    });
  };

  return (
    <div className="bg-pearl min-h-screen">
      {/* Page Header */}
      <section className="section-top pb-8 bg-white">
        <div className="container-lg">
          <p className="eyebrow">Administration</p>
          <h1 className="text-h1 mb-4">Client Services</h1>
          <p className="text-xl text-deepsea/70 max-w-2xl">
            {user?.role === 'admin' ?
              'Register prospective buyers and keep their contact preferences current.' :
              'View client information (contact an admin for changes).'}
          </p>
        </div>
      </section>

      <section className="section bg-pearl">
        <div className="container-lg">
          {/* Form Section (Admin only) */}
          {user?.role === 'admin' && (
            <Card variant="white" className="mb-8">
              <h3 className="text-h4 mb-2">
                {editingId ? "Update Existing Client" : "Register New Client"}
              </h3>
              <p className="text-deepsea/60 mb-6">
                {editingId ?
                  "Update the details for the selected client." :
                  "Capture the core client details for registration."}
              </p>

              <form onSubmit={editingId ? handleUpdate : handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {!editingId && (
                    <div>
                      <label className="form-label">Client ID</label>
                      <input
                        type="text"
                        name="client_id"
                        className="form-input"
                        placeholder="CL105"
                        value={formData.client_id}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      placeholder="Taylor"
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
                      placeholder="Morgan"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="taylor@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="905-555-2233"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="form-label">Preferred Contact</label>
                    <select
                      name="contactMethod"
                      className="form-select"
                      value={formData.contactMethod}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select method</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    className="form-input"
                    rows="3"
                    placeholder="Add preferences or budget notes..."
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" variant="forest">
                    {editingId ? 'Update Client' : 'Register Client'}
                  </Button>
                  {(editingId || formData.client_id) && (
                    <Button type="button" variant="ghost" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          )}

          {/* Client Directory */}
          <Card variant="white">
            <h3 className="text-h4 mb-6">Client Directory</h3>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="spinner" />
              </div>
            ) : clients.length === 0 ? (
              <p className="text-deepsea/60 py-8 text-center">No client records found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="data-table__header">
                    <tr>
                      <th className="data-table__cell text-left">ID</th>
                      <th className="data-table__cell text-left">Name</th>
                      <th className="data-table__cell text-left">Phone</th>
                      <th className="data-table__cell text-left">Email</th>
                      <th className="data-table__cell text-left">Preferred</th>
                      {user?.role === 'admin' && (
                        <th className="data-table__cell text-right">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.client_id} className="data-table__row">
                        <td className="data-table__cell font-medium">{client.client_id}</td>
                        <td className="data-table__cell">{client.first_name} {client.last_name}</td>
                        <td className="data-table__cell">{client.phone || 'N/A'}</td>
                        <td className="data-table__cell">{client.email}</td>
                        <td className="data-table__cell capitalize">{client.preferred_contact}</td>
                        {user?.role === 'admin' && (
                          <td className="data-table__cell text-right">
                            <button
                              type="button"
                              className="text-forest hover:text-deepsea font-medium transition-colors"
                              onClick={() => handleEdit(client)}
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
