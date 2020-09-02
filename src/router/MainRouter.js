import React from "react";
import Desc from "../component/main/Desc";
import {Switch, Route, useLocation} from 'react-router-dom';
import './MainRouter.scss';

export default function MainRouter(p) {
    let location = useLocation();
    return (
        <Switch location={location}>
            <Route path={'/main/desc'} render={() => (
                <Desc
                    user={p.user}
                    comments={p.comments}
                    commentHandler={p.commentHandler}
                    handleUser={p.handleUser}
                    handleMessagePanel={p.handleMessagePanel}
                    menu={p.menu}
                    handleMenu={p.handleMenu}/>
            )}/>
        </Switch>
    )
}
