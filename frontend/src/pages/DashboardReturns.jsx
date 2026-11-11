import { useEffect, useState } from 'react';
import api from '../api';
import DashboardSidebar from '../components/DashboardSidebar';
import './DashboardReturns.css';

function DashboardReturns() {
  const [returnsData, setReturnsData] = useState([]);
  const [returnForm, setReturnForm] = useState({
    client: '',
    phone: '',
    reclamation: ''
  });

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const res = await api.get('/returns');
      setReturnsData(res.data);
    } catch (error) {
      console.error('Error fetching returns:', error);
    }
  };

  const handleChange = (e) => {
    setReturnForm({
      ...returnForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAddReturn = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        '/returns',
        returnForm
      );

      alert('Return Request Added');

      setReturnForm({
        client: '',
        phone: '',
        reclamation: ''
      });

      fetchReturns();
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding return request');
    }
  };

  const handleUpdateReturn = async (id, status) => {
    try {
      await api.put(
        `/returns/${id}`,
        { status }
      );

      alert(`Return marked as ${status}`);
      fetchReturns();
    } catch (error) {
      console.error('Error updating return:', error);
      alert('Error updating return');
    }
  };

  const handleDeleteReturn = async (id) => {
    if (window.confirm('Are you sure you want to delete this return request?')) {
      try {
        await api.delete(`/returns/${id}`);
        alert('Return Deleted');
        fetchReturns();
      } catch (error) {
        console.error('Error deleting return:', error);
        alert('Error deleting return');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">
        <h2>Returns Management</h2>

        {/* ADD RETURN FORM */}
        <div className="form-section">
          <h2>Add Return Request</h2>
          <form onSubmit={handleAddReturn} className="return-form">
            <div className="form-group">
              <input
                type="text"
                name="client"
                placeholder="Client Name"
                value={returnForm.client}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={returnForm.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="reclamation"
                placeholder="Return Reason / Reclamation"
                value={returnForm.reclamation}
                onChange={handleChange}
                required
                rows="4"
              />
            </div>

            <button type="submit" className="btn-submit">
              Add Return Request
            </button>
          </form>
        </div>

        {/* RETURNS TABLE */}
        <div className="returns-section">
          <h2>All Return Requests ({returnsData.length})</h2>
          {returnsData.length > 0 ? (
            <div className="table-wrapper">
              <table className="returns-table">
                <thead>
                  <tr>
                    <th>Return ID</th>
                    <th>Client</th>
                    <th>Phone</th>
                    <th>Reclamation</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {returnsData.map((returnItem) => (
                    <tr key={returnItem.id}>
                      <td className="return-id">#{returnItem.id}</td>
                      <td>{returnItem.client}</td>
                      <td>{returnItem.phone}</td>
                      <td className="reclamation-text">
                        {returnItem.reclamation}
                      </td>
                      <td>
                        <span
                          className={`status status-${returnItem.status.toLowerCase()}`}
                        >
                          {returnItem.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {returnItem.status !== 'Resolved' && (
                            <button
                              className="btn-resolve"
                              onClick={() =>
                                handleUpdateReturn(returnItem.id, 'Resolved')
                              }
                            >
                              Resolve
                            </button>
                          )}
                          {returnItem.status !== 'Rejected' && (
                            <button
                              className="btn-reject"
                              onClick={() =>
                                handleUpdateReturn(returnItem.id, 'Rejected')
                              }
                            >
                              Reject
                            </button>
                          )}
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteReturn(returnItem.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">No return requests yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardReturns;
