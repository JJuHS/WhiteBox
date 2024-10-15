import React, {useState} from "react"; 

const AiResultAccordion = ({aiUserFault, aiOtherFault, aiRelatedInformation, aiRelatedLaw, aiResult}) => {
  const [open, setOpen] = useState(true);
  const toggleAccordion = () => {
    setOpen(!open)
  }

  return (
    <>
    {open === true ?
    <>
    <div onClick={toggleAccordion} className="relative flex flex-row gap-5 border-b-2 border-black w-auto hover:cursor-pointer hover:bg-gray-100 mt-10">
      <div className="w-10 h-10 place-content-center text-center text-2xl">-</div>
        <div className="text-[20px] place-content-center">Ai 판단 요약</div>
        </div>  
        <div className="min-h-[100px] border-2 mt-4">
          <div className="flex flex-row gap-3">
          <p className="text-lg font-semibold">게시자:상대 = </p><p className="text-[#DC1B3E] text-lg font-bold">{aiUserFault}</p><p className="text-lg font-bold">:</p><p className="text-[#458EF7] text-lg font-bold">{aiOtherFault}</p>
          </div>
          <p className="text-lg font-semibold">결과</p>
          <p>{aiResult}</p>
          <p className="text-lg font-semibold">정보</p>
          <p>{aiRelatedInformation}</p>
          <p className="text-lg font-semibold">관련 판례</p>
          <p>{aiRelatedLaw}</p>
        </div>
        </>
        :     <div onClick={toggleAccordion} className="relative flex flex-row gap-5 border-b-2 border-black w-auto hover:cursor-pointer hover:bg-gray-100 mt-10">
        <div className="w-10 h-10 place-content-center text-center text-2xl">+</div>
          <div className="text-[20px] place-content-center">Ai 판단 요약</div>
          </div>  
  }
    </>
  );
}

export default AiResultAccordion;