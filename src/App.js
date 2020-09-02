import React from 'react';
import AppLink from "./router/AppLink";
import AppRoute from './router/AppRouter';
import avater from './assets/avatar_test.jpg';
import Menu from './assets/menu.png';
import {BrowserRouter} from 'react-router-dom';
import {handleCanvas} from "./util";
import './App.scss'
import LeftList from "./component/main/LeftList";
import {CSSTransition} from "react-transition-group";
import {handleState} from "./util";

class App extends React.PureComponent {
    constructor(p) {
        super(p);
        this.isCanvasOn = false;
        this.timer = null;
        this.state = {
            isSignIn: false,
            isMessagePanelOn: false,
            message: '',
            userInfo: {
                auth: 'author',
                username: '刘狗蛋',
                avater: avater,
                sex: '男',
                email: '738767136@qq.com',
                motto: '嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤嘤',
                apple: 'https://www.bilibili.com',
                github: 'https://www.github.com',
                twitter: 'https://www.twitter.com',
                youtube: 'https://www.youtube.com'
            },
            isMenuOn: false
        };
        this.canvas = React.createRef();
        this.handleIsSignIn = this.handleIsSignIn.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleMessagePanel = this.handleMessagePanel.bind(this);
    }

    handleMessagePanel(toggle, msg, cb) {
        console.log('handling');
        console.log(msg);
        clearTimeout(this.timer);
        this.setState({
            isMessagePanelOn: toggle,
            message: msg
        }, () => {
            this.timer = setTimeout(() => {
                this.setState({
                    isMessagePanelOn: false,
                })
            }, 1000);
            cb();
        });
    }

    handleMenu() {
        this.setState((pre) => {
            let isMenuOn = !pre.isMenuOn;
            return {
                isMenuOn
            };
        });
    }

    handleIsSignIn(v, cb) {
        this.setState({
            isSignIn: v
        }, () => {
            cb();
        });
    }

    componentDidMount() {
        if (!this.isCanvasOn) {
            handleCanvas(this.canvas.current);
            this.isCanvasOn = true;
        }
    }

    render() {
        return (
            <BrowserRouter>
                <LeftList user={this.state.userInfo} on={this.state.isMenuOn}/>
                <div id="app">
                    <div className="header">
                        <div className="left">
                            <CSSTransition classNames={'menu-button'} timeout={300} in={this.state.isSignIn} mountOnEnter={true}>
                                <div className="menu" onClick={this.handleMenu} style={{
                                    display: `${this.state.isSignIn ? 'flex' : 'none'}`
                                }}>
                                    <img src={Menu} alt=""/>
                                </div>
                            </CSSTransition>
                            <CSSTransition classNames={'logo'} timeout={300} in={this.state.isSignIn}>
                                <a href="/" onClick={(e) => {

                                }}>
                                    Leo's Blog
                                </a>
                            </CSSTransition>
                        </div>
                        <div className="right">
                            <AppLink status={this.state.isSignIn}/>
                        </div>
                    </div>
                    <div className="body">
                        <div className="canvas">
                            <canvas ref={this.canvas}/>
                        </div>
                        <div className="content">
                            <AppRoute isSignIn={this.state.isSignIn}
                                      handler={this.handleIsSignIn}
                                      user={this.state.userInfo}
                                      handleMessagePanel={this.handleMessagePanel}/>
                        </div>
                        <CSSTransition in={this.state.isMessagePanelOn} classNames={'message-panel'} timeout={500} mountOnEnter={true} unmountOnExit={true}>
                            <div className={`message_panel`}>
                                {
                                    this.state.message
                                }
                            </div>
                        </CSSTransition>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
