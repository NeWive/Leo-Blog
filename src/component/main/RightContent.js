import React from "react";
import MainRouter from "../../router/MainRouter";
import Comments from "./Comments";
import './RightContent.scss';

export default class RightContent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isCommentOn: false
        }
        this.handleCommentPanel = this.handleCommentPanel.bind(this);
    }

    handleCommentPanel (v) {
        this.setState((p) => {
            return {
                isCommentOn: !p.isCommentOn
            }
        })
    }

    render() {
        return (
            <div className="right_content">
                <MainRouter
                    user={this.props.user}
                    comments={this.state.isCommentOn}
                    commentHandler={this.handleCommentPanel}
                    handleUser={this.props.handleUser}
                    handleMessagePanel={this.props.handleMessagePanel}/>
                <Comments comments={this.state.isCommentOn} handleMessagePanel={this.props.handleMessagePanel}/>
            </div>
        )
    }
}
