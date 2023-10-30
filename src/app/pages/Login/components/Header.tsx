/**
 *
 * Header
 *
 */
import { memo } from 'react';
import { Stack, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

import Logo from 'assets/images/logo-ringkas.svg';

interface Props {
  navigateTo?: string;
  setStep?: (value: number) => void;
}

export const Header = memo((props: Props) => {
  const { setStep } = props;

  const handleOnclick = () => {
    setStep && setStep(1);
  };

  return (
    <Stack
      sx={{
        marginBottom: '20px',
        display: 'inline',
      }}
    >
      <Box
        sx={{
          fontWeight: 700,
          fontSize: '36px',
          display: 'flex',
          justifyContent: 'flex-start',
          color: '#777777',
        }}
      >
        {props.navigateTo && (
          <IconButton
            onClick={handleOnclick}
            component={Link}
            to={props.navigateTo}
            sx={{ paddingLeft: 0, color: '#223250!important', mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <img src={Logo} alt="Ringkas" />
      </Box>
    </Stack>
  );
});
