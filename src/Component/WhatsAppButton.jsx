import React from 'react';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS
import './whatsapp.css'

const WhatsAppButton = () => {
  return (
    <div className="whatsapp-button">
      <a
        href="https://wa.me/+923303074060"  // Replace with your WhatsApp number
        target="_blank"                   // Open in a new tab
        rel="noopener noreferrer"
        className="whatsapp-icon"
      >
        <i className="fa fa-whatsapp"></i> {/* WhatsApp Icon */}
      </a>
    </div>
  );
};

export default WhatsAppButton;
