import React from "react";
import comment from '../../assets/icons8-topic-64.png';
import edit from '../../assets/icons8-edit-64.png';
import './FunctionButton.scss';

export default function FunctionButton(p) {
    return (
        <div className="function_panel">
            <div className="function" onClick={p.commentHandler}>
                <div className="img">
                    <img src={comment} alt='留言'/>
                </div>
                <div className={'function_label'}>
                    留言
                </div>
            </div>
            <div className="function" onClick={p.toEdit}>
                <div className="img">
                    <img src={edit} alt="编辑"/>
                </div>
                <div className="function_label">
                    编辑
                </div>
            </div>
        </div>
    )
}
