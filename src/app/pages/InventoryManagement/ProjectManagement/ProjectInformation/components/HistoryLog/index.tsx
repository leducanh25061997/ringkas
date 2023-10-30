import { Grid, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

const HistoryLogStyle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
  '& .header': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: '6px 0',
    color: '#757D8A',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '18px',
    '& .header__title:first-child': {
      flex: 2,
    },
    '& .header__title:nth-child(n + 2)': {
      flex: 1,
    },
  },
  '& .content': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    '& .value': {
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '18px',
      color: '#404D61',
    },
    '& .value:first-child': {
      flex: 2,
    },
    '& .value:nth-child(n + 2)': {
      flex: 1,
    },
  },
});

const HistoryLog = () => {
  const { t } = useTranslation();

  return (
    <Grid container sx={{ minHeight: '600px' }}>
      <Grid item md={12}>
        {/* <HistoryLogStyle>
          <div className="header">
            <div className="header__title">
              {t(translations.projectInformation.activityDetails)}
            </div>
            <div className="header__title">
              {t(translations.projectInformation.activityDate)}
            </div>
            <div className="header__title">
              {t(translations.projectInformation.activityTime)}
            </div>
          </div>
          <div className="content">
            <div className="value">{'Updates data on Date of Birth'}</div>
            <div className="value">{'23/11/2022'}</div>
            <div className="value">{'11:05:34'}</div>
          </div>
        </HistoryLogStyle>
        <HistoryLogStyle>
          <div className="header">
            <div className="header__title">
              {t(translations.projectInformation.activityDetails)}
            </div>
            <div className="header__title">
              {t(translations.projectInformation.activityDate)}
            </div>
            <div className="header__title">
              {t(translations.projectInformation.activityTime)}
            </div>
          </div>
          <div className="content">
            <div className="value">{'Updates data on Date of Birth'}</div>
            <div className="value">{'23/11/2022'}</div>
            <div className="value">{'11:05:34'}</div>
          </div>
        </HistoryLogStyle>
        <HistoryLogStyle>
          <div className="header">
            <div className="header__title">
              {t(translations.projectInformation.activityDetails)}
            </div>
            <div className="header__title">
              {t(translations.projectInformation.activityDate)}
            </div>
            <div className="header__title">
              {t(translations.projectInformation.activityTime)}
            </div>
          </div>
          <div className="content">
            <div className="value">{'Updates data on Date of Birth'}</div>
            <div className="value">{'23/11/2022'}</div>
            <div className="value">{'11:05:34'}</div>
          </div>
        </HistoryLogStyle> */}
      </Grid>
    </Grid>
  );
};

export default HistoryLog;
