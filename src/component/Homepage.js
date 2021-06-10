import React from 'react';
import GoogleLogin from "react-google-login";
import {useSelector, useDispatch} from 'react-redux';
import {selectSignedIn} from "../features/userSlice";
import '../styling/home.css'
import{
    setSignedIn,
    setUserData
} from "../features/userSlice";

export const Homepage = () => {

    const dispatch = useDispatch();
    const login = (response) => {
        console.log(response)
        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj));
    };

    const isSignedIn = useSelector(selectSignedIn);

    return (
        <div className="home__page" style={{display : isSignedIn ? "none" : ""}}>
            {!isSignedIn ? (
                <div className="login__message">
                <h2>📚</h2>
                <h1>A readers favourite place</h1>
                <p>
                    We provide high quality online resources.
                </p>
                <GoogleLogin 
                clientId = "771658392132-trlcigfi1s5sbkms9ejrfe4tpgibm5cr.apps.googleusercontent.com"
                render = {(renderProps) => (
                    <button
                        onClick = {renderProps.onClick}
                        disabled = {renderProps.disabled}
                        className="login__button"
                    >
                        Login with Google
                    </button>
                )}
                onSuccess={login}
                onFailure={login}
                isSignedIn={true}
                cookiPolicy={"single__host__origin"}
                />
            </div>
                ) : (
                    ""
                )}
        </div>
    );
};

export default Homepage;
