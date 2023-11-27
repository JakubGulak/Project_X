import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import facebook from './facebook.png';
import instagram from './instagram.png';
import ckziu from './ckziu.png';
import library from './library.jpg'
import book from './book.jpg'
import { Link } from 'react-router-dom'; 
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {

  const articles = [
    {
      title: 'Biblioteka w CKZiU najlepsza na Śląsku!',
      image: library,
      link: '/article1',
    },
    {
      title: 'Najczęściej wypożyczane książki tego roku!',
      image: book,
      link: '/article2',
    },
  ];
  return (
    <div id='app'>
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
            <a href="/login" id='loga'>Zaloguj się!</a>
        </div>
      </div>
      <div id='content'>
      {articles.map((article, index) => (
          <div key={index} className="article">
            <div className="article-container">
              <img src={article.image} alt={article.title} className="article-image" />
              <h2 className="article-title">{article.title}</h2>
              <Link to={article.link} className="read-more-link">
                Czytaj więcej
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
