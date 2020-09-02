import React from "react";
import RightContent from "./RightContent";
import './index.scss';

export default class Main extends React.PureComponent {
    render() {
        return (
            <div id={'Main'}>
                <RightContent
                    user={this.props.user}
                    handleUser={this.props.handleUser}/>
            </div>
        )
    }
}
