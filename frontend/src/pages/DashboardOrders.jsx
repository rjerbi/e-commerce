import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import './DashboardOrders.css';

function DashboardOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        alert('Order Deleted');
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Error deleting order');
      }
    }
  };

  const handleDeliverOrder = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status: 'Delivered' }
      );
      alert('Order marked as Delivered');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order');
    }
  };

  const handleReturnOrder = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status: 'Returned' }
      );
      alert('Order marked as Returned');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order');
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">
        <h2>Orders Management</h2>

        {/* STATS */}
        <div className="orders-stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-value">{orders.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p className="stat-value">
              {orders
                .reduce((acc, order) => acc + Number(order.total), 0)
                .toFixed(2)}{' '}
              TND
            </p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p className="stat-value">
              {orders.filter((o) => o.status === 'Pending').length}
            </p>
          </div>
          <div className="stat-card">
            <h3>Delivered</h3>
            <p className="stat-value">
              {orders.filter((o) => o.status === 'Delivered').length}
            </p>
          </div>
        </div>

        {/* ORDERS TABLE */}
        <div className="orders-section">
          <h2>All Orders</h2>
          {orders.length > 0 ? (
            <div className="table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Details</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">#{order.id}</td>
                      <td>{order.customer_name || order.customer}</td>
                      <td>{order.phone}</td>
                      <td className="order-address">{order.address}</td>
                      <td className="price">{order.total} TND</td>
                      <td>
                        <span className={`status status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>
                        <div className="action-buttons">
                          {order.status !== 'Delivered' && (
                            <button
                              className="btn-deliver"
                              onClick={() => handleDeliverOrder(order.id)}
                            >
                              Deliver
                            </button>
                          )}
                          {order.status === 'Delivered' && (
                            <button
                              className="btn-return"
                              onClick={() => handleReturnOrder(order.id)}
                            >
                              Return
                            </button>
                          )}
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteOrder(order.id)}
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
            <p className="no-data">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardOrders;
