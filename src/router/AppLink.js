import React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {logout} from "../api";
import {httpGet} from "../util";

function AppLink(props) {
    //TODO: 登陆后的状态
    let onClick = async () => {
        let d = await httpGet(logout);
        props.handleMessagePanel(true, d.msg, () => {
            setTimeout(() => {
                window.location.href = '/sign/sign_in';
            }, 1000)
        })
    };

    return (
        <ul className={'app_right'}>
            {
                !props.status ? (
                    <>
                        <li className={'app_link'}>
                            <Link to={'/sign/sign_up'}>注册</Link>
                        </li>
                        <li className={'app_link'}>
                            <Link to={'/sign/sign_in'}>登陆</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className={'app_link'}>
                            <a href={''} onClick={(e) => {
                                e.preventDefault();
                                onClick();
                            }}>
                                注销
                            </a>
                        </li>
                    </>
                )
            }
        </ul>
    );
}

export default AppLink;
