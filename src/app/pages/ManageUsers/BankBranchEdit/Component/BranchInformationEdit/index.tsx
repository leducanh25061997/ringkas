import { ControlledTextField } from 'app/components/CustomTextField';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ControlledTextarea } from 'app/components/TextArea';
import { ControlledProvinceDropdown } from 'app/components/DropdownInput/Provinces';
import { ControlledCityDropdown } from 'app/components/DropdownInput/Cities';
import { ControlledHeadquarterDropdown } from 'app/components/DropdownInput/Headquarter';
import { translations } from '../../../../../../locales/translations';
import { useTranslation } from 'react-i18next';

const Description = styled.div`
  font-weight: 400;
  margin: 4px 0 16px 0;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #223250;
`;

const BranchInformationEdit = () => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext();

  return (
    <form>
      <div style={{ paddingRight: '122px' }}>
        <Title>{t(translations.bankManagement.branchInformation)}</Title>
        <Description>
          {t(translations.bankManagement.completeBranchInformation)}
        </Description>
        <ControlledHeadquarterDropdown
          name="parentAccountUserUuid"
          control={control}
          label="Select Headquarter"
          className={'mb-6'}
          rules={{
            required: 'Required',
          }}
          required
        />
        <ControlledTextField
          name="name"
          label="Company Name"
          control={control}
          type="text"
          className={'mb-6'}
          rules={{
            required: 'Please fill this field',
          }}
          required
        />
        <ControlledTextField
          name="branchName"
          label="Branch Name"
          control={control}
          type="text"
          className={'mb-6'}
          rules={{
            required: 'Please fill this field',
          }}
          required
        />
        <ControlledProvinceDropdown
          name="province"
          label="Province"
          control={control}
          className={'mb-6'}
          rules={{
            required: 'Please fill this field',
          }}
          required
        />
        <ControlledCityDropdown
          name="city"
          label="City/Regency"
          control={control}
          type="text"
          className={'mb-6'}
          province={watch('province')?.value}
          rules={{
            required: 'Please fill this field',
          }}
          required
        />
        <ControlledTextarea
          name="address"
          label="Company Address"
          control={control}
          className={'mb-6'}
          rules={{
            required: 'Please fill this field',
          }}
          required
        />
      </div>
    </form>
  );
};

export default BranchInformationEdit;
