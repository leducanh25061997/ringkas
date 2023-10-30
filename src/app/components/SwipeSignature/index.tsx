import { styled, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import UploadIcon from 'assets/images/signature.svg';
import { translations } from 'locales/translations';

const ImgUpload = styled('div')({
  borderRadius: '50%',
  width: '85px',
  height: '85px',
  background: '#005FC5',
  marginRight: 'auto',
  marginLeft: 'auto',
});

const RootStyle = styled('div')({
  height: '160px',
  objectFit: 'cover',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '1px solid #C6D7E0',
  borderRadius: '10px',
  marginTop: '1rem',
});

const DisplayFlex = styled('div')({
  textAlign: 'center',
  display: 'flex',
  marginLeft: '4rem',
});

const SignatureText = styled('span')({
  color: '#005FC5',
});

interface Props {}

export const SwipeSignature = memo((props: Props) => {
  const { t } = useTranslation();
  return (
    <RootStyle>
      <DisplayFlex>
        <img src={UploadIcon} />
        <Typography
          sx={{
            fontSize: '16px',
            color: '#223250',
            alignSelf: 'center',
            width: '200px',
            textAlign: 'left',
            marginLeft: '1rem',
          }}
        >
          {t(translations.customerAccountManagement.signatureText)}
          <SignatureText>
            {' '}
            {t(translations.customerAccountManagement.signature)}
          </SignatureText>
        </Typography>
      </DisplayFlex>
    </RootStyle>
  );
});
