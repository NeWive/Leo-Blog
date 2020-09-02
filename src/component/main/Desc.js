import React from "react";
import {map, icon, index, infoIndex} from '../../config/mapToCN';
import FunctionButton from "./FunctionButton";
import SignInButton from "../elements/SignInButton";
import {userInfo, server} from "../../api";
import {httpGet} from "../../util";
import {CSSTransition} from "react-transition-group";
import './Desc.scss';

export default class Desc extends React.PureComponent {
    constructor(props) {
        super(props);
        this.editing = false;
        this.state = {
            stepOne: false,
            stepTwo: false,
            stepThree: false,
            isEditShown: false,
            isSubmitting: false,
            editing: false,
            isEntered: false,
            getInfo: false
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    clickHandler() {
        if (!this.editing) {
            this.editing = true;
            this.setState({
                stepOne: true
            })
        }
    }

    submitHandler() {
        this.setState({
            stepThree: false,
            stepOne: true
        })
    }

    componentDidMount() {
        this.setState({
            isEntered: true
        })
    }

    async getUserInfo() {
        let d;
        let f = ['avatar', 'email', 'name', 'quote', 'sex'];
        try {
            d = await httpGet(userInfo);
        } catch (e) {
            d = {code: '999', msg: e.message};
        }
        let r = {
            status: d.code === '000',
            msg: d.msg
        };
        if (r.status) {
            let o = {};
            for (let i of f) {
                if (i !== 'avatar') {
                    o[i] = d[i];
                }
            }
            o['avater'] = `${server}${d['avatar']}`;
            let descCb = ((context) => {
                let ctx = context;
                return () => {
                    ctx.setState({
                        getInfo: true
                    });
                }
            })(this);
            this.props.handleUser(o, descCb);
        }
    }

    render() {
        return (
            <>

                <FunctionButton toEdit={this.clickHandler} commentHandler={this.props.commentHandler}/>
                <CSSTransition
                    classNames={`card`}
                    timeout={500}
                    in={this.state.isEntered}
                    onEntered={this.getUserInfo}
                >
                    <CSSTransition classNames={'rotation-one'} timeout={300} in={this.state.stepOne} onEntered={() => {
                        this.setState({
                            stepTwo: true
                        })
                    }}>
                        <div className="desc" style={{
                            marginLeft: this.props.comments ? '-500px' : '0px',
                        }}>
                            <CSSTransition classNames={'info-opacity'} in={this.state.getInfo} timeout={500}>
                                <div className={'desc_temp'}>
                                    <div className="avater">
                                        <div className="top">
                                            <img src={this.props.user.avater} alt=""/>
                                        </div>
                                        <div className="links">
                                            {
                                                index.map((i) => {
                                                    return (
                                                        <a href={this.props.user[i]} key={i}>
                                                            <img src={icon[i]} alt={i}/>
                                                        </a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <CSSTransition
                                        classNames={'rotation-two'}
                                        timeout={1000}
                                        in={this.state.stepTwo}
                                        onEntered={() => {
                                            this.setState({
                                                stepOne: false,
                                                stepThree: true
                                            }, () => {
                                                this.setState({
                                                    isEditShown: true
                                                })
                                            });
                                        }}
                                        onExited={() => {
                                            this.editing = false;
                                            this.setState({
                                                stepOne: false,
                                                isEditShown: false,
                                            })
                                        }}>
                                        <div className="info">
                                            {
                                                infoIndex.map((i) => (
                                                    <div className="info_sel" key={i}>
                                                        {
                                                            i === 'quote' ? (
                                                                <>
                                                                    <p className={'info_label'}>
                                                                        {
                                                                            map[i]
                                                                        }
                                                                    </p>
                                                                    <p className={'info_content motto'}>
                                                                        {
                                                                            this.props.user[i]
                                                                        }
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <>
                                                        <span className={'info_label'}>
                                                            {
                                                                map[i]
                                                            }
                                                        </span>
                                                                    <span className={'info_content'}>
                                                            {
                                                                this.props.user[i]
                                                            }
                                                        </span>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </CSSTransition>
                                </div>
                            </CSSTransition>
                            <CSSTransition
                                classNames={'rotation-three'}
                                timeout={500}
                                mountOnEnter={true}
                                in={this.state.stepThree}
                                onExited={() => {
                                    this.setState({
                                        stepTwo: false
                                    })
                                }}>
                                <div className="info edit" style={{
                                    display: `${this.state.isEditShown ? 'inline-block' : 'none'}`
                                }}
                                >
                                    {
                                        infoIndex.map((i) => (
                                            <div className="info_sel" key={i}>
                                                {
                                                    i === 'quote' ? (
                                                        <>
                                                            <p className={'info_label'}>
                                                                {
                                                                    map[i]
                                                                }
                                                            </p>
                                                            <textarea/>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className={'info_label'}>
                                                                {
                                                                    map[i]
                                                                }
                                                            </span>
                                                            <input type="text"/>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                    <SignInButton callback={this.submitHandler} isLoading={this.state.isSubmitting}>
                                        Edit
                                    </SignInButton>
                                </div>
                            </CSSTransition>
                        </div>
                    </CSSTransition>
                </CSSTransition>
            </>
        )
    }
}
