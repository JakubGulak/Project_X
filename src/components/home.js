import React from 'react';
import facebook from './facebook.png';
import instagram from './instagram.png';

function Home() {
  return (
    <div>
      <div id="header">
        <div id="header-content">
          <a href="https://www.facebook.com/twojaprofil" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" id='firsticon' />
          </a>
          <a href="https://www.facebook.com/twojaprofil" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" id='secondicon' />
          </a>
          <h1>Biblioteka Szkolna CKZiU w Jaworznie</h1>
          <a href="/main">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
