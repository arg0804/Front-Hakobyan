import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PostCard from './components/PostCart/PostCard';
import logo from './assets/images/Logotype.svg';
import search from './assets/images/search.svg';
import MobileMenu from './components/mobileMenu/MobileMenu';


function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [navSticky, setNavSticky] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    axios.get('https://cloud.codesupply.co/endpoint/react/data.json')
      .then((response) => {
        setPosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setIsNavHidden(true);
        setNavSticky(true);
      } else {
        setIsNavHidden(false);
        setNavSticky(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    filterPosts(event.target.value);
  };

  const handleScroll = () => {
    if (window.scrollY >= 200) {
      setIsNavHidden(true);
      setNavSticky(true);
    } else {
      setIsNavHidden(false);
      setNavSticky(false);
    }
  };

  const filterPosts = (text) => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(text.toLowerCase()) ||
      post.text.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClosePopup = () => {
    setSelectedPost(null);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setShowOverlay(!showOverlay);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShowOverlay(false);
  };


  return (
    <div>
      <header className={`App-header ${navSticky ? 'sticky' : ''} ${isNavHidden ? 'hidden' : ''}`}>
        <div className='nav-top'>
          <div className="hamburger-icon" onClick={toggleMobileMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <img className='logo' src={logo} alt="Logo" />
          <img onClick={toggleSearch} className={`search-img ${searchOpen ? 'active' : ''}`} src={search} alt="Search" />
          <div className='search'>
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search posts..."
              className={`search-input ${searchOpen ? 'open' : ''}`}
            />
          </div>
        </div>
        <nav className="nav-bottom">
          <div>
            <ul>
              <li>
                <a href='#'>Demos</a>
                <span className="material-symbols-outlined">
                  expand_more
                </span>
              </li>
              <li>
                <a href='#'>Post</a>
                <span className="material-symbols-outlined">
                  expand_more
                </span>
                <ul className="submenu">
                  <li><a href="#">Post Header</a>
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </li>
                  <li><a href="#">Post Layout</a>
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </li>
                  <li><a href="#">Share Buttons</a>
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </li>
                  <li><a href="#">Gallery Post</a>
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </li>
                  <li><a href="#">Video Post</a>
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <a href='#'>Features</a>
                <span className="material-symbols-outlined">
                  expand_more
                </span>
              </li>
              <li>
                <a href='#'>Categories</a>
                <span className="material-symbols-outlined">
                  expand_more
                </span>
              </li>
              <li>
                <a href='#'>Shop</a>
                <span className="material-symbols-outlined">
                  expand_more
                </span>
              </li>
              <li>
                <a href='#'>Buy now</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
     <div className='sections'>
      {showOverlay && <div className="overlay" onClick={closeMobileMenu}></div>}
       <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
       <section className='cart-wrapper'>
         {filteredPosts.map((post, index) => (
           <PostCard key={index} post={post} onClick={() => handlePostClick(post)} />
         ))}
       </section>
       {selectedPost && (
         <div className="popup-background" onClick={handleClosePopup}>
           <div className="popup-content" onClick={(e) => e.stopPropagation()}>
             <button className="close-button" onClick={handleClosePopup}>Close</button>
             <h2>{selectedPost.title}</h2>
             <p>{selectedPost.text}</p>
           </div>
         </div>
       )}
     </div>
    </div>
  );
}

export default App;
