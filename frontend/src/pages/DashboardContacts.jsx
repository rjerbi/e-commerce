import { useEffect, useState } from 'react';
import api from '../api';
import DashboardSidebar from '../components/DashboardSidebar';
import './DashboardContacts.css';

function DashboardContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) {
      return;
    }

    try {
      await api.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact message:', error);
      alert('Unable to delete contact message.');
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">
        <h2>Contact Messages</h2>
        <div className="contacts-section">
          {contacts.length > 0 ? (
            <div className="table-wrapper">
              <table className="contacts-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>#{contact.id}</td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.subject || '-'}</td>
                      <td>{contact.message}</td>
                      <td>{new Date(contact.created_at).toLocaleString()}</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(contact.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No contact messages yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardContacts;
