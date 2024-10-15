import React from "react";
import sampleImg from "../../public/img/sample.jpg"
import aiIcon from "../../public/img/ai-icon.svg"
import peopleIcon from "../../public/img/people-icon.svg"
import infoIcon from "../../public/img/info-icon.svg"
import infoMain from '../../public/img/info-main.png'
import voteMain from '../../public/img/vote-main.png'

function ServiceDescriptionCard () {
    const data = [
        {title:'영상만 올리면, AI가 다 해줘요', summary:'AI로 과실 측정', description:'과실비율, 관련 법령, 판례 모두 제공해줘요', icon:aiIcon, img:sampleImg},
        {title:'투표 통한 의견나눔', summary:'집단지성의 활용', description:'변호사를 비롯한 사람들의 도움을 받을 수 있어요', icon:peopleIcon, img:voteMain},
        {title:'교통 법률 찾기 힘들었죠?', summary:'교통정보를 한 눈에', description:'White-Box에서 한 번에 찾으세요', icon:infoIcon, img:infoMain},

    ]
    const renderImage = (img) => {
        return (
                <div className="flex justify-center items-center md:w-1/2 w-full">
                    <img 
                        src={img} 
                        alt="" 
                        className="h-auto object-cover rounded-xl size-3/4" 
                    />
                </div>
        );
    };

    const renderText = ({title, summary, description}) => {
        return (
            <div className="w-1/2 flex-col content-center justify-center hidden md:flex">
                <h2 className="p-3 m-7 text-2xl font-bold mb-2">{title}</h2>
                <p className="p-3 m-7 text-base text-gray-700 font-semibold mb-2">{summary}</p>
                <p className="p-3 m-7 text-sm text-gray-500">{description}</p>
            </div>
        );
    };

    return (
            <div>
                {data.map((item, index) => (
                    <div className="container mx-auto grid grid-cols-12">
                        <div className="col-span-2"></div>
                                <div 
                                key={index} 
                                className={`col-span-8 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} rounded-lg overflow-hidden mb-20 place-content-between`}
                                >
                                    {renderImage(item.img)}
                                    {renderText(item)}
                                </div>
                        <div className="col-span-2"></div>
                    </div>
                ))}
            </div>
    )
}

export default ServiceDescriptionCard;