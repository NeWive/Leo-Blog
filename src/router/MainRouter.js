import React from "react";
import Desc from "../component/main/Desc";
import {Switch, Route, useLocation} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import './MainRouter.scss';

export default function MainRouter(p) {
    let location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition
                timeout={500}
                key={location.key}
                classNames={'main-exchange'}>
                <Switch location={location}>
                    <Route path={'/main/desc'} render={() => (
                        <Desc user={p.user} comments={p.comments} commentHandler={p.commentHandler}/>
                    )}/>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}
