import {
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
  Autocomplete,
  Container,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { selectBranchBankParnerManagementCreate } from '../../slice/selectors';
import { useCreateBranchBankPartnerSlice } from '../../slice';
import { BankHQAccounts } from '../../slice/types';
import { ControlledDropdown } from 'app/components/Dropdown';
import { ControlledHeadquarterDropdown } from 'app/components/DropdownInput/Headquarter';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledProvinceDropdown } from 'app/components/DropdownInput/Provinces';
import { ControlledCityDropdown } from 'app/components/DropdownInput/Cities';
import { ControlledTextarea } from 'app/components/TextArea';

const RenderInput = styled('div')({
  '& .MuiFormControl-root': {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      background: '#F6F8FC!important',
    },
    '& textarea': {
      height: '130px!important',
    },
  },
  '& .MuiFormHelperText-root': {
    color: '#ff0000',
    fontSize: '14px',
  },
});

const BranchInformation = () => {
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const fetchFormData = useSelector(selectBranchBankParnerManagementCreate);
  const dispatch = useDispatch();
  const { actions } = useCreateBranchBankPartnerSlice();
  const { provinces, cities, headquarters } = fetchFormData;
  const [listHeadquarter, setListHeadquarter] = React.useState<string[]>([]);
  const [valueCity, setValueCity] = React.useState<string>('');

  React.useEffect(() => {
    if (headquarters && headquarters.length > 0) {
      const _headquarters: string[] = [];
      headquarters.map((item: BankHQAccounts, index: number) => {
        _headquarters.push(item.company.name);
      });
      setListHeadquarter(_headquarters);
    }
  }, [headquarters]);

  React.useEffect(() => {
    if (getValues('city')) {
      setValueCity(getValues('city'));
    }
  }, [getValues('city')]);

  React.useEffect(() => {
    if (getValues('province')) {
      dispatch(actions.fechCities(getValues('province').value));
    }
  }, [watch(['province']) && getValues('province')]);

  const handleChangeProvince = (value?: { label: string; value: string }) => {
    setValue('city', undefined);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid sx={{ minHeight: '600px' }}>
      <Grid item xs={12} md={12}>
        <Typography
          sx={{ fontWeight: '700', fontSize: '16px', color: '#223250' }}
        >
          {t(translations.bankManagement.branchInformation)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={2}>
        <Typography
          sx={{ fontWeight: '400', fontSize: '14px', color: '#223250' }}
        >
          {t(translations.bankManagement.completeBranchInformation)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledHeadquarterDropdown
            name="bankHqUuid"
            control={control}
            label="Select Headquarter"
            rules={{
              required: 'Required',
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledTextField
            className="field"
            label={`${t(translations.bankManagement.companyName)}`}
            name="company.name"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledTextField
            className="field"
            label={`${t(translations.bankManagement.branchName)}`}
            name="company.branchName"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledProvinceDropdown
            name="province"
            control={control}
            label={`${t(translations.common.province)}`}
            className="field"
            placeholder="Select Province"
            onChange={handleChangeProvince}
            value={getValues('company.province')}
            rules={{
              required: 'Required',
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledCityDropdown
            name="city"
            control={control}
            label={`${t(translations.bankManagement.cityRegency)}`}
            className="field"
            placeholder={`${t(translations.bankManagement.cityRegency)}`}
            province={watch('province')?.value}
            rules={{
              required: 'Required',
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} mt={3}>
        <Stack>
          <ControlledTextarea
            className="field"
            label={`${t(translations.bankManagement.companyAddress)}`}
            name="company.address"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BranchInformation;
