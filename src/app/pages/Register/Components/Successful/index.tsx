import React from 'react';
import { Grid, Box, Typography, Stack, styled, Container } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

import successful from '../../../../../assets/images/successful.svg';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 545,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: 'rgba(255, 204, 4, 1) !important',
  color: '#223250 !important',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'rgba(255, 204, 4, 1)',
    boxShadow: 'none',
  },
}));

const Successful = React.memo(() => {
  const handleRedire = () => {};
  return (
    <Container maxWidth="md">
      <ContentStyle>
        <Stack sx={{ mb: 5, alignItems: 'center' }}>
          <img src={successful} alt="" />
          <Typography
            sx={{ fontSize: '28px', fontWeight: '600', color: '#000000' }}
            gutterBottom
          >
            {'Cek Email Kami Mengirimkan Kode OTP'}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#223250',
              padding: '0 10px',
            }}
            gutterBottom
          >
            {'Kode OTP sudah terkirim ke'}{' '}
            <a style={{ color: '#005FC5', fontWeight: '600' }}>
              alexandretedja@gmail.co
            </a>{' '}
            {', klik Link untuk Masuk ke Akun Kamu'}
          </Typography>
          <ColorButton disabled={false} onClick={handleRedire}>
            Cek Email
          </ColorButton>
        </Stack>
      </ContentStyle>
    </Container>
  );
});

export default Successful;
