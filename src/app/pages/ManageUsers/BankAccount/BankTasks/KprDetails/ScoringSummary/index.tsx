import AssessmentSummary from './AssesmentSummary';
import RingkasRecommendation from './RingkasRecommendation';
import React, { useState } from 'react';

import { Collapse, Grid } from '@mui/material';

import arrowBottomIcon from 'assets/icons/arrow-bottom.svg';
import styled from 'styled-components';
import AssessmentDetails from 'app/components/AssessmentDetails';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
const Title = styled('div')({
  fontWeight: 600,
  fontSize: '16px',
  color: '#202A42',
});

const ScoringSummary = () => {
  const { t } = useTranslation();
  const [openAssessmentDetails, setOpenAssessmentDetails] = useState(false);

  return (
    <div className="card">
      <p className="text-[#202A42] text-[18px] leading-[24px] font-bold p-8">
        {t(translations.common.scoringSummary)}
      </p>
      <div className="flex">
        <AssessmentSummary />
        <RingkasRecommendation />
      </div>
      <Grid container spacing={4} sx={{ px: 4, py: 2 }}>
        <Grid item md={6}>
          <Title>
            {t(translations.developerWorkspace.assessmentDetails).toUpperCase()}
          </Title>
        </Grid>
        <Grid item md={6}>
          <img
            onClick={() => setOpenAssessmentDetails(prev => !prev)}
            src={arrowBottomIcon}
            className="cursor-pointer float-right"
            alt=""
          />
        </Grid>
      </Grid>
      <Collapse in={openAssessmentDetails} timeout="auto" unmountOnExit>
        <AssessmentDetails />
      </Collapse>
    </div>
  );
};

export default ScoringSummary;
