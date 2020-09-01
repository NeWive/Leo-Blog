import React from 'react';
import AppLink from "./router/AppLink";
import AppRoute from './router/AppRouter';
import avater from './assets/avatar_test.jpg';
import Menu from './assets/menu.png';
import {BrowserRouter} from 'react-router-dom';
import {handleCanvas} from "./util";
import './App.scss'

class App extends React.PureComponent {
    constructor(p) {
        super(p);
        this.isCanvasOn = false;
        this.state = {
            isSignIn: false,
            isMessagePanelOn: false,
            messagePanelType: 0, // 0 green 1 red
            message: 'yingyingying',
            userInfo: {
                auth: 'author',
                username: 'KaguraNana',
                avater: avater
            }
        };
        this.canvas = React.createRef();
        this.handleIsSignIn = this.handleIsSignIn.bind(this);
    }

    handleIsSignIn (v,cb) {
        this.setState({
            isSignedIn: v
        }, () => {
            cb();
        });
    }

    componentDidMount() {
        if(!this.isCanvasOn) {
            handleCanvas(this.canvas.current);
            this.isCanvasOn = true;
        }
    }
    render() {
        return (
            <BrowserRouter>
                <div id="app">
                    <div className="header">
                        <div className="left">
                            {
                                this.state.isSignIn && (
                                    <div className="menu">
                                        <img src={Menu} alt=""/>
                                    </div>
                                )
                            }
                            <a href="/">
                                Leo's Blog
                            </a>
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
                            <AppRoute isSignedIn={this.state.isSignedIn} handler={this.handleIsSignIn} user={this.state.userInfo}/>
                        </div>
                        {/*<div className={`message_panel ${this.state.messagePanelType > 0 ? 'red' : 'green'}`}>*/}
                        {/*    {*/}
                        {/*        this.state.message*/}
                        {/*    }*/}
                        {/*</div>*/}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
