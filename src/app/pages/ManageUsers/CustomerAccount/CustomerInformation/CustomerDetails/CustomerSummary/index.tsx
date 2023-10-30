import { Collapse } from '@mui/material';
import { useState } from 'react';
import AssessmentSummary from './AssessmentSummary';
import RingkasRecommendation from './RingkasRecommendation';

import arrowBottomIcon from 'assets/icons/arrow-bottom.svg';
import classNames from 'classnames';
import styled from 'styled-components';
import AssessmentDetails from 'app/components/AssessmentDetails';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

const Title = styled('div')({
  fontWeight: 600,
  fontSize: '16px',
  color: '#202A42',
});

interface Props {
  predefinedAssessmentValues?: Record<string, string>;
}

const CustomerSummary = ({
  predefinedAssessmentValues: predefinedValues = {} as Record<string, string>,
}: Props) => {
  const { t } = useTranslation();
  const [openAssessmentDetails, setOpenAssessmentDetails] = useState(true);

  return (
    <div className="card flex flex-col pt-6">
      <div className="flex">
        <AssessmentSummary />
        <RingkasRecommendation />
      </div>

      <div className="flex items-center justify-between border-t border-t-[#D7E2EE] px-8 py-6">
        <Title>
          {t(translations.developerWorkspace.assessmentDetails).toUpperCase()}
        </Title>
        <img
          onClick={() => setOpenAssessmentDetails(prev => !prev)}
          src={arrowBottomIcon}
          width={20}
          height={20}
          className={classNames('cursor-pointer', {
            'rotate-180': openAssessmentDetails,
          })}
          alt=""
        />
      </div>
      <Collapse in={openAssessmentDetails} timeout="auto" unmountOnExit>
        <AssessmentDetails predefinedAssessmentValues={predefinedValues} />
      </Collapse>
    </div>
  );
};

export default CustomerSummary;
