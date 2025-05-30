import React from 'react';
import Navbar from "../components/navbarAfterlogin";
import Searchbar from '../components/searchbar'; 
import styles from "../assets/styles/index.scss"; // Import CSS Module

function Header(props) {
    console.log("Header component rendered");
    return (
        <div className='header'>
            <Navbar/>
            <div className="footer-content">
                <h1>We Find The Best Tours For You</h1>
                <p>Discover your next adventure with ease – book unforgettable tours and travel experiences tailored just for you!</p>
                <div className="videoArea">
                    <div className="circle-button">
                        <a href='https://www.tiktok.com/@nadeshiko_edits/video/7204194299746045190'>
                            <div className="play-icon"></div>
                        </a>              
                    </div>
                    <p>Watch video</p>
                    
                </div>
            </div>
            <Searchbar/>
        </div>
    );
}

export default Header;