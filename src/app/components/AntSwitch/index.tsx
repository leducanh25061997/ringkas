import React from 'react';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Stack } from '@mui/material';
import { Value } from 'app/components/DataDisplay';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 40,
  height: 19,
  padding: 0,
  '& .css-1vbggne-MuiFormControlLabel-root': {
    fontWeight: '600!important',
    '& .css-14o4ayq-MuiTypography-root ': {
      fontWeight: '600!important',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#39C24F' : '#39C24F',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#39C24F',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 14,
    height: 14,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  isDisplayTitle?: boolean;
}

const CustomizedSwitches = (props: Props) => {
  const { checked, onChange, isDisplayTitle } = props;
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <IOSSwitch
        checked={checked}
        onChange={onChange}
        inputProps={{ 'aria-label': 'ant design' }}
      />
      {isDisplayTitle && <Value>{checked ? 'Active' : 'Inactive'}</Value>}
    </Stack>
  );
};

export default CustomizedSwitches;
