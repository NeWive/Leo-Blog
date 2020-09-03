import React from 'react';
import AppLink from "./router/AppLink";
import AppRoute from './router/AppRouter';
import Menu from './assets/menu.png';
import {BrowserRouter} from 'react-router-dom';
import {handleCanvas} from "./util";
import './App.scss'
import LeftList from "./component/main/LeftList";
import {CSSTransition} from "react-transition-group";

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
                auth: '',
                username: '',
                avater: '',
                name:'',
                sex: '',
                email: '',
                quote: '',
                apple: '',
                github: '',
                twitter: '',
                youtube: '',
                userAvatar: ''
            },
            isMenuOn: false
        };
        this.canvas = React.createRef();
        this.logoutRedirect = () => {};
        this.handleLogoutRedirect = this.handleLogoutRedirect.bind(this);
        this.handleIsSignIn = this.handleIsSignIn.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleMessagePanel = this.handleMessagePanel.bind(this);
        this.handleUserInfo = this.handleUserInfo.bind(this);
        this.logoutIntState = this.logoutIntState.bind(this);
    }

    logoutIntState(cb) {
        this.setState({
            userInfo: {
                auth: '',
                username: '',
                avater: '',
                name:'',
                sex: '',
                email: '',
                quote: '',
                apple: '',
                github: '',
                twitter: '',
                youtube: '',
                userAvatar: '',
            },
            isMenuOn: false,
            isSignIn: false,
        }, cb);
        window.changeEvent = new Event('urlChange');
    }

    handleLogoutRedirect (cb) {
        this.logoeutRedirect = cb;
    }

    handleUserInfo(o, userCallback) {
        this.setState((pre) =>{
            let preState = {};
            for(let i in pre.userInfo) {
                preState[i] = pre.userInfo[i];
            }
            for(let i in o) {
                preState[i] = o[i];
            }
            return {
                userInfo: preState,
                isSignIn: true
            }
        }, () => {
            userCallback && userCallback();
        });
    }

    handleMessagePanel(toggle, msg, messageCallback) {
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
            messageCallback && messageCallback();
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
                            <AppLink status={this.state.isSignIn}
                                     handleMessagePanel={this.handleMessagePanel}
                                     logoutRedirect={this.logoutRedirect}
                                     logoutIntState={this.logoutIntState}/>
                        </div>
                    </div>
                    <div className="body">
                        <div className="canvas">
                            <canvas ref={this.canvas}/>
                        </div>
                        <div className="content">
                            <AppRoute isSignIn={this.state.isSignIn}
                                      handleLogoutRedirect={this.handleLogoutRedirect}
                                      handler={this.handleIsSignIn}
                                      user={this.state.userInfo}
                                      handleMessagePanel={this.handleMessagePanel}
                                      handleUser={this.handleUserInfo}
                                      menu={this.state.isMenuOn}
                                      handleMenu={this.handleMenu}/>
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
