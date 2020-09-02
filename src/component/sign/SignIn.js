import React from 'react';
import SignInButton from "../elements/SignInButton";
import SignForm from './SignForm';
import axios from 'axios';
import {handleState} from "../../util";
import './SignIn.scss';

export default class SignIn extends React.PureComponent {
    constructor(p) {
        super(p);
        this.state = {
            isLoading: false
        };
        this.username = React.createRef();
        this.password = React.createRef();
        this.captcha = React.createRef();
        this.refList = {
            username: this.username,
            password: this.password,
            captcha: this.captcha
        };
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {

    }

    submitHandler() {
        if(!this.state.isLoading) {
            handleState.call(this, {isLoading: true})
        }
    }

    render() {
        return (
            <div className="sign_in">
                <SignForm refList={this.refList}/>
                <div className="submit">
                    <SignInButton isLoading={this.state.isLoading} callback={this.submitHandler}>
                        Sign In
                    </SignInButton>
                </div>
            </div>
        );
    }
}
