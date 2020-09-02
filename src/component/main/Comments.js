import React from "react";
import SignInButton from "../elements/SignInButton";
import { v4 as uuidv4 } from 'uuid';
import {CSSTransition} from "react-transition-group";
import {httpGet, httpPost} from "../../util";
import {commentsList, server, postComment} from "../../api";
import './Comments.scss';

export default class Comments extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            getInfo: false,
            isLoading: false
        }
        this.comment = React.createRef();
        this.fetchComments =  this.fetchComments.bind(this);
        this.postComments = this.postComments.bind(this);
    }

    async postComments () {
        this.setState({
            isLoading: true
        }, async () => {
            let d, r;
            try {
                d = await httpPost(postComment, JSON.stringify({
                    content: this.comment.current.value
                }))
            } catch (e) {
                console.log(e.message);
                d = {code: '999', msg: e.message};
            }
            console.log(d);
            r = {
                status: d.code === '000',
                msg: d.msg
            };
            if(r.status) {
                this.comment.current.value = '';
                this.fetchComments();
                this.props.handleMessagePanel(true, r.msg);
            } else {
                this.props.handleMessagePanel(true, r.msg);
            }
        })
    }

    async fetchComments() {
        let d, r;
        try {
            d = await httpGet(commentsList);
        } catch (e) {
            d = {code: '999', msg: e.message};
        }
        r = {
            status: d.code === '000',
            msg: d.msg
        };
        if(r.status) {
            let comments = d.comments.map((i) => {
                i.avatar = `${server}${i.avatar}`;
                return i;
            }).reverse();
            this.setState({
                comments: comments,
            }, () => {
                this.setState({
                    getInfo: true
                })
            })
        }
    }

    componentDidMount() {
        this.fetchComments();
    }

    render() {
        return (
            <CSSTransition classNames={'comments-panel'} timeout={200} in={this.props.comments}>
                <div className="comment">
                    <div className="leave_comment">
                        <div className="title">
                            留言
                        </div>
                        <div className="textarea">
                            <textarea ref={this.comment}/>
                        </div>
                        <div className="post">
                            <SignInButton isLoading={false} callback={this.postComments}>
                                Post
                            </SignInButton>
                        </div>
                    </div>
                    <div className="comment_box">
                        <CSSTransition
                            classNames={'comment-animation'}
                            in={this.state.getInfo}
                            timeout={500}
                        >
                            <ul>
                                {
                                    this.state.comments.map((i) => (
                                        <li className={'comment_sel'} key={uuidv4()}>
                                            <div className="comment_info">
                                                <div className="comment_avatar">
                                                    <img src={i.avatar} alt={i.username}/>
                                                </div>
                                                <div className="comment_info_detail">
                                                    <div className="username">
                                                        {
                                                            i.username
                                                        }
                                                    </div>
                                                    <div className="time">
                                                        {
                                                            i.time
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="comment_content">
                                                {
                                                    i.content
                                                }
                                            </p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </CSSTransition>
                    </div>
                </div>
            </CSSTransition>
        )
    }
}
