import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

function Home() {
  return (
    <div>
      <div id="header">
          <h1>Biblioteka Szkolna CKZiU w Jaworznie</h1>

      </div>
      <a href="https://www.facebook.com/twojaprofil" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
          </a>
        <a href="/main">Login</a>
    </div>
  );
}

export default Home;