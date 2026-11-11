import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [returnsData, setReturnsData] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: ""
  });

  const [returnForm, setReturnForm] = useState({
    client: "",
    phone: "",
    reclamation: ""
  });

  // LOAD DATA
  const fetchData = async () => {

    const productsRes =
      await api.get("/products");

    const ordersRes =
      await api.get("/orders");

    const returnsRes =
      await api.get("/returns");

    setProducts(productsRes.data);
    setOrders(ordersRes.data);
    setReturnsData(returnsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD PRODUCT
  const addProduct = async (e) => {

    e.preventDefault();

    await api.post(
      "/products",
      formData
    );

    fetchData();

    alert("Product Added");
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    await api.delete(`/products/${id}`);

    fetchData();
  };

  // DELETE ORDER
  const deleteOrder = async (id) => {

    await api.delete(`/orders/${id}`);

    fetchData();
  };

  // DELIVER ORDER
  const deliverOrder = async (id) => {

    await api.put(
      `/orders/${id}`,
      {
        status: "Delivered"
      }
    );

    fetchData();
  };

  // RETURN ORDER
  const returnOrder = async (id) => {

    await api.put(
      `/orders/${id}`,
      {
        status: "Returned"
      }
    );

    fetchData();
  };

  // ADD RETURN
  const addReturn = async (e) => {

    e.preventDefault();

    await api.post(
      "/returns",
      returnForm
    );

    fetchData();

    alert("Return Added");
  };

  // UPDATE RETURN
  const updateReturn = async (id, status) => {

    await api.put(
      `/returns/${id}`,
      { status }
    );

    fetchData();
  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>Admin Dashboard</h1>

      {/* STATS */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "30px"
        }}
      >

        <div style={cardStyle}>
          <h2>Total Products</h2>
          <p>{products.length}</p>
        </div>

        <div style={cardStyle}>
          <h2>Total Orders</h2>
          <p>{orders.length}</p>
        </div>

        <div style={cardStyle}>
          <h2>Sales</h2>

          <p>
            {
              orders.reduce(
                (acc, item) =>
                  acc + Number(item.total),
                0
              ).toFixed(2)
            } TND
          </p>
        </div>

      </div>

      {/* ADD PRODUCT */}
      <div style={sectionStyle}>

        <h2>Add Product</h2>

        <form onSubmit={addProduct}>

          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value
              })
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Image URL"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.value
              })
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
            }
            style={inputStyle}
          />

          <button style={buttonStyle}>
            Add Product
          </button>

        </form>

      </div>

      {/* PRODUCTS */}
      <div style={sectionStyle}>

        <h2>Products</h2>

        {products.map((product) => (

          <div
            key={product.id}
            style={itemStyle}
          >

            <div>
              <h3>{product.name}</h3>
              <p>{product.price} TND</p>
            </div>

            <button
              onClick={() =>
                deleteProduct(product.id)
              }
              style={deleteButton}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

      {/* ORDERS */}
      <div style={sectionStyle}>

        <h2>Orders</h2>

        {orders.map((order) => (

          <div
            key={order.id}
            style={itemStyle}
          >

            <div>
              <h3>{order.customer_name}</h3>
              <p>{order.total} TND</p>
              <p>Status : {order.status}</p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px"
              }}
            >

              <button
                onClick={() =>
                  deliverOrder(order.id)
                }
                style={greenButton}
              >
                Delivered
              </button>

              <button
                onClick={() =>
                  returnOrder(order.id)
                }
                style={orangeButton}
              >
                Returned
              </button>

              <button
                onClick={() =>
                  deleteOrder(order.id)
                }
                style={deleteButton}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* RETURNS */}
      <div style={sectionStyle}>

        <h2>Returns</h2>

        <form onSubmit={addReturn}>

          <input
            type="text"
            placeholder="Client"
            required
            style={inputStyle}
            onChange={(e) =>
              setReturnForm({
                ...returnForm,
                client: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Phone"
            required
            style={inputStyle}
            onChange={(e) =>
              setReturnForm({
                ...returnForm,
                phone: e.target.value
              })
            }
          />

          <textarea
            placeholder="Reclamation"
            required
            style={inputStyle}
            onChange={(e) =>
              setReturnForm({
                ...returnForm,
                reclamation: e.target.value
              })
            }
          />

          <button style={buttonStyle}>
            Insert Return
          </button>

        </form>

        {returnsData.map((item) => (

          <div
            key={item.id}
            style={itemStyle}
          >

            <div>
              <h3>{item.client}</h3>
              <p>{item.reclamation}</p>
              <p>Status : {item.status}</p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px"
              }}
            >

              <button
                onClick={() =>
                  updateReturn(item.id, "Fixed")
                }
                style={greenButton}
              >
                Fixed
              </button>

              <button
                onClick={() =>
                  updateReturn(item.id, "Cancelled")
                }
                style={deleteButton}
              >
                Cancelled
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  width: "250px"
};

const sectionStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  marginTop: "40px"
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ddd"
};

const buttonStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "15px 25px",
  borderRadius: "10px",
  cursor: "pointer"
};

const deleteButton = {
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer"
};

const greenButton = {
  background: "green",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer"
};

const orangeButton = {
  background: "orange",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer"
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "15px",
  marginTop: "20px"
};

export default Dashboard;