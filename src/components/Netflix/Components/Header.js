import React, { useState } from 'react'
import './Header.css'
import SearchBar from '../../SearchBar/SearchBar'

const Header = ({ black }) => {
    const [searchBarResults, setSearchBarResults] = useState([]);

    // RETURN
    return (
        <header className={black ? 'black' : ''}>

            <div className="header--logo">
                <a href="/">
                    <img src="https://res.cloudinary.com/dxiypxqje/image/upload/v1684538730/Icons/NEW%20TB_Master_Database/icon_netflix.png" alt="" />
                </a>
            </div>

            {/* TODO Insert search bar */}
            <div className="header--searchBar">
                <SearchBar
                    searchBarResults={searchBarResults}
                    setSearchBarResults={setSearchBarResults}
                />
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117" alt="" />
                </a>
            </div>

        </header>
    )
}

export default Header;