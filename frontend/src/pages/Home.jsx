import { useEffect, useState } from 'react';
import api from '../api';
import Chatbot from '../components/Chatbot';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div style={styles.container}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      <Footer />

      <Chatbot />
      
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    flexWrap: 'wrap',
    minHeight: '70vh'
  }
};

export default Home;
