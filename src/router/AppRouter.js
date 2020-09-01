import React from 'react';
import Sign from '../component/sign';
import Main from '../component/main';
import CheckSignStatus from "../component/CheckSignStatus";
import {Switch, Route} from 'react-router-dom';

export default function AppRoute(props) {
    return (
        <Switch>
            <Route exact path={'/'} render={(p) => (
                <CheckSignStatus
                    isSignedUp={p.isSignedIn}
                    handler={props.handler}
                    redirect={p.history.push}/>
            )}/>
            <Route path={'/main'} render={() => (
                <Main user={props.user}/>
            )}/>
            <Route path={'/sign'} component={Sign}/>
        </Switch>
    );
}
