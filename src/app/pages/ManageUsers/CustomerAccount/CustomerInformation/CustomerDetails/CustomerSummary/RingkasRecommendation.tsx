import warning from 'assets/icons/warning.svg';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectScoringReady } from '../../../ScoringReady/slice/selectors';
import Spinner from 'app/components/Spinner';
import { formatCurrency } from 'app/components/CustomTextField';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface RowProps {
  title: string;
  description: string;
  customStyle?: string;
}

const Row = ({ title, description, customStyle }: RowProps) => {
  return (
    <div className="flex mb-8">
      <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold w-9/12">
        {title}
      </p>
      <p
        className={classNames(
          'text-[#223250] text-[16px] leading-[20px] font-medium w-3/12',
          customStyle,
        )}
      >
        {description}
      </p>
    </div>
  );
};

const RingkasRecommendation = () => {
  const { t } = useTranslation();
  const { assessmentData, loading } = useSelector(selectScoringReady);
  const recommend = React.useMemo(() => {
    if (!assessmentData || !assessmentData.ringkasRecommendation)
      return { description: '-', customStyle: 'text-[#223250]' };
    if (
      assessmentData?.ringkasRecommendation &&
      assessmentData.ringkasRecommendation === 'RECOMMENDED'
    ) {
      return { description: 'Recommended', customStyle: 'text-[#39C24F]' };
    } else {
      return { description: 'Not Recommended', customStyle: 'text-[#FF0000]' };
    }
  }, [assessmentData]);

  return (
    <div className="w-6/12">
      <p className="text-[#223250] text-[16px] leading-[20px] font-semibold w-full pl-8 pb-6 border-b border-b-[#D7E2EE]">
        {t(translations.developerWorkspace.ringkasRecommenDation).toUpperCase()}
      </p>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="p-8 pb-0">
          <Row
            title={t(translations.developerWorkspace.DBR)}
            description={
              assessmentData?.ringkasRecommendationNotes?.dbr
                ? `${assessmentData?.ringkasRecommendationNotes?.dbr}`
                : '-'
            }
          />
          <Row
            title={t(translations.developerWorkspace.suggestedTargetHousePrice)}
            description={
              assessmentData?.ringkasRecommendationNotes?.housePriceSuggestion
                ? `Rp ${formatCurrency(
                    assessmentData?.ringkasRecommendationNotes
                      ?.housePriceSuggestion,
                  )}`
                : '-'
            }
          />
          <Row
            title={t(translations.developerWorkspace.suggestedMonthlyPayment)}
            description={
              assessmentData?.ringkasRecommendationNotes
                ?.monthlyPaymentSuggestion
                ? `Rp ${formatCurrency(
                    assessmentData?.ringkasRecommendationNotes
                      ?.monthlyPaymentSuggestion,
                  )}`
                : '-'
            }
          />
          <Row
            title={t(translations.developerWorkspace.systemRecommendation)}
            {...recommend}
          />
          <p className="mb-[14px] text-[#6B7A99] text-[14px] leading-[20px] font-semibold w-[167px] flex-1">
            {t(translations.developerWorkspace.notes)}
          </p>
          <div className="flex">
            <p className="text-[#202A42] text-[16px] leading-[20px] font-medium mr-2">
              {assessmentData?.ringkasRecommendationNotes?.note
                ? `Rp ${assessmentData?.ringkasRecommendationNotes?.note}`
                : '-'}
            </p>
            {assessmentData?.ringkasRecommendation === 'NOT_RECOMMEND' && (
              <img src={warning} alt="warning" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RingkasRecommendation;
