import React from 'react';
import SignInButton from "../elements/SignInButton";
import SignForm from './SignForm';
import {handleState, httpPost} from "../../util";
import './SignIn.scss';
import {signInList} from "../../config/signInput";
import {login, server} from "../../api";

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

    async submitHandler() {
        let obj = {};
        for(let i of signInList) {
            obj[i.name] = this.refList[i.name].current.value;
        }
        if(!this.state.isLoading) {
            let d, r;
            try {
                handleState.call(this, {isLoading: true});
                d = await httpPost(login, JSON.stringify(obj));
            } catch (e) {
                console.log(e);
                d = {code: '999', msg: e.message};
            }
            r = {
                status: d.code === '000',
                msg: d.msg
            };
            // handleUser
            // avatar
            // username
            // auth: true

            let after = ((r, context, d) => {
                let result = r;
                let ctx = context;
                let data = d;
                return () => {
                    if (result.status) {
                        this.props.handleUser({
                            username: data.username,
                            userAvatar: `${server}${data.avatar}`,
                            auth: data.is_super
                        });
                        this.props.handleRedirect()
                        setTimeout(() => {
                            ctx.props.redirect('/main');
                        }, 1500);
                    }
                    window.dispatchEvent(new Event('changeCaptcha'));
                    setTimeout(() => {
                        ctx.setState({
                            isLoading: false
                        });
                    }, 1000);
                }
            })(r, this, d);
            this.props.handleMessagePanel(true, r.msg, after);
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
