import React from "react";
import './SignForm.scss';
import {handleState} from "../../util";
import {captcha} from "../../api";
import {signInList} from "../../config/signInput";

export default class SignForm extends React.PureComponent {
    constructor(p) {
        super(p);
        this.state = {
            captcha: '',
            isLoading: false
        };
        this.lastTime = null;
        this.gapTime = 1000;
        this.handleCaptcha = this.handleCaptcha.bind(this);
    }

    genRandomNumber() {
        return (Math.ceil(Math.random() * 1000)).toString();
    }

    componentDidMount() {
        handleState.call(this, {captcha: `${captcha}?t=${this.genRandomNumber()}`})
    }

    handleCaptcha(e) {
        e.preventDefault();
        let nowTime = +new Date();
        if(nowTime - this.lastTime > this.gapTime || !this.lastTime) {
            let rand = this.genRandomNumber();
            console.log(rand);
            handleState.call(this, {captcha: `${captcha}?t=${rand}`});
            this.lastTime = nowTime;
        }
    }

    render() {
        return (
            <>
                {
                    signInList.map((i) => (
                        <div className="sel" key={i.name}>
                            <div className={'label'}>
                                {
                                    i.alias
                                }
                            </div>
                            <div className="input">
                                <input type={i.type} ref={this.props.refList[i.name]}/>
                                {
                                    i.name === 'captcha' && <img src={this.state.captcha} alt="" onClick={this.handleCaptcha}/>
                                }
                            </div>
                        </div>
                    ))
                }
            </>
        );
    }
}
