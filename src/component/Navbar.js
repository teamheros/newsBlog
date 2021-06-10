import React from 'react'
import {Avatar} from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';
import {selectSignedIn, selectUserData, setUserData,setSignedIn, setInput} from "../features/userSlice";
import "../styling/navbar.css";
import {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';

const Navbar = () => {
    const [inputValue, setInputValue] = useState("tech")
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData)

    const dispatch = useDispatch();

    const logout = (Rresponse) =>{
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue))
    };

    return (
        <div className="navbar">
            <h1 className="navbar__header">News Blog Mania 💬</h1>
            {isSignedIn && (
                 <div className="blog__search">
                     <input 
                     className="search" 
                     placeholder=" search for  blog" 
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     />
                     <button className="submit" onClick={handleClick}>
                        Search
                    </button>
                     </div>
                    )}

                    {isSignedIn ? (
                        <div className="navbar__user__data">
                        <Avatar className="user" src={userData?.imageUrl} alt={userData?.name} />
                        <h1 className="signedIn">{userData?.givenName}</h1>
                        <GoogleLogout clientId = "771658392132-trlcigfi1s5sbkms9ejrfe4tpgibm5cr.apps.googleusercontent.com" 
                        render = {(renderProps) => (
                            <button
                                onClick = {renderProps.onClick}
                                disabled = {renderProps.disabled}
                                className="logout__button"
                            >
                                Logout 💔
                            </button>
                        )}
                        onLogoutSuccess={logout}
                        />
                        </div>

                    ) : (
                        <h1 className="notSignedIn">User not available</h1>
                    )}
        </div>
    )
}

export default Navbar
