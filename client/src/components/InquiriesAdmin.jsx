import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthContext.js';
// Updated to use new design system components
import { Card } from './ui/Card.jsx';
import { Button } from './ui/Button.jsx';

export default function InquiriesAdmin() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [responseText, setResponseText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        let url = '/api/inquiries/user';
        if (user.role === 'admin') {
          url = '/api/inquiries';
        }

        const response = await fetch(url, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setInquiries(data);
        }
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, [user.role]);

  const handleRespond = async (inquiryId) => {
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}/respond`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          response: responseText
        }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setInquiries(prev =>
          prev.map(inquiry =>
            inquiry.inquiry_id === inquiryId ? result.inquiry : inquiry
          )
        );
        setSelectedInquiry(null);
        setResponseText('');
        alert('Response sent successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error responding to inquiry:', error);
      alert('An error occurred while sending your response.');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'responded':
        return 'bg-forest text-white';
      case 'closed':
        return 'bg-sea text-white';
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
          <h1 className="text-h1 mb-4">Inquiry Management</h1>
          <p className="text-xl text-deepsea/70 max-w-2xl">
            View and respond to property inquiries from prospective buyers.
          </p>
        </div>
      </section>

      <section className="section bg-pearl">
        <div className="container-lg">
          <Card variant="white">
            <h3 className="text-h4 mb-6">Property Inquiries</h3>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="spinner" />
              </div>
            ) : inquiries.length === 0 ? (
              <p className="text-deepsea/60 py-8 text-center">No inquiries found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead className="data-table__header">
                    <tr>
                      <th className="data-table__cell text-left">Property</th>
                      <th className="data-table__cell text-left">Date</th>
                      <th className="data-table__cell text-left">Client</th>
                      <th className="data-table__cell text-left">Question</th>
                      <th className="data-table__cell text-left">Status</th>
                      <th className="data-table__cell text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.inquiry_id} className="data-table__row">
                        <td className="data-table__cell font-medium">{inquiry.property_id}</td>
                        <td className="data-table__cell">
                          {new Date(inquiry.created_at).toLocaleString()}
                        </td>
                        <td className="data-table__cell">
                          {inquiry.user_id ? 'Registered User' : (inquiry.inquirer_name || 'Anonymous')}
                        </td>
                        <td className="data-table__cell max-w-xs truncate" title={inquiry.question}>
                          {inquiry.question.substring(0, 40)}{inquiry.question.length > 40 ? '...' : ''}
                        </td>
                        <td className="data-table__cell">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(inquiry.status)}`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="data-table__cell text-right">
                          {inquiry.status === 'open' && (
                            <button
                              type="button"
                              className="text-forest hover:text-deepsea font-medium transition-colors"
                              onClick={() => {
                                setSelectedInquiry(inquiry);
                                setResponseText('');
                              }}
                            >
                              Respond
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* Response Modal */}
          {selectedInquiry && (
            <Card variant="white" className="mt-8">
              <h3 className="text-h4 mb-4">Respond to Inquiry</h3>

              <div className="bg-fog rounded-lg p-4 mb-6">
                <p className="text-sm text-deepsea/60 mb-1">Question from {selectedInquiry.user_id ? 'Registered User' : selectedInquiry.inquirer_name}</p>
                <p className="text-deepsea font-medium">{selectedInquiry.question}</p>
              </div>

              <div className="mb-6">
                <label className="form-label">Your Response</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows="5"
                  className="form-input"
                  placeholder="Type your response here..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="forest"
                  onClick={() => handleRespond(selectedInquiry.inquiry_id)}
                  disabled={!responseText.trim()}
                >
                  Send Response
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedInquiry(null);
                    setResponseText('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
