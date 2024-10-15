import React from "react";

function AiDescriptionCard ({ type, content }) {
    let title;
    switch (type) {
        case 'ratio':
            title = '과실 비율'
            break;
        case 'situation':
            title = '법적 기준 및 결론'
            break;
        case 'description':
            title = '사고 발생 상황 분석'
            break;
        case 'law':
            title = '관련 법규'
            break;
        case 'precedent':
            title = '과실 비율 및 근거'
            break;
        default:
            title = '';
            break;
    }
    const renderCard = () => {
        return (
            <div className="mt-5">
                <span className="text-2xl font-semibold">{title}</span>
                <br />
                {type === 'ratio' ? <span className="ms-3">내 과실 {content[0]} : {content[1]} 상대 과실</span>:<span className="ms-3">{content}</span>}
                <hr />
            </div>
        )
    }

    return renderCard();
}

export default AiDescriptionCard;
