import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>Serratec / Grupo 05 - Projeto Final de React  - {new Date().getFullYear()}</p>
    </footer>
  );
};
export default Footer;