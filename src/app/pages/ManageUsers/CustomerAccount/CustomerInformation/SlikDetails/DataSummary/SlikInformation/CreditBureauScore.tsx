import { useSelector } from 'react-redux';
import { slikDetailsSlice } from '../../slice/selectors';
import InfoItem from './Components/InfoItem';

// import chart from './img/chart.svg';
import riskGradeImg from './img/risk-grade.svg';

function CreditBureauScore() {
  const { data } = useSelector(slikDetailsSlice);

  const cbsScoreData = data?.cbscore?.cbsglocal?.scoreData;
  return (
    <InfoItem label="Credit Bureau Score" className="mt-4">
      <div className="border border-[#D7E2EE] rounded-lg h-[144px] flex items-center px-[70px]">
        <p className="font-bold leading-[22px] w-[130px]">Risk Grade</p>
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
      <div className="border border-[#D7E2EE] rounded-lg h-[144px] flex items-center px-[70px] mt-4 mb-6">
        <div>
          <div className="flex items-center">
            <p className="font-bold leading-[22px] w-[130px]">Score</p>
            <p className="font-bold text-[24px] leading-[29px]">
              {cbsScoreData?.scoreRaw || '-'}
            </p>
          </div>
          <div className="flex items-center mt-2">
            <p className="font-bold leading-[22px] w-[130px]">Risk Status</p>
            <p className="font-bold text-[#F6C25B] text-[24px] leading-[29px]">
              {cbsScoreData?.scoreMessage?.description || '-'}
            </p>
          </div>
        </div>
        {/* <img src={chart} width={160} height={80} alt="" className="ml-auto" /> */}
      </div>
    </InfoItem>
  );
}

export default CreditBureauScore;
