import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerLeft}>
          <h3 style={styles.footerTitle}>Tunixo</h3>
          <p style={styles.footerTagline}>Your online store in Tunisia.</p>

          <div style={styles.footerLinks}>
            <Link to="/" style={styles.link}>Home</Link>
            <span style={styles.separator}>|</span>
            <Link to="/cart" style={styles.link}>Cart</Link>
            <span style={styles.separator}>|</span>
            <Link to="/contact" style={styles.link}>Contact</Link>
          </div>

          <div style={styles.footerContact}>
            <p style={styles.contactItem}>
              <strong>Email:</strong>
              <a href="mailto:contact@tunixo.com" style={styles.contactHover}>contact@tunixo.com</a>
            </p>
            <p style={styles.contactItem}>
              <strong>Phone:</strong>
              <span style={styles.contactHover}>+216 71 000 000</span>
            </p>
            <p style={styles.contactItem}>
              <strong>Address:</strong>
              <span style={styles.contactHover}>Tunis, Tunisia</span>
            </p>
          </div>

          <div style={styles.footerSocial}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.socialLink}>Facebook</a>
            <span style={styles.separator}>|</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={styles.socialLink}>Instagram</a>
            <span style={styles.separator}>|</span>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" style={styles.socialLink}>TikTok</a>
          </div>

          <p style={styles.copyright}>© 2026 Tunixo. All rights reserved.</p>
        </div>

        <div style={styles.footerRight}>
          <h3 style={styles.footerTitle}>Our Services</h3>
          <ul style={styles.servicesList}>
            <li style={styles.serviceItem}>✓ Fast delivery in less than 48h</li>
            <li style={styles.serviceItem}>✓ Easy returns and refunds</li>
            <li style={styles.serviceItem}>✓ Guaranteed high quality</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#111827',
    color: 'white',
    padding: '40px',
    marginTop: '60px',
    borderTop: '1px solid #374151'
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '60px',
    flexWrap: 'wrap'
  },
  footerLeft: {
    flex: 1,
    minWidth: '300px'
  },
  footerRight: {
    flex: 1,
    minWidth: '300px'
  },
  footerTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '15px',
    color: '#f9fafb'
  },
  footerTagline: {
    color: '#9ca3af',
    marginBottom: '20px',
    fontSize: '14px'
  },
  footerLinks: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  link: {
    color: '#9ca3af',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'color 0.3s',
    textDecoration: 'none'
  },
  separator: {
    color: '#6b7280'
  },
  footerContact: {
    marginBottom: '20px'
  },
  contactItem: {
    margin: '8px 0',
    fontSize: '14px',
    color: '#9ca3af'
  },
  contactHover: {
    color: '#2563eb',
    marginLeft: '8px',
    fontWeight: '600',
    textDecoration: 'none'
  },
  footerSocial: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  socialLink: {
    color: '#9ca3af',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'none'
  },
  copyright: {
    marginTop: '20px',
    fontSize: '12px',
    color: '#6b7280'
  },
  servicesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  serviceItem: {
    color: '#9ca3af',
    marginBottom: '12px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center'
  }
};

export default Footer;
