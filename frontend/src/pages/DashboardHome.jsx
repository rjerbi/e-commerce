import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardSidebar from '../components/DashboardSidebar';
import './DashboardHome.css';

function DashboardHome() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [returnsData, setReturnsData] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, ordersRes, returnsRes, contactsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/orders'),
        axios.get('http://localhost:5000/api/returns'),
        axios.get('http://localhost:5000/api/contacts')
      ]);

      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setReturnsData(returnsRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const totalSales = orders
    .reduce((acc, order) => acc + Number(order.total || 0), 0)
    .toFixed(2);

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">
        <h2>Dashboard</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h2>Total Products</h2>
            <p className="stat-number">{products.length}</p>
          </div>
          <div className="stat-card">
            <h2>Total Orders</h2>
            <p className="stat-number">{orders.length}</p>
          </div>
          <div className="stat-card">
            <h2>Total Returns</h2>
            <p className="stat-number">{returnsData.length}</p>
          </div>
          <div className="stat-card">
            <h2>Total Contacts</h2>
            <p className="stat-number">{contacts.length}</p>
          </div>
          <div className="stat-card">
            <h2>Total Sales</h2>
            <p className="stat-number">{totalSales} TND</p>
          </div>
        </div>

        <div className="section">
          <h2>Recent Orders</h2>
          {orders.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer_name || order.customer}</td>
                    <td>{order.phone}</td>
                    <td>{order.total} TND</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
