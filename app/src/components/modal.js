import React, { useState } from 'react';
import { loginUser } from './utils.js';
import { logoutUser } from './utils.js';
const Modal = ({ isOpen, onClose, isLoggedIn, onLogout }) => {

    //Állapotok deklarálása
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const name = localStorage.getItem('username');
    
    //Állapotkezelővel történő felhasználó név tárolása
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    //Állapotkezelővel történő jelszó tárolás
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    //Felhasználó bejelentkezése, adatbázison keresztül
    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            username: username,
            password: password
        }
        loginUser(credentials, username);
    };
    //Felhasználó kijelentkezése adatbázisból
    const handleLogout = async (e) => {
        e.preventDefault();   
        logoutUser();
    };

    //A jelszó csere oldalra való átirányítás
    const handleChangePasword = async (e) => {
        e.preventDefault();
        window.location.href = "/changepassword";
    }

    //Ha a felhasználó be van jelentkezve. 
    if (isLoggedIn) { 
        
        //Logout modal UI
        return (
            <>
                {isOpen && (
                    <div className="modal">
                        <div className="modal delayed">
                            <button className="modal-button-style-small-left" onClick={onClose}>Close</button>
                            <div className="modal-content">
                                <h2>LOGOUT</h2>
                                {/*Modal errornak itt volt a helye,<form onClose = {handleLogout}>  */}
                                <form>
                                    <label>
                                        LOGGED IN AS: <span>{name}</span>
                                    </label>
                                    <button className="modal-button-style-small" onClick={handleLogout}>Logout</button>
                                   
                                </form>
                                <button className="modal-button-style-small-chgpswd" onClick={handleChangePasword}>CHANGE PASSWORD</button>
                                
                            </div>
                        </div>

                    </div>
                )}
            </>
        );
    }

    return (
        //Login modal UI
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal delayed">
                        <button className="modal-button-style-small-left" onClick={onClose}>CLOSE</button>
                        <div className="modal-content">
                            <h2>LOGIN</h2>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    USERNAME
                                    <input type="text" className= "modal-login-input" value={username} onChange={handleUsernameChange} />
                                </label>
                                <label>
                                    PASSWORD
                                    <input type="password" className="modal-login-input" value={password} onChange={handlePasswordChange} />
                                </label>                          
                                <button className="modal-button-style-small" type="submit">Login</button>
                            </form> 
                            
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default Modal;