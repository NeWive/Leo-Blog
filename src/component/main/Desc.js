import React from "react";
import {map, icon, index, infoIndex} from '../../config/mapToCN';
import FunctionButton from "./FunctionButton";
import SignInButton from "../elements/SignInButton";
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
            editing: false
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
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

    render() {
        return (
            <>
                <FunctionButton toEdit={this.clickHandler} commentHandler={this.props.commentHandler}/>
                <CSSTransition classNames={'rotation-one'} timeout={300} in={this.state.stepOne} onEntered={() => {
                    this.setState({
                        stepTwo: true
                    })
                }}>
                    <div className="desc" style={{
                        marginLeft: this.props.comments ? '-500px' : '0px'
                    }}>
                        <div className="avater">
                            <div className="top">
                                <img src={this.props.user.avater} alt=""/>
                            </div>
                            <div className="links">
                                {
                                    index.map((i) => (
                                        <a href={this.props.user[i]} key={i}>
                                            <img src={icon[i]} alt={i}/>
                                        </a>
                                    ))
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
                            onExited={()=>{
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
                                                i === 'motto' ? (
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
                                                i === 'motto' ? (
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
            </>
        )
    }
}
