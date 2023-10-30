import AssessmentDetails from 'app/components/AssessmentDetails';
import { translations } from 'locales/translations';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScoringGuideLines from '../ScoringGuideLines';

export const COL_WIDTHS = ['33.33%', '33.33%', '33.33%'];

function RingkasAssessment() {
  const [openGuideLines, setOpenGuideLines] = useState(false);

  const { t } = useTranslation();

  const handleCloseGuideLines = () => setOpenGuideLines(false);

  const handleOpenGuideLines = () => setOpenGuideLines(true);

  return (
    <>
      <div className="rounded-2xl bg-white w-full mt-6 py-6">
        <div className="flex items-center px-8 justify-between">
          <h2 className="text-[#202A42] text-[18px] leading-8 font-bold">
            {t(translations.scoringReady.ringkasAssessment)}
          </h2>
          <button
            type="button"
            className="text-[#005FC5] rounded-lg leading-7 h-[48px] px-8 border-[#005FC5] border font-semibold"
            onClick={handleOpenGuideLines}
          >
            {t(translations.scoringReady.scoringGuidelines)}
          </button>
        </div>
        <AssessmentDetails editable />
      </div>
      <ScoringGuideLines
        open={openGuideLines}
        onClose={handleCloseGuideLines}
      />
    </>
  );
}

export default RingkasAssessment;
