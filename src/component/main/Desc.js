import React from "react";
import {map, icon, index, infoIndex} from '../../config/mapToCN';
import FunctionButton from "./FunctionButton";
import SignInButton from "../elements/SignInButton";
import Loading from "../elements/Loading";
import axios from 'axios';
import {userInfo, server, edit, upload} from "../../api";
import {httpGet, httpPost} from "../../util";
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
        this.name = React.createRef();
        this.sex = React.createRef();
        this.quote = React.createRef();
        this.email = React.createRef();
        this.refList = {
            name: this.name,
            sex: this.sex,
            quote: this.quote,
            email: this.email
        }
        this.target = {};
        this.f = ['name', 'sex', 'email', 'quote'];
        this.clickHandler = this.clickHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.uploadImg = this.uploadImg.bind(this);
        this.file = React.createRef();
    }

    async uploadImg(e) {
        let file = e.target.files[0];
        let formData = new  FormData();
        formData.append('img', file, file.name);
        let {data} = await axios({
            url: upload,
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        console.log(data);
        this.props.handleMessagePanel(true, data.msg);
        if(data.code === '000') {
            this.props.handleUser({
                avater: `${server}${data.path}`
            })
        }
    }

    onChangeHandler(e, type) {
        let t = e.target;
        this.target[type] = t.value;
    }

    clickHandler() {
        if (!this.editing) {
            this.editing = true;
            this.setState({
                stepOne: true
            });
        } else {
            this.editing = false;
            this.setState({
                stepThree: false,
                stepOne: true,
                isSubmitting: false
            });
        }
    }

    submitHandler() {
        for(let i of this.f) {
            if (!this.target.hasOwnProperty(i)) {
                this.target[i] = this.props.user[i];
            }
        }
        this.setState({
            isSubmitting: true
        }, async () => {
            setTimeout(async () => {
                let d, r;
                try {
                    d = await httpPost(edit, JSON.stringify(this.target));
                } catch (e) {
                    console.log(e);
                    d = {code: '999', msg: e.message};
                }
                console.log(d);
                r = {
                    status: d.code === '000',
                    msg: d.msg
                };
                this.props.handleMessagePanel(true, r.msg);
                if (r.status) {
                    await this.getUserInfo();
                    this.setState({
                        stepThree: false,
                        stepOne: true,
                        isSubmitting: false
                    });
                    this.target = {};
                } else {
                    this.setState({
                        isSubmitting: false
                    });
                }
            }, 1000)
        })
    }

    componentDidMount() {
        this.setState({
            isEntered: true
        });
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
                <input type='file' ref={this.file} style={{
                    display: 'none'
                }}  onChange={this.uploadImg}/>
                <CSSTransition
                    classNames={'function-panel'}
                    timeout={500}
                    in={this.state.isEntered}
                    mountOnEnter={true}>
                    <FunctionButton toEdit={this.clickHandler} commentHandler={this.props.commentHandler}/>
                </CSSTransition>
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
                            {
                                !this.state.getInfo && <Loading/>
                            }
                            <CSSTransition classNames={'info-opacity'} in={this.state.getInfo} timeout={500}>
                                <div className={'desc_temp'}>
                                    <div className="avater">
                                        <div className="top" onClick={() => {
                                            this.file.current.click();
                                        }}>
                                            <img src={this.props.user.avater} alt="修改头像"/>
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
                                                            <textarea ref={this.refList[i]} onChange={(e) => {
                                                                this.onChangeHandler(e, i);
                                                            }}/>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className={'info_label'}>
                                                                {
                                                                    map[i]
                                                                }
                                                            </span>
                                                            <input type="text" ref={this.refList[i]} onChange={(e) => {
                                                                this.onChangeHandler(e, i);
                                                            }}/>
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
