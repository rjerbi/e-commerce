import { useEffect, useState } from 'react';
import api from '../api';
import DashboardSidebar from '../components/DashboardSidebar';
import './DashboardProducts.css';

function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(
          `/products/${editingId}`,
          formData
        );
        alert('Product Updated');
        setEditingId(null);
      } else {
        await api.post(
          '/products',
          formData
        );
        alert('Product Added');
      }

      setFormData({
        name: '',
        price: '',
        image: '',
        description: ''
      });

      fetchProducts();
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        alert('Product Deleted');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });
    setEditingId(product.id);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      description: ''
    });
    setEditingId(null);
  };

  return (
    <div className="dashboard-container">
      <DashboardSidebar />
      <div className="dashboard-content">
        <h2>Products Management</h2>

        {/* ADD/EDIT PRODUCT FORM */}
        <div className="form-section">
          <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleAddProduct} className="product-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* PRODUCTS LIST */}
        <div className="products-section">
          <h2>All Products ({products.length})</h2>
          {products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">{product.price} TND</p>
                    <p className="description">{product.description}</p>
                    <div className="product-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardProducts;
