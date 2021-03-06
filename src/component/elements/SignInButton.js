import React from 'react';
import './SignInButton.scss';

export default function SignInButton(p) {
    return (
        <div className="sign_in_button_box">
            <button className={`sign_in_button ${p.isLoading ? 'loading' : ''}`} onClick={(e) => {
                e.preventDefault();
                p.callback();
            }}>
                {
                    p.children
                }
            </button>
        </div>
    )
}
