import React from 'react';
import SignForm from './SignForm';
import SignUpButton from "../elements/SignUpButton";
import './SignUp.scss';
import {handleState} from "../../util";

export default class SignIn extends React.PureComponent {
    constructor(p) {
        super(p);
        this.state = {
            isLoading: false
        };
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler() {
        if(!this.state.isLoading) {
            handleState.call(this, {isLoading: true})
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(errorInfo);
    }

    render() {
        return (
            <div className="sign_up">
                <SignForm/>
                <div className="submit">
                    <SignUpButton isLoading={this.state.isLoading} callback={this.submitHandler}/>
                </div>
            </div>
        );
    }
}
