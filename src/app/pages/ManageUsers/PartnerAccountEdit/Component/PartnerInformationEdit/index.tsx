import { ControlledTextField } from 'app/components/CustomTextField';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ControlledTextarea } from 'app/components/TextArea';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import {
  EMAIL_REGEX,
  PHONE_NUMBER,
} from '../../../../../../utils/helpers/regex';

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

const PartnerInformationEdit = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();

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
          name="companyName"
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
          name="companyEmail"
          label="Email"
          control={control}
          className={'mb-6'}
          rules={{
            required: 'Please fill this field',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Incorrect format email',
            },
          }}
          required
        />
        <ControlledTextField
          type="tel"
          label="Phone Number"
          name="companyPhone"
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
        <ControlledTextarea
          name="companyAddress"
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

export default PartnerInformationEdit;
