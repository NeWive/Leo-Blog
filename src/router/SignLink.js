import React from 'react';
import {Link} from 'react-router-dom';
import {SIGN_UP, SIGN_LINK_SELECTED, SIGN_IN} from "../config/constString";
import {handleState} from "../util";

export default class SignLink extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            flag: 0
        };
        this.hashChangeHandler = this.hashChangeHandler.bind(this);
    }

    clickHandler(flag) {
        handleState.call(this, {flag})
    }

    hashChangeHandler() {
        let flag = /sign_in/.test(window.location.href) ? 0 : 1;
        console.log('flag:' + flag);

        handleState.call(this, {flag});
    }

    componentDidMount() {
        let flag = /sign_in/.test(window.location.href) ? 0 : 1;
        this.clickHandler(flag);
        window.addEventListener('hashchange', this.hashChangeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.hashChangeHandler);
    }

    render() {
        return (
            <ul className="sign_link_box">
                <li
                    className={`${SIGN_IN} ${this.state.flag === 0 ? SIGN_LINK_SELECTED : ''}`}
                    onClick={() => {
                        this.clickHandler(0);
                    }}>
                    <Link to={`/sign/sign_in`}>
                        登陆
                    </Link>
                </li>
                <li
                    className={`${SIGN_UP} ${this.state.flag === 1 ? SIGN_LINK_SELECTED : ''}`}
                    onClick={() => {
                        this.clickHandler(1);
                    }}>
                    <Link to={`/sign/sign_up`}>
                        注册
                    </Link>
                </li>
            </ul>
        );
    }
}
