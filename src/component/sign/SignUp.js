import React from 'react';
import SignForm from './SignForm';
import SignUpButton from "../elements/SignUpButton";
import './SignUp.scss';
import {signInList} from "../../config/signInput";
import {handleState, httpPost} from "../../util";
import {register} from "../../api";

export default class SignUp extends React.PureComponent {
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

    async submitHandler() {
        let obj = {};
        for(let i of signInList) {
            obj[i.name] = this.refList[i.name].current.value;
        }
        if(!this.state.isLoading) {
            let d, r;
            try {
                handleState.call(this, {isLoading: true})
                d = await httpPost(register, JSON.stringify(obj));
            } catch (e) {
                console.log(e);
                d = {code: '999', msg: e.message()};
            }
            r = {
                status: d.code === '000',
                msg: d.msg
            }
            let callback = ((r, context) => {
                let result = r;
                let ctx = context;
                return () => {
                    if (result.status) {
                        setTimeout(() => {
                            ctx.props.redirect('/sign/sign_in');
                            window.dispatchEvent(new Event('urlChange'));
                        }, 1200);
                    }
                    window.dispatchEvent(new Event('changeCaptcha'));
                    setTimeout(() => {
                        ctx.setState({
                            isLoading: false
                        });
                    }, 1000);
                }
            })(r, this);
            this.props.handleMessagePanel(true, r.msg, callback);
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(errorInfo);
    }

    render() {
        return (
            <div className="sign_up">
                <SignForm refList={this.refList}/>
                <div className="submit">
                    <SignUpButton isLoading={this.state.isLoading} callback={this.submitHandler}>
                        Sign Up
                    </SignUpButton>
                </div>
            </div>
        );
    }
}
