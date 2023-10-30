import riskGradeImg from '../../../SlikDetails/DataSummary/SlikInformation/img/risk-grade.svg';
import chart from '../../../SlikDetails/DataSummary/SlikInformation/img/chart.svg';
import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../../SlikDetails/slice/selectors';

const CreditBereau = () => {
  const { data } = useSelector(slikDetailsSlice);

  const cbsScoreData = data?.cbscore?.cbsglocal?.scoreData;
  return (
    <div className="flex items-center justify-between px-[116px]">
      <div className="w-2/4 border border-[#D7E2EE] rounded-lg h-[144px] flex items-center px-[68px] mr-4">
        <p className="font-bold leading-[22px] mr-4">Risk Grade</p>
        <p className="font-bold text-[24px] text-[#F6C25B] leading-[29px] mr-4">
          {cbsScoreData?.scoreRange || '-'}
        </p>
        <img
          src={riskGradeImg}
          alt=""
          width={142}
          height={90}
          className="ml-auto"
        />
      </div>
      <div className="w-2/4 border border-[#D7E2EE] rounded-lg h-[144px] flex items-center px-[68px]">
        <div>
          <div className="flex items-center">
            <p className="font-bold leading-[22px] w-[110px]">Score</p>
            <p className="font-bold text-[24px] leading-[29px]">
              {' '}
              {cbsScoreData?.scoreRaw || '-'}
            </p>
          </div>
          <div className="flex items-center mt-6">
            <p className="font-bold leading-[22px] w-[110px]">Risk Status</p>
            <p className="font-bold text-[#F6C25B] text-[24px] leading-[29px]">
              {cbsScoreData?.scoreMessage?.description || '-'}
            </p>
          </div>
        </div>
        <img src={chart} width={160} height={80} alt="" className="ml-auto" />
      </div>
    </div>
  );
};

export default CreditBereau;
