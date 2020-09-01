import React from "react";
import MainLink from "../../router/MainLink";
import './LeftList.scss';

export default function LeftList(p) {
    return (
        <div className="left_list">
            <div className="user_info">
                <div className="avatar">
                    <img src={p.user.avater} alt=""/>
                </div>
                <div className="username">
                    {
                        p.user.username
                    }
                </div>
            </div>
            <MainLink/>
        </div>
    )
}
