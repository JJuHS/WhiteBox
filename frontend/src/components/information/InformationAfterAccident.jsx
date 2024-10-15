import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import renderMainImg from '../../public/img/renderMain.png';
import renderAccidentNumberImg from '../../public/img/renderAccidentNumber.png';
import renderAccidentProcessImg from '../../public/img/renderAccidentProcess.jpg';
import renderAccidentProcessImg02 from '../../public/img/renderAccidentProcess02.jpg';

function InformationAfterAccident() {
    const location = useLocation(); // 현재 url
    const navigate = useNavigate();

    // 로컬 아이템 로드
    const [renderItem, setRenderItem] = useState(() => {
        const storedItem = localStorage.getItem('renderItem');
        return storedItem !== null ? parseInt(storedItem) : 0;
    });
    
    // url 변경시
    useEffect(() => {
        if (location.state && location.state.index !== undefined) {
            setRenderItem(location.state.index);
            localStorage.setItem('renderItem', location.state.index);
        }
    }, [location.state]);

    // 탭 버튼 동작 핸들러
    const handleClickItem = (id) => {
        setRenderItem(id);
        localStorage.setItem('renderItem', id);
        navigate(location.pathname, { state: { index: id } });
    }

    // 메인 내용 렌더링
    const renderMain = () => {
        return (
            <div className="p-4">
                <p className="text-xl">과실상계란?</p>
                <hr /><br />
                <p>과실상계(過失相計)란 채무불이행 또는 불법행위에 의해 손해가 발생한 경우 채무불이행 또는 불법행위의 성립 그 자체나 그로 인한 손해의 발생, 손해의 확대에 채권자 또는 피해자의 과실이 있는 경우 손해배상책임 및 그 금액을 정함에 있어 이를 참작하는 법리입니다. (민법 제396조, 민법 제763조)</p>
                <br />
                <p>교통사고에 있어서 과실상계는 피해자에게 과실이 존재할 때 교통사고로 인해 상호 발생한 손해에 대하여 자신의 과실만큼 상대방의 손해를 배상하는 것입니다.</p>
                <br />
                <img src={renderMainImg} alt=""/>
                <br />
                <p className="text-xl">과실상계의 이유와 조건</p>
                <hr /><br />
                <p>과실상계는 고의 또는 과실로 인한 손해에 대하여 책임을 진다는 과실책임주의와 가해자와 피해자간의 손해의 공평한 분담이라는 손해배상의 기본원칙을 이유로 합니다.</p>
                <br />
                <p>과실상계를 위해 피해자에게 과실이 존재해야 하며, 책임능력까지는 아니더라도 사리변식의 능력이 있어야 합니다.(대법원 1971.3.23. 선고 70다2986 판결) 뿐만 아니라 피해자의 과실과 손해의 발생 또는 확대가 상당인과관계가 있어야 합니다.</p>
            </div>
        );
    };

    // 절차 내용 렌더링
    const renderProcedure = () => {
        return (
            <div className="p-4">
                <p className="text-xl">과실상계절차</p>
                <hr /><br />
                <img src={renderAccidentProcessImg} alt="" />
                <br />
                <p>주) 구체적인 절차 및 보상서비스는 보험회사에 따라 다를 수 있습니다.</p>
                <br /><br />
                <p className="text-xl">과실분쟁해결 절차</p>
                <hr /><br />
                <img src={renderAccidentProcessImg02} alt="" />
                <br />
                <p>주1) 개인이 소송을 진행하고자 한다면 보험회사(또는 공제사)로부터 보험금액을 수령하지 않고 자비용 처리해야 합니다. 이럴 경우 소송이 완료될때까지 보상 처리가 지연되므로 소송비용 및 승률 등을 심사숙고하여 소송을 진행하시기 바랍니다.</p>
                <br />
                <p>주2) 과실분쟁은 개인과 보험사간의 분쟁이기보다 개인과 개인간의 분쟁의 성격을 가지고 있습니다. 따라서 정부기관인 경찰서와 공공기관인 금융감독원에 과실분쟁해결을 요청하실 경우, 해당기관에서도 개인간 민사분쟁에 적극적인 개입이 어렵기 때문에, 대부분의 과실분쟁 상담건에 대하여 민간자율조정기구인 과실비율 분쟁심의위원회의 절차를 안내하고 있습니다. 실질적으로 소송을 제외하고 과실비율 분쟁심의위원회에서 과실분쟁을 해소합니다.</p>
                <br />
                <p>주3) 세부 절차 및 분쟁처리는 구체적인 상황에 따라 다를 수 있습니다.</p>

            </div>
        );
    };

    // 인정기준 내용 렌더링
    const renderRecognization = () => {
        return (
            <div className="p-4">
                <p className="text-xl">과실비율인정기준</p>
                <hr /><br />
                <p>교통사고 발생시 가해자와 피해자의 책임정도를 나타내는 과실비율에 대하여 법원 판례, 법령, 분쟁조정사례 등을 참고로 만들어진 국내 유일의 공식기준입니다.</p>
                <br />
                <p className="text-xl">제정 배경 및 사용 이유</p>
                <hr /><br />
                <p>교통사고는 연간 약 126만건 발생하고 있습니다. 모든 사고에 대하여 법원의 판단을 받는 것은 현실적으로 어렵고 사법 행정력의 낭비 등 불필요한 사회적 비용이 발생하기 때문에 소송제기 전에 사고 당사자 간 원만한 합의를 위해 참고할 수 있는 과실비율 판단 기준이 필요합니다.</p>
                <img src={renderAccidentNumberImg} alt="" />
                <br />
                <p>1976년 과실비율 인정기준이 제정된 이후, 9회에 걸쳐 관련 법령 개정사항과 교통환경 변화 등을 반영해왔습니다.</p>
                <br />
                <p>기준 없이 사고당사자간 과실협의를 하는 경우 각각 본인들에게 유리한 주장을 함으로써 각종 문제 발생할 수 있습니다.(다툼, 정보비대칭, 동일사고 다른 과실, 보험사기 등)</p>
                <br />
                <p className="text-xl">근거</p>
                <hr /><br />
                <p>자동차보험표준약관 별표 3(보험업감독업무 시행세칙 별표 15)</p>
                <br />
                <p>별도로 정한 자동차사고 과실비율의 인정기준을 참고하여 산정하고, 사고유형이 그 기준에 없거나 그 기준에 의한 과실비율의 적용이 곤란할 때에는 판결례를 참작하여 적용함.</p>
                <br />
                <p>그러나 소송이 제기되었을 경우에는 확정판결에 의한 과실비율을 적용함.</p>
                <br />
                <p className="text-xl">활용</p>
                <hr /><br />
                <p>모든 보험사 및 공제사에서 보상실무에 적용하고 있습니다.</p>
                <br />
                <p>자동차사고 과실비율 분쟁심의위원회의 심의기준입니다.</p>
                <br />
                <p>금융감독원 금융분쟁조정위원회의 분쟁조정판단 근거로 적용하고 있습니다.</p>
                <br />
                <p>법원에서도 참고하고 있습니다.</p>
                <br />
                <p className="text-xl">효력</p>
                <hr /><br />
                <p>과실비율 인정기준은 법적인 구속력은 없고 참고자료에 해당합니다. 따라서 각 사고 당사자와 보험사가 각 사고당사자의 과실비율에 관하여 모두 합의하여 화해계약이 체결된 경우, 화해계약의 내용이 「과실비율 인정기준」과 다르더라도, 각 당사자간 체결한 화해계약(합의서)의 내용에 따라 과실비율이 결정됩니다.</p>
                <br />
                <p>하지만 분쟁은 양 당사자가 인정하는 비율이 달라 발생하는 것으로 일방 사고당사자의 주장만으로는 과실비율을 결정할 수 없습니다. 따라서 각 사고당사자의 과실비율 분배에 관하여 원만히 합의에 이르지 않아 분쟁이 지속되는 경우에는 종국적으로 법원의 판결에 따라 각 당사자의 과실비율을 결정하게 됩니다.</p>
            </div>
        );
    };

    return (
        <div className="w-full mx-12 mt-8">
            {/* 탭 버튼 모음 */}
            <div className="flex border-b border-gray-200">
                <button
                    className={`flex-1 py-2 text-center ${renderItem === 0 ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => handleClickItem(0)}
                >
                    과실상계란?
                </button>
                <button
                    className={`flex-1 py-2 text-center ${renderItem === 1 ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => handleClickItem(1)}
                >
                    과실상계절차
                </button>
                <button
                    className={`flex-1 py-2 text-center ${renderItem === 2 ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => handleClickItem(2)}
                >
                    과실비율인정기준
                </button>
            </div>
            {/* 세부 내용 렌더링 */}
            <div className="mt-4">
                {(renderItem === 0) ? renderMain() : (
                    renderItem === 1 ? renderProcedure() : renderRecognization()
                )}
            </div>
        </div>
    );
}

export default InformationAfterAccident;
