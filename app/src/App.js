import './App.css';
import Home from './components/Home.js';
import FirstLevel from './components/firstlevel';
import SecondLevel from './components/2level';
import About from './components/about';
import Register from './components/register';
import Login from './components/login';
import ThirdLevel from './components/three';
import ChangePassword from './components/changepassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from './components/modal';
import React, { useState, useEffect } from 'react';

function App() {

    //Alapértelmezett modal állapotok meghatározása
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLoggedIn, setModalIsLoggedIn] = useState(false);

    //A login/logout gomb felirata minden betöltésnél frissüljön
    useEffect(() => {
        const checkUserInStorage = () => {
            if (localStorage.getItem("username")) {
                setModalIsLoggedIn(true);
            }
        };
        checkUserInStorage();
    }, []);

    //Ha a felhasználó be van lépve 
    const handleOpenModal = () => {
        if (localStorage.getItem("username")) {
            setModalIsLoggedIn(true);
        }
        setIsModalOpen(true);

    };

    //Modal becsukás
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    //
    const handleLogoutModal = () => {
        setIsModalOpen(false);
        setModalIsLoggedIn(false);
    };

    useEffect(() => {
        if (isModalLoggedIn) {

        }
            
        else {
            
        }
        
    }, [isModalLoggedIn]);


    return (
        <Router>
            <div className="App">
                
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="firstlevel" element={<FirstLevel />} />
                    <Route path="2level" element={<SecondLevel />} />
                    <Route path="about" element={<About />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="changepassword" element={<ChangePassword />} />
                    <Route path="three" element={<ThirdLevel />} />
                </Routes>
                <div className="modal-button-container" >
                    <button className="modal-button" onClick={handleOpenModal}><span>{isModalLoggedIn ? 'LOGOUT' : 'LOGIN'}</span></button>
                </div>
                {/*Modal állapotainak meghatározása  */}
                <Modal isOpen={isModalOpen} onLogout={handleLogoutModal} isLoggedIn={isModalLoggedIn} onClose={handleCloseModal} />
                
            </div>
        </Router>
    );
}
export default App;
