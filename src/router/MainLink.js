import React from "react";
import {CSSTransition} from "react-transition-group";
import {Link} from 'react-router-dom';
import {handleState} from "../util";
import './MainLink.scss';

export default class MainLink extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    render() {
        return (
            <ul className="main_link_box">
                <CSSTransition classNames={'main-link'} timeout={300} in={this.props.on} mountOnEnter={true}>
                    <li className={`main_link`} onClick={() => {
                        handleState.call(this, {selected: true})
                    }}>
                        <div className={`temp ${this.state.selected ? 'selected' : ''}`}>
                            <Link to={'/main/desc'}>
                                个人资料
                            </Link>
                        </div>
                    </li>
                </CSSTransition>
            </ul>
        );
    }
}
