import React from 'react';
import { Stack, Typography, Box } from '@mui/material';

import iconDescription from '../../../../../../../../assets/images/icon_description_sppkp.svg';

const DescriptionSppkp = React.memo(() => {
  return (
    <Stack
      sx={{
        background: '#F6F8FC',
        border: '1px dashed #C6D7E0',
        boxSizing: 'border-box',
        borderRadius: '10px',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={iconDescription} alt="" />
      </Box>
      <Typography sx={{ color: '#9098A7', mt: 1 }}>
        {'Usap pada Kotak Dialog untuk MenambahkanTanda Tangan Kamu'}
      </Typography>
    </Stack>
  );
});

export default DescriptionSppkp;
