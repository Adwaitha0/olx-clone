
import React, { useContext, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';

import { useNavigate } from 'react-router-dom';


function Header() {
 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

 
  const [searchText, setSearchText] = useState('');

 
 const handleSearch = () => {
  if (searchText.trim() !== '') {
    navigate(`/?search=${encodeURIComponent(searchText.trim().toLowerCase())}`)
  }
};


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>

        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>

        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </div>
          <div className="searchAction" onClick={handleSearch}>
            <Search color="#ffffff" />
          </div>
        </div>

        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>

        <div className="loginPage">
          <span>{user ? `Welcome, ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>

        {user && (
          <span
            onClick={() => {
              firebase.auth().signOut();
              navigate('/login');
            }}
          >
            Logout
          </span>
        )}

        <div
          className="sellMenu"
          onClick={() => {
            if (user) {
              navigate('/create');
            } else {
              navigate('/login');
            }
          }}
        >
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

