import React from "react";
import SignUp from '../component/sign/SignUp';
import SignIn from '../component/sign/SignIn';
import {Route, Switch, Redirect, useLocation} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './SignRouter.scss';

export default function SignRouter(props) {
    let location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition
                timeout={500}
                key={location.key}
                classNames='exchange'
                >
                <Switch location={location}>
                    <Route exact path={'/sign'}>
                        <Redirect to={'/sign/sign_in'}/>
                    </Route>
                    <Route path={'/sign/sign_in'} render={(p) => (
                        <SignIn handleMessagePanel={props.handleMessagePanel} redirect={p.history.push} handleUser={props.handleUser} handleRedirect={props.handleRedirect}/>
                    )}/>
                    <Route path={'/sign/sign_up'} render={(p) => (
                        <SignUp handleMessagePanel={props.handleMessagePanel}  redirect={p.history.push}/>
                    )}/>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}
