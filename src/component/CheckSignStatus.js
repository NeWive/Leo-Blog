import React from 'react';
import {checkHttpStatus, handleState, httpGet} from "../util";
import {status} from "../api";

export default class CheckSignStatus extends React.Component {
    async componentDidMount() {
        let d = await httpGet(status);
        console.log(d.msg);
        let r = checkHttpStatus(d);
        console.log(r);
        console.log('isSignIn: ' + this.props.isSignIn);
        this.props.handler(d.status, () => {
            console.log('isSignIn: ' + this.props.isSignIn);
            this.props.redirect(this.props.isSignedUp ? '/main' : '/sign');
        });
        // if (r.status) {
        //     this.props.handler(d.status, () => {
        //         console.log('isSignIn: ' + this.props.isSignIn);
        //         this.props.redirect(this.props.isSignedUp ? '/main' : '/sign');
        //     });
        // } else {
        //
        // }
    }

    render() {
        return (
            <>

            </>
        );
    }
}
