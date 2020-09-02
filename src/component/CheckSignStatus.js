import React from 'react';
import {httpGet} from "../util";
import {server, status} from "../api";

export default class CheckSignStatus extends React.Component {
    async componentDidMount() {
        let d = await httpGet(status);
        // let r = checkHttpStatus(d);
        //
        if(d.code === '000') {
            if(d.status) {
                this.props.handleUser({
                    username: d.username,
                    userAvatar: `${server}${d.avatar}`,
                    auth: d.is_super
                });
            }
            this.props.handler(d.status, () => {
                this.props.redirect(this.props.isSignUp ? '/main' : '/sign');
            });
        }
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
