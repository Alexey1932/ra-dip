import React, { useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import headerLogo from '../img/header-logo.png';
import headerControlsSprite from '../img/header-controls-sprite.png'; 
import bannerImage from '../img/banner.jpg';
import SearchComponent from './SearchComponent'; 
import '../css/header.css'; 

function Header() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const toggleSearch = () => {
    setSearchVisible(prev => !prev);
  };
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchVisible(false);
    }
  };
  

  const goToCart = () => {
    navigate('/cart'); // Переход на страницу корзины
  };

  useEffect(() => {    
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItemCount(cartItems.reduce((count, item) => count + item.quantity, 0));
  }, []);

  return (
    <header className="header-container">
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src={headerLogo} alt="Bosa Noga" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Главная</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalog">Каталог</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">О магазине</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacts">Контакты</Link>
            </li>
          </ul>
        </div>

        <div className="header-controls-pics">
          <div className="header-controls-pic header-controls-search" onClick={toggleSearch}>
            {searchVisible && (
              <div className="search-container" onClick={(e) => e.stopPropagation()}>
                <SearchComponent onSearch={handleSearch} />
                <div className="search-icon" onClick={() => {
                  handleSearch(searchTerm);
                  setSearchVisible(false);
                }}></div>
              </div>
            )}
          </div>

          <div className="header-controls-pic header-controls-cart" onClick={goToCart}
             style={{backgroundImage: `url(${headerControlsSprite})`, backgroundPosition: '0 0'}}>
             {cartItemCount > 0 && (
            <span className="header-controls-cart-full">{cartItemCount}</span>
          )}
        </div>
        
        
        </div>
      </nav>
      
      <div className="banner">
        <img src={bannerImage} className="img-fluid" alt="К весне готовы!" />
        <h2 className="banner-header">К весне готовы!</h2>
      </div>
    </header>
  );
}

export default Header;

