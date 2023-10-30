import { Stack, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {}

const RootStyle = styled('div')({
  '& input': {
    color: '#223250',
    fontWeight: 'bold',
    fontSize: '28px!important',
    width: '50px',
    height: '50px',
    marginLeft: '0.5rem',
    textAlign: 'center',
    border: '2px solid #223250',
    borderRadius: '4px',
  },
});

export default function OTPForm(props: Props) {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      <RootStyle>
        <input />
        <input style={{ marginLeft: '0.5rem' }} />
        <input style={{ marginLeft: '0.5rem' }} />
        <input style={{ marginLeft: '0.5rem' }} />
        <input style={{ marginLeft: '0.5rem' }} />
        <input style={{ marginLeft: '0.5rem' }} />
      </RootStyle>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{ background: '#FFCC04', color: 'black' }}
      >
        {t(translations.common.continue)}
      </LoadingButton>
    </Stack>
  );
}
