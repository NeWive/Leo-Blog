import React from "react";
import {Link} from 'react-router-dom';

function AppLink(props) {
    //TODO: 登陆后的状态
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

                        <li>

                        </li>
                    </>
                )
            }
        </ul>
    );
}

export default AppLink;
