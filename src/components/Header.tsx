import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo Gepid" className="logo-img" />
        <span>GEPID</span>
      </div>
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Abrir menu"
        style={{ zIndex: 40 }}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`side-menu${open ? ' open' : ''}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>&times;</button>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Consulta</a></li>
          <li><a href="#">Relatórios</a></li>
        </ul>
      </nav>
      {open && <div className="backdrop" onClick={() => setOpen(false)} />}
    </header>
  );
}