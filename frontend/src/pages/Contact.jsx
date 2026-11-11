import { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/contacts', form);
      setStatusMessage('Your message has been sent successfully ! We will get back to you soon.');
      setShowPopup(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending contact message:', error);
      setStatusMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div>
          <h2>Contact Us</h2>
          <p>We are here to help you with your orders and questions.</p>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-card contact-info">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> contact@tunixo.com</p>
          <p><strong>Phone:</strong> +216 71 000 000</p>
          <p><strong>Address:</strong> Tunis, Tunisia</p>

          <h3>Support Hours</h3>
          <p>Monday – Friday : 8:00 AM – 6:00 PM</p>

          <h3>Follow Us</h3>
          <p>Facebook | Instagram | TikTok</p>

          <h3>Quick FAQ</h3>
          <ul>
            <li>Delivery information</li>
            <li>Returns and refunds</li>
            <li>Payment methods</li>
          </ul>
        </div>

        <div className="contact-card contact-form-card">
          <h2>Send a message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Subject
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                required
              />
            </label>

            <button type="submit" className="contact-button">Send</button>
            {statusMessage && <p className="contact-status">{statusMessage}</p>}
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="contact-popup">
          Your message has been sent successfully ! We will get back to you soon.
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Contact;
