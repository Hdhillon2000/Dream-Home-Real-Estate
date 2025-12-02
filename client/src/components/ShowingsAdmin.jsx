import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthContext.js';
// Updated to use new design system components
import { Card } from './ui/Card.jsx';

export default function ShowingsAdmin() {
  const [showings, setShowings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchShowings = async () => {
      try {
        let url = '/api/showings/user';
        if (user.role === 'admin') {
          url = '/api/showings';
        }

        const response = await fetch(url, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setShowings(data);
        }
      } catch (error) {
        console.error('Error fetching showings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowings();
  }, [user.role]);

  const handleStatusUpdate = async (showingId, newStatus) => {
    try {
      const response = await fetch(`/api/showings/${showingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setShowings(prev =>
          prev.map(showing =>
            showing.showing_id === showingId ? result.showing : showing
          )
        );
        alert('Showing status updated successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating showing status:', error);
      alert('An error occurred while updating the showing status.');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-forest text-white';
      case 'completed':
        return 'bg-sea text-white';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-fog text-deepsea';
    }
  };

  return (
    <div className="bg-pearl min-h-screen">
      {/* Page Header */}
      <section className="section-top pb-8 bg-white">
        <div className="container-lg">
          <p className="eyebrow">Administration</p>
          <h1 className="text-h1 mb-4">Showing Management</h1>
          <p className="text-xl text-deepsea/70 max-w-2xl">
            View and manage property showing requests from prospective buyers.
          </p>
        </div>
      </section>

      <section className="section bg-pearl">
        <div className="container-lg">
          <Card variant="white">
            <h3 className="text-h4 mb-6">Scheduled Showings</h3>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="spinner" />
              </div>
            ) : showings.length === 0 ? (
              <p className="text-deepsea/60 py-8 text-center">No showings found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="data-table__header">
                    <tr>
                      <th className="data-table__cell text-left">Property</th>
                      <th className="data-table__cell text-left">Requested Time</th>
                      <th className="data-table__cell text-left">Client</th>
                      <th className="data-table__cell text-left">Status</th>
                      <th className="data-table__cell text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showings.map((showing) => (
                      <tr key={showing.showing_id} className="data-table__row">
                        <td className="data-table__cell font-medium">{showing.property_id}</td>
                        <td className="data-table__cell">
                          {new Date(showing.requested_time).toLocaleString()}
                        </td>
                        <td className="data-table__cell">
                          {showing.user_id ? 'Registered User' : (showing.requested_by_name || 'Anonymous')}
                        </td>
                        <td className="data-table__cell">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(showing.status)}`}>
                            {showing.status}
                          </span>
                        </td>
                        <td className="data-table__cell text-right">
                          {showing.status !== 'completed' && showing.status !== 'cancelled' && (
                            <select
                              value={showing.status}
                              onChange={(e) => handleStatusUpdate(showing.showing_id, e.target.value)}
                              className="form-select py-1 text-sm"
                            >
                              <option value="requested">Requested</option>
                              <option value="confirmed">Confirm</option>
                              <option value="completed">Complete</option>
                              <option value="cancelled">Cancel</option>
                            </select>
                          )}
                        </td>
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
