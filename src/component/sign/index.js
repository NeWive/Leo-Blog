import React from "react";
import SignLink from "../../router/SignLink";
import SignRouter from "../../router/SignRouter";
import {CSSTransition} from "react-transition-group";
import './index.scss';

export default class Sign extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false
        }
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect () {
        this.setState({
            isRedirect: true
        })
    }

    render() {
        return (
            <CSSTransition classNames={'redirect'} in={this.state.isRedirect} timeout={500}>
                <div id="Sign">
                    <SignLink/>
                    <div className="sign_router">
                        <SignRouter
                            handleMessagePanel={this.props.handleMessagePanel}
                            handleUser={this.props.handleUser}
                            handleRedirect={this.handleRedirect}/>
                    </div>
                </div>
            </CSSTransition>
        );
    }
}
