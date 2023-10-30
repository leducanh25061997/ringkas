import { Grid, Box, Typography, Stack } from '@mui/material';

import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import path from 'app/routes/path';
import CustomButton from 'app/components/CustomButton';

import backGround from 'assets/images/background_sign_up.png';
import iconRingkas from 'assets/images/icon_ringkas.svg';
import iconAgent from 'assets/images/icon_agent.svg';
import iconDeveloper from 'assets/images/icon_developer.svg';
import iconHeadQuarter from 'assets/images/icon_bank_hq.svg';
import iconBranch from 'assets/images/icon_bank_branch.svg';
import iconClient from 'assets/images/icon_client.svg';

import RegisterBankModal from './Components/RegisterBankModal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

const RegisterPage = () => {
  const { t } = useTranslation();
  const [isActive, setActive] = React.useState<boolean>(false);
  const [buttonActive, setButtonActive] = React.useState<string>();
  const [isDisable, setIsDisable] = React.useState<boolean>(true);
  const [bankTypeActive, setBankTypeActive] = React.useState<
    'HEADQUARTER' | 'BRANCH'
  >();
  const [openModalRegisterBank, setOpenModalRegisterBank] =
    React.useState(false);
  const accounts = React.useMemo(
    () => [
      {
        id: 'Agent',
        title: t(translations.registerNewPartnerPopup.agent),
        icon: iconAgent,
        disabled: true,
      },
      {
        id: 'Developer',
        title: t(translations.registerNewPartnerPopup.developer),
        icon: iconDeveloper,
      },
      {
        id: 'BankHQ',
        title: t(translations.registerNewPartnerPopup.bankHq),
        icon: iconHeadQuarter,
      },
      {
        id: 'BankBranch',
        title: t(translations.registerNewPartnerPopup.bankBranch),
        icon: iconBranch,
        disabled: true,
      },
      {
        id: 'Client',
        title: t(translations.registerNewPartnerPopup.client),
        icon: iconClient,
      },
    ],
    [t],
  );
  const navigate = useNavigate();
  const goBack = () => {
    navigate(path.login);
  };

  const handleRedirect = (type: string) => {
    setActive(true);
    setButtonActive(type);
    setIsDisable(false);
  };

  const renderAccount = (list: any[]) => {
    return (
      <React.Fragment>
        {list.map((item, index) => (
          <Grid
            item
            sx={{
              width: '20%',
            }}
            key={index}
            onClick={() => {
              if (item.disabled) {
                // ignore
              } else {
                handleRedirect(item.id);
              }
            }}
          >
            <Box
              sx={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                borderRadius: '14px',
                background: '#F6F8FC',
                padding: '14px',
                height: 'auto',
                display: 'flex',
                transition: '200ms all ease',
                minHeight: '160px',
                alignItems: 'center',
                border:
                  isActive && buttonActive === item.id
                    ? '1px solid #005FC5'
                    : '',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <Box>
                {item.disabled ? (
                  <img
                    src={item.icon}
                    alt=""
                    style={{ height: '80px', filter: 'grayscale(100)' }}
                  />
                ) : (
                  <img src={item.icon} alt="" style={{ height: '80px' }} />
                )}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#223250',
                    textAlign: 'center',
                    marginTop: '1rem',
                    alignSelf: 'center',
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </React.Fragment>
    );
  };

  const handleContinue = () => {
    switch (buttonActive) {
      case 'Agent':
        navigate(path.registerAgen);
        break;
      case 'BankBranch':
        navigate(path.registerBranchBank);
        break;
      case 'BankHQ':
        navigate(path.registerHeadquarterBank);
        break;
      case 'Client':
        navigate(path.registerPartner);
        break;
      default:
        navigate(path.registerDeveloper);
        break;
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: '100vh', background: 'white' }}>
      <Grid item xs={6} sm={6} md={6}>
        <Box
          sx={{
            background: '#F2FAFD',
            height: '100%',
            'justify-content': 'center',
            display: 'flex',
            'align-items': 'center',
          }}
        >
          <img style={{ width: '70%' }} src={backGround} alt="" />
        </Box>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Box sx={{ m: 11 }}>
          <Grid item xs container direction="column">
            <Stack>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <IconButton onClick={goBack}>
                  <ArrowBackIcon />
                </IconButton>
                <img src={iconRingkas} alt="" style={{ marginLeft: '12px' }} />
              </Box>
            </Stack>
            <Grid item sx={{ mt: 12 }}>
              <Typography
                sx={{
                  fontWeight: '700',
                  fontSize: '28px',
                  lineHeight: '42px',
                  color: '#223250',
                }}
              >
                {t(translations.common.register)}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '400',
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: 'rgba(34, 50, 80, 0.5)',
                }}
              >
                {t(translations.registerNewPartnerPopup.hint)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 12 }}>
            {renderAccount(accounts)}
          </Grid>
          <Stack spacing={2} sx={{ mt: 5 }}>
            <CustomButton
              content={t(translations.common.register)}
              fullWidth
              isDisable={isDisable}
              variant={isDisable ? '#F6F8FC' : '#005FC5'}
              color="#FFFFFF"
              handleClick={handleContinue}
            />
          </Stack>
          <Stack sx={{ mt: 1 }}>
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '24px',
                color: '#223250',
                marginTop: '1rem',
              }}
            >
              {t(translations.registerNewPartnerPopup.alreadyHaveAccount)}{' '}
              <Link to={path.login} className="!text-[#005FC5] font-semibold">
                {t(translations.common.signIn)}
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Grid>

      <RegisterBankModal
        open={openModalRegisterBank}
        onClose={() => setOpenModalRegisterBank(false)}
        bankType={bankTypeActive}
        onSelectBankType={setBankTypeActive}
      />
    </Grid>
  );
};

export default RegisterPage;
