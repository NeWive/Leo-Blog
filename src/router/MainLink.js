import React from "react";
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
                <li className={`main_link ${this.state.selected ? 'selected' : ''}`} onClick={() => {
                    handleState.call(this, {selected: true})
                }}>
                    <Link to={'/main/desc'}>
                        个人资料
                    </Link>
                </li>
            </ul>
        );
    }
}
