import React from "react";
import MainLink from "../../router/MainLink";
import {CSSTransition} from "react-transition-group";
import './LeftList.scss';

export default class LeftList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isSelIn: false
        }
    }

    render() {
        return (
            <CSSTransition classNames={'left-list'}
                           timeout={300}
                           in={this.props.on}
                           mountOnEnter={true}
                           onEntered={() => {
                               this.setState({
                                   isSelIn: true
                               })
                           }}
                           onExit={() => {
                               this.setState({
                                   isSelIn: false
                               })
                           }}>
                <div className="left_list">
                    <div className="user_info">
                        <div className="avatar">
                            <img src={this.props.user.avater} alt=""/>
                        </div>
                        <div className="username">
                            {
                                this.props.user.username
                            }
                        </div>
                    </div>
                    <MainLink on={this.state.isSelIn}/>
                </div>
            </CSSTransition>
        );
    }
}
