import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import optionsData from './optionsData'; // Import the optionsData

const Navbar = ({ setSelectedOption }) => {

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value); 
    };
    return (
        <>
            <div className="App">
                <header style={{ borderBottom: '0.8px solid rgb(7, 17, 32)', background: 'rgb(2, 13, 28)',height:"3.5rem", padding: '10px 2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/"><h2 style={{ display: 'flex', alignItems: 'center', color: 'whitesmoke', marginRight: '1rem',textDecoration: "none" }}>
                        <h2 className="sign-painted">Multi BLockChain Explorer</h2>
                        
                    </h2>
                </Link>
                    <nav style={{ display: 'flex', alignItems: 'center' }}>
                        <ul className="nav-list" style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
                            <li className="nav-item" style={{ marginRight: '1rem' }}><Link to="/" className="nav-link">Recent Blocks</Link></li>
                            <li className="nav-item" style={{ marginRight: '1rem' }}><Link to="/search-block" className="nav-link">Search Block</Link></li>
                            <li className="nav-item" style={{ marginRight: '1rem' }}><Link to="/search-transaction" className="nav-link">Search Transaction</Link></li>
                            <li className="nav-item" style={{ marginRight: '1rem' }}><Link to="/search-address" className="nav-link">Search Address</Link></li>
                            <li className="nav-item dropdown" style={{ position: 'relative', marginRight: '1rem',marginBottom:"1rem" }}>
                                <div className="select-dropdown">
                                    <select className="custom-select" onChange={handleOptionChange}>
                                        {optionsData.map(option => (
                                            <option key={option.value} value={option.value}>
                                                
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>

        <div className="devicer"></div>
        </>
    );
};

export default Navbar;
