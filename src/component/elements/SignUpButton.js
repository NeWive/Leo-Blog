import React from "react";
import arrow from '../../assets/right-arrow.png';
import './SignUpButton.scss';

export default function SignUpButton(p) {
    return (
        <div className="sign_up_button_box">
            <div className={`sign_up_button_container ${p.isLoading ? 'loading' : ''}`} onClick={() => {
                p.callback();
            }}>
                <div className="img">
                    <img src={arrow} alt=""/>
                </div>
                <button className={'sign_up_button'}>
                    Sign Up
                </button>
            </div>
        </div>
    )
}
