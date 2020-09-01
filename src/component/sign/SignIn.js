import React from 'react';
import SignInButton from "../elements/SignInButton";
import SignForm from './SignForm';
import {handleState} from "../../util";
import {captcha} from "../../api";
import './SignIn.scss';

export default class SignIn extends React.PureComponent {
    constructor(p) {
        super(p);
        this.state = {
            isLoading: false
        };
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        handleState.call(this, {captcha})
    }

    submitHandler() {
        if(!this.state.isLoading) {
            handleState.call(this, {isLoading: true})
        }
    }

    render() {
        return (
            <div className="sign_in">
                <SignForm/>
                <div className="submit">
                    <SignInButton isLoading={this.state.isLoading} callback={this.submitHandler}/>
                </div>
            </div>
        );
    }
}
