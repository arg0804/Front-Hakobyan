import React from 'react';
import './MobileMenu.css';
import logo from '../../assets/images/Logotype.svg';

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="popup-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="close-icon" onClick={onClose}>
        &times;
      </div>
      <ul>
        <li>
          <a href="#">Demos</a>
          <span className="material-symbols-outlined">
            expand_more
          </span>
        </li>
        <li>
          <a href="#">Post</a>
          <span className="material-symbols-outlined">
            expand_more
          </span>
          <ul className="submenu-hover">
            <li><a href="#">Post Header</a></li>
            <li><a href="#">Post Layout</a></li>
            <li><a href="#">Share Buttons</a></li>
            <li><a href="#">Gallery Post</a></li>
            <li><a href="#">Video Post</a></li>
          </ul>
        </li>
        <li>
          <a href="#">Features</a>
          <span className="material-symbols-outlined">
            expand_more
          </span>
        </li>
        <li>
          <a href="#">Categories</a>
          <span className="material-symbols-outlined">
            expand_more 
          </span>
        </li>
        <li>
          <a href="#">Shop</a>
          <span className="material-symbols-outlined">
            expand_more
          </span>
        </li>
        <li>
          <a href="#">Buy now</a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
