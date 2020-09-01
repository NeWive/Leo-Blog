import React from 'react';
import {checkHttpStatus, handleState, httpGet} from "../util";
import {status} from "../api";

export default class CheckSignStatus extends React.Component {
    async componentDidMount() {
        let d = await httpGet(status);
        console.log(d.message);
        let r = checkHttpStatus(d);
        console.log(r);
        if (r.status) {
            this.props.handler(d.status, () => {
                console.log(this.props.isSignedUp);
                this.props.redirect(this.props.isSignedUp ? '/main' : '/sign');
            });
        } else {

        }
    }

    render() {
        return (
            <>

            </>
        );
    }
}
