import React from "react";
import SignInButton from "../elements/SignInButton";
import avatar from '../../assets/avatar_test.jpg';
import { v4 as uuidv4 } from 'uuid';
import {CSSTransition} from "react-transition-group";
import './Comments.scss';

export default class Comments extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            comments: [{
                time: '2020-09-02 00:28:04',
                avater: avatar,
                username: 'leo',
                content: '嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤'
            }, {
                time: '2020-09-02 00:28:04',
                avater: avatar,
                username: 'leo',
                content: '嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤'
            }, {
                time: '2020-09-02 00:28:04',
                avater: avatar,
                username: 'leo',
                content: '嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤'
            },{
                time: '2020-09-02 00:28:04',
                avater: avatar,
                username: 'leo',
                content: '嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤'
            },{
                time: '2020-09-02 00:28:04',
                avater: avatar,
                username: 'leo',
                content: '嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤'
            }]
        }
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
                            <textarea />
                        </div>
                        <div className="post">
                            <SignInButton isLoading={false} callback={() => {}}>
                                Post
                            </SignInButton>
                        </div>
                    </div>
                    <div className="comment_box">
                        <ul>
                            {
                                this.state.comments.map((i) => (
                                    <li className={'comment_sel'} key={uuidv4()}>
                                        <div className="comment_info">
                                            <div className="comment_avatar">
                                                <img src={i.avater} alt={i.username}/>
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
                    </div>
                </div>
            </CSSTransition>
        )
    }
}
