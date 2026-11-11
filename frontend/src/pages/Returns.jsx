import { useState } from "react";

function Returns() {

  const [returns, setReturns] = useState([]);

  const [formData, setFormData] = useState({
    client: "",
    phone: "",
    reclamation: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addReturn = (e) => {

    e.preventDefault();

    setReturns([
      ...returns,
      {
        ...formData,
        status: "Pending"
      }
    ]);

    alert("Return Added");
  };

  const updateStatus = (index, status) => {

    const updated = [...returns];

    updated[index].status = status;

    setReturns(updated);
  };

  return (

    <div
      style={{
        padding: "40px"
      }}
    >

      <h1>Returns Management</h1>

      {/* FORM */}
      <form
        onSubmit={addReturn}
        style={{
          marginTop: "30px",
          background: "white",
          padding: "30px",
          borderRadius: "20px"
        }}
      >

        <input
          type="text"
          name="client"
          placeholder="Client Name"
          required
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          required
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="reclamation"
          placeholder="Reason of return"
          required
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          Insert Return
        </button>

      </form>

      {/* RETURNS LIST */}
      <div
        style={{
          marginTop: "40px"
        }}
      >

        {returns.map((item, index) => (

          <div
            key={index}
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "20px"
            }}
          >

            <h3>{item.client}</h3>

            <p>{item.phone}</p>

            <p>{item.reclamation}</p>

            <p>Status : {item.status}</p>

            <button
              onClick={() =>
                updateStatus(index, "Fixed")
              }
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "10px 20px",
                marginRight: "10px",
                borderRadius: "10px"
              }}
            >
              Fixed
            </button>

            <button
              onClick={() =>
                updateStatus(index, "Cancelled")
              }
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "10px"
              }}
            >
              Cancelled
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #ddd"
};

const buttonStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "15px 25px",
  borderRadius: "10px"
};

export default Returns;