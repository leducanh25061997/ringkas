import { ControlledTextField } from 'app/components/CustomTextField';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { translations } from '../../../../../../locales/translations';
import { useTranslation } from 'react-i18next';
import { PHONE_NUMBER } from 'utils/helpers/regex';

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

const KYCEdit = () => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <form>
      <div style={{ paddingRight: '122px' }}>
        <Title>
          {t(translations.partnerManagement.partnersAccountInformation)}
        </Title>
        <Description>
          {t(translations.partnerManagement.completePartnerAccountInformation)}
        </Description>
        <ControlledTextField
          name="kycName"
          label="Full Name"
          control={control}
          type="text"
          className={'mb-6'}
          rules={{
            required: 'Please fill this field',
          }}
          required
        />
        <ControlledTextField
          type="tel"
          label="Phone Number"
          name="kycPhone"
          required
          control={control}
          rules={{
            required: 'Required',
            pattern: {
              value: PHONE_NUMBER,
              message: 'Invalid phone number',
            },
          }}
          className={'mb-6'}
        />
        <ControlledDatePicker
          name="dob"
          label={`${t(translations.developerInformation.dateOfBirth)}`}
          control={control}
          className={'mb-6'}
          disableFuture
          rules={{
            required: 'Please fill this field',
          }}
        />
        <ControlledTextField
          name="nik"
          label="ID Number"
          control={control}
          type="id"
          rules={{
            required: 'Please fill this field',
          }}
          required
          className={'mb-6'}
        />
      </div>
    </form>
  );
};

export default KYCEdit;
