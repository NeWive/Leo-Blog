import React from "react";
import SignLink from "../../router/SignLink";
import SignRouter from "../../router/SignRouter";
import './index.scss';

export default class Sign extends React.PureComponent {
    render() {
        return (
            <div id="Sign">
                <SignLink/>
                <div className="sign_router">
                    <SignRouter handleMessagePanel={this.props.handleMessagePanel}/>
                </div>
            </div>
        );
    }
}
