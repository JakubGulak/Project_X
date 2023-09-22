import React from 'react';
import facebook from './facebook.png';
import instagram from './instagram.png';
import ckziu from './ckziu.png'
import hands from './hands.png'
import './login.css'

function Login() {
  return (
    <div id='loginHeader'>
      <div id="header">
        <div id="header-content">
            <div id='icons'>
              <a href="https://www.ckziu.jaworzno.pl/" target="_blank" rel="noopener noreferrer">
                <img src={ckziu} alt="Ckziu" id='firsticon' />
              </a>
              <a href="https://www.facebook.com/elektrownia.ckziu/?locale=pl_PL" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" id='secondicon' />
              </a>
              <a href="https://www.instagram.com/elektrownia_jaworzno/" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" id='thirdicon' />
              </a>
          </div>
          <h1 id='title'>Biblioteka Szkolna CKZiU w Jaworznie</h1>
          <a href="/home">← Powrót</a>
        </div>
      </div>
      <div id='content'>
        <div id='fourthicon-container'>
            <img src={hands} alt='handsreadingbook' id='fourthicon' />
        </div>
      </div>
    </div>
  );
}

export default Login;
