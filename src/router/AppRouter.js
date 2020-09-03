import React from 'react';
import Sign from '../component/sign';
import Main from '../component/main';
import CheckSignStatus from "../component/CheckSignStatus";
import {Switch, Route, useLocation} from 'react-router-dom';
import './AppRouter.scss';

export default function AppRoute(props) {
    let location = useLocation();
    return (
        <Switch location={location}>
            <Route exact path={'/'} render={(p) => (
                <CheckSignStatus
                    isSignIn={props.isSignIn}
                    handleUser={props.handleUser}
                    handleLogoutRedirect={props.handleLogoutRedirect}
                    handler={props.handler}
                    redirect={p.history.push}/>
            )}/>
            <Route path={'/main'} render={(p) => (
                <Main
                    user={props.user}
                    handleMessagePanel={props.handleMessagePanel}
                    handleUser={props.handleUser}
                    menu={props.menu}
                    handleMenu={props.handleMenu}
                    redirect={p.history.push}/>
            )}/>
            <Route path={'/sign'} render={(p) => (
                <Sign
                    handleMessagePanel={props.handleMessagePanel}
                    handleUser={props.handleUser}/>
            )}/>
        </Switch>
    );
}
