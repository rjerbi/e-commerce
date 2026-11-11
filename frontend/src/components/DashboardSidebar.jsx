import { useNavigate } from 'react-router-dom';
import './DashboardSidebar.css';

function DashboardSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-sidebar">
      <h2 className="sidebar-title">Admin Menu</h2>
      <nav className="sidebar-nav">
        <button
          className="nav-btn"
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <button
          className="nav-btn"
          onClick={() => navigate('/dashboard/products')}
        >
          Products
        </button>
        <button
          className="nav-btn"
          onClick={() => navigate('/dashboard/orders')}
        >
          Orders
        </button>
        <button
          className="nav-btn"
          onClick={() => navigate('/dashboard/returns')}
        >
          Returns
        </button>
        <button
          className="nav-btn"
          onClick={() => navigate('/dashboard/contacts')}
        >
          Contacts
        </button>
      </nav>
      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardSidebar;
