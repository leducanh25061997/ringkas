import { Box, Button, Collapse, Divider, Grid, styled } from '@mui/material';
import { translations } from 'locales/translations';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import lockIcon from 'assets/icons/fa-lock.svg';
import playIcon from 'assets/icons/play.svg';
import warningIcon from 'assets/icons/warning.svg';
import arrowBottomIcon from 'assets/icons/arrow-bottom.svg';
import arrowTopIcon from 'assets/icons/arrow-top.svg';
import { AssessmentDetails } from './AssessmentDetails';

const Title = styled('div')({
  fontWeight: 600,
  fontSize: '16px',
  color: '#202A42',
});

const Label = styled('div')({
  color: '#6B7A99',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '50px',
  '&.active': {
    fontWeight: '700!important',
  },
});

const Value = styled('div')({
  fontSize: '17px',
  color: '#202A42',
  lineHeight: '50px',
  fontWeight: 500,
  '&.active': {
    fontWeight: '700!important',
  },
});

const formatCurrency = (n: string) => {
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return n.replace(thousands, '.');
};

interface Props {}
export const AssessmentSummary = memo((props: Props) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);
  const hanleClickDetails = () => {
    setExpanded(!expanded);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        margin: '24px 0px 0px 0px',
        borderRadius: '12px',
        pt: 2,
        width: '100%',
      }}
    >
      <div className="float-right px-8">
        <Button sx={{ background: '#FF0000', color: 'white', px: 2 }}>
          <img src={lockIcon} alt="lock-icon" />
          <span className="ml-2 font-semibold text-[17px]">
            {t(translations.common.decline)}
          </span>
        </Button>
        <Button sx={{ background: '#005FC5', color: 'white', px: 2, ml: 2 }}>
          <img src={playIcon} alt="lock-icon" />
          <span className="ml-2 font-semibold text-[17px]">
            {t(translations.common.continue)}
          </span>
        </Button>
      </div>
      <Grid container spacing={4} sx={{ px: 4, py: 2 }}>
        <Grid item md={6}>
          <Title>
            {t(translations.developerWorkspace.assessmentSummary).toUpperCase()}
          </Title>
        </Grid>
        <Grid item md={6}>
          <Title>
            {t(
              translations.developerWorkspace.ringkasRecommenDation,
            ).toUpperCase()}
          </Title>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={4} sx={{ px: 4, py: 2 }}>
        <Grid item md={6}>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Label>{t(translations.developerWorkspace.housePrice)}</Label>
            </Grid>
            <Grid item md={3}>
              <div className="flex">
                <Value>Rp</Value>
                <Value className="ml-3 text-right w-full">
                  {formatCurrency('1529000000')}
                </Value>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Label>{`${t(
                translations.developerWorkspace.estimatedDownPayment,
              )} (@10%)`}</Label>
            </Grid>
            <Grid item md={3}>
              <div className="flex">
                <Value>Rp</Value>
                <Value className="ml-3 text-right w-full">
                  {formatCurrency('171000000')}
                </Value>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Label>{`${t(
                translations.developerWorkspace.estimatedMonthlyHousePayment,
              )} (@18x+ 5%)`}</Label>
            </Grid>
            <Grid item md={3}>
              <div className="flex">
                <Value>Rp</Value>
                <Value className="ml-3 text-right w-full">
                  {formatCurrency('10193333')}
                </Value>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Label>{`${t(translations.developerWorkspace.dbr)}`}</Label>
            </Grid>
            <Grid item md={3}>
              <div className="leading-[50px] text-right w-full text-[#FF0000]">
                42.85%
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Label>{`${t(
                translations.developerWorkspace.collectability,
              )}`}</Label>
            </Grid>
            <Grid item md={3}>
              <div className="leading-[50px] text-right w-full text-[#39C24F]">
                Good
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Label>{`DBR`}</Label>
            </Grid>
            <Grid item md={3}>
              <div className="flex">
                <Value>30%</Value>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Label>
                {t(translations.developerWorkspace.suggestedTargetHousePrice)}
              </Label>
            </Grid>
            <Grid item md={3}>
              <div className="flex">
                <Value>RP X.XXX.XXX</Value>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <Label>
                {t(translations.developerWorkspace.suggestedMonthlyPayment)}
              </Label>
            </Grid>
            <Grid item md={3}>
              <div className="flex">
                <Value>RP X.XXX.XXX</Value>
              </div>
            </Grid>
          </Grid>
          <Label>{t(translations.developerWorkspace.notes)}</Label>
          <div className="text-[#000000] text-[17px] flex">
            <span>
              Customer profile not suggested for house price at Rp 1.529.000.000
            </span>
            <img
              src={warningIcon}
              alt=""
              width={24}
              height={24}
              className="ml-1"
            />
          </div>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={4} sx={{ px: 4, py: 2 }}>
        <Grid item md={6}>
          <Title>
            {t(translations.developerWorkspace.assessmentDetails).toUpperCase()}
          </Title>
        </Grid>
        <Grid item md={6} onClick={hanleClickDetails}>
          <img
            src={expanded ? arrowTopIcon : arrowBottomIcon}
            className="cursor-pointer float-right"
            alt=""
          />
        </Grid>
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <AssessmentDetails />
      </Collapse>
    </Box>
  );
});
