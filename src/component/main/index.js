import React from "react";
import LeftList from "./LeftList";
import RightContent from "./RightContent";
import './index.scss';

export default class Main extends React.PureComponent {
    render() {
        return (
            <div id={'Main'}>
                <LeftList user={this.props.user}/>
                <RightContent/>
            </div>
        )
    }
}
