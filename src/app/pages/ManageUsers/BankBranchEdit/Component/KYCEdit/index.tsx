import { ControlledTextField } from 'app/components/CustomTextField';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { ControllerSignature } from 'app/components/Signature';
import { ControllerUploadImage } from '../../../../../components/UploadImage';
import { ControlledTextarea } from '../../../../../components/TextArea';
import { translations } from '../../../../../../locales/translations';
import { useTranslation } from 'react-i18next';
import { numberRegex, numberWithPrefix } from 'utils/helpers/regex';
import { HistoryRow, Key } from 'app/components/DataDisplay';
import moment from 'moment';

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
        <Title>{'Branch Information'}</Title>
        <Description>{'Complete Branch Information'}</Description>
        <ControlledTextField
          name="fullName"
          label="Full Name as ID Card"
          control={control}
          type="text"
          className={'mb-6'}
          rules={{
            required: 'Please fill this field',
          }}
          required
        />
        <ControlledTextField
          name="titleBranch"
          label="Title in Branch"
          control={control}
          type="text"
          className={'mb-6'}
          rules={{
            required: 'Please fill this field',
          }}
          required
        />
        <ControlledTextField
          name="nip"
          label="Employee ID Number"
          control={control}
          type="id"
          rules={{
            required: 'Please fill this field',
          }}
          required
          className={'mb-6'}
        />
        <ControlledTextField
          name="phone"
          label="Phone Number"
          control={control}
          type="tel"
          rules={{
            required: 'Please fill this field',
          }}
          required
          className={'mb-6'}
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
        <HistoryRow>
          <Key>Photo of ID Card*</Key>
          <ControllerUploadImage
            name="fileNik"
            control={control}
            title="Upload Photo or Video"
            description="Maximum Size 5MB"
            rules={{
              required: 'Please fill this field',
            }}
          />
        </HistoryRow>
        <HistoryRow>
          <Key>Signature Digital*</Key>
          <ControllerSignature
            name="fileSignature"
            control={control}
            rules={{
              required: 'Please fill this field',
            }}
          />
        </HistoryRow>
      </div>
    </form>
  );
};

export default KYCEdit;
