import { useEffect, useState } from 'react';
import api from '../api';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders')
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Orders</h2>

      {orders.map((order) => (
        <div key={order.id}>
          <p>
            {order.customer_name} - {order.total} DT
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;