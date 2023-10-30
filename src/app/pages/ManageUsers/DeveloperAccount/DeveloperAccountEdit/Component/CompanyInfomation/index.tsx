import React from 'react';
import { Grid, styled, Stack, TextField, Container } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { ControlledTextField } from 'app/components/CustomTextField';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';
import { EMAIL_REGEX, PHONE_NUMBER } from 'utils/helpers/regex';

import { DeveloperAccountInfor } from '../../slice/types';

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
    '& .MuiFilledInput-root': {
      background: '#F6F8FC',
      borderRadius: '10px',
      border: '1px solid #C6D7E0',
    },
    '& input:focus': {
      boxShadow: 'none',
      color: 'black',
    },
    '& .MuiFilledInput-root:before': {
      right: 'unset',
      content: '""',
    },
    '& .MuiFilledInput-root:after': {
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .Mui-disabled': {
      background: '#E8E8E8',
      borderRadius: '10px',
    },
    '& .MuiInputLabel-root': {
      color: '#000000',
    },
    '& .MuiInputLabel-root:focus': {
      color: '#000000',
      background: '#FFFFFF',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'red !important',
    fontSize: '14px',
  },
});
export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
  marginBottom: '3rem',
  marginRight: '5rem',
});

interface Props {
  developerAccountInfo?: DeveloperAccountInfor;
}

const CompanyInfomation = React.memo((props: Props) => {
  const { developerAccountInfo } = props;
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const handleChange = () => {
    const values = getValues();
  };

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <RootStyle>
        <Grid item xs={12} md={12}>
          <ControlledTextField
            className="field"
            label="Company Name"
            name="company.name"
            onChange={handleChange}
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <ControlledTextField
            className="field"
            label="Company Address"
            name="company.address"
            control={control}
            rules={{
              required: 'Required',
            }}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <ControlledTextField
            className="field"
            label="Company Email"
            name="company.email"
            onChange={handleChange}
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Incorrect format email',
              },
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <ControlledTextField
            className="field"
            label="Company Phone Number"
            name="company.phone"
            type="tel"
            onChange={handleChange}
            control={control}
            rules={{
              required: 'Required',
              pattern: {
                value: PHONE_NUMBER,
                message: 'Invalid phone number',
              },
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <ControlledTextField
            className="field"
            type="id"
            label="Company NPWP Number"
            name="company.npwpNumber"
            control={control}
            rules={{
              required: 'Required',
            }}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <ControlledTextField
            className="field"
            type="id"
            label="Company SPPKP Number"
            name="company.sppkpNumber"
            control={control}
            rules={{
              required: 'Required',
            }}
            onChange={handleChange}
            required
          />
        </Grid>
      </RootStyle>
    </Container>
  );
});

export default CompanyInfomation;
