import React from "react";
import {Link} from 'react-router-dom';
import {logout} from "../api";
import {httpGet} from "../util";

function AppLink(props) {
    //TODO: 登陆后的状态
    let onClick = async () => {
        let d = await httpGet(logout);
        let cb = ((p, data) => {
            let props = p;
            let d = data;
            return () => {
                props.handleMessagePanel(true, d.msg, () => {
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 1000)
                });
            }
        })(props, d);
        props.logoutIntState(cb);
    };

    let changeHandler = () => {
        window.dispatchEvent(new Event('urlChange'));
    }

    return (
        <ul className={'app_right'}>
            {
                !props.status ? (
                    <>
                        <li className={'app_link'} onClick={() => {
                            changeHandler()
                        }}>
                            <Link to={'/sign/sign_up'}>注册</Link>
                        </li>
                        <li className={'app_link'} onClick={() => {
                            changeHandler()
                        }}>
                            <Link to={'/sign/sign_in'}>登陆</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className={'app_link'}>
                            <a href={'./'} onClick={(e) => {
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
