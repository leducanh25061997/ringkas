import React from 'react';
import { styled } from '@mui/system';
import { Typography, Box } from '@mui/material';

export const KV = styled('div')({
  color: '#212b36',
  display: 'flex',
  flexDirection: 'column',
});

export const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  margin: '12px 0',
});

export const Key = styled('p')({
  fontWeight: '400',
  width: '40%',
  flexShrink: 0,
  fontSize: '16px',
});

export const Value = (props: { children: React.ReactNode }) => (
  <Typography
    sx={{
      width: '60%',
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '24px',
      color: '#223250',
    }}
  >
    {props.children}
  </Typography>
);

export const SubValue = (props: { children: React.ReactNode }) => (
  <Box
    sx={{
      '& .MuiTypography-root': {
        fontWeight: '600',
        fontSize: '16px',
        lineHeight: '24px',
        color: '#223250',
      },
    }}
  >
    {props.children}
  </Box>
);

export const EmailValue = styled('div')({
  width: '60%',
  fontSize: '16px',
  fontWeight: 600,
  color: '#005FC5',
});

export const HistoryRow = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  margin: '12px 0',
});

export const HistoryKey = styled('div')({
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#757D8A',
  width: 300,
});

export const HistoryValue = styled('div')({
  fontWeight: '600',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#404D61',
  width: 300,
});
