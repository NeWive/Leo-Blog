import React from "react";
import RightContent from "./RightContent";
import {httpGet} from "../../util";
import {server, status} from "../../api";
import {Redirect} from 'react-router-dom';
import './index.scss';

export default class Main extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            willRedirect: 2
        }
    }

    async componentDidMount() {
        let d = await httpGet(status);
        if(d.code === '000') {
            this.setState({
                willRedirect: d.status ? 0 : 1
            })
        }
    }

    render() {
        switch (this.state.willRedirect) {
            case 0: {
                return (
                    <div id={'Main'}>
                        <RightContent
                            user={this.props.user}
                            handleUser={this.props.handleUser}
                            handleMessagePanel={this.props.handleMessagePanel}
                            menu={this.props.menu}
                            handleMenu={this.props.handleMenu}
                        />
                    </div>
                );
            }
            case 1: {
                return (
                    <Redirect to={'/sign'}/>
                )
            }
            case 2: {
                return (
                    <></>
                )
            }
        }
    }
}
