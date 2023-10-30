import {
  Grid,
  styled,
  Stack,
  TextField,
  Box,
  Button,
  CardMedia,
  Card,
  Container,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';
import moment from 'moment';
import { set } from 'lodash';
import { Key, Row } from 'app/components/DataDisplay';
import ViewAndDownImage from 'app/components/ViewAndDownImage';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { PHONE_NUMBER } from 'utils/helpers/regex';

import { DeveloperAccountInfor } from '../../slice/types';
import { ControlledSignature } from 'app/components/Signature/Signature1';

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
  images?: any;
  setImages: (value: any) => void;
}

const KycInfomation = (props: Props) => {
  const { developerAccountInfo, images, setImages } = props;

  const {
    control,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  const onDrop = (file: any, path?: string) => {
    const newData = { ...images };
    set(newData, `${path}.url`, file.url);
    set(newData, `${path}.file`, file.file);
    set(newData, `${path}.name`, path);
    set(newData, `${path}.nameFile`, file.nameFile);
    setImages(newData);
  };

  const onRemove = React.useCallback((file: any, path?: string) => {
    const newData = { ...images };
    set(newData, `${path}.url`, '');
    set(newData, `${path}.file`, null);
    set(newData, `${path}.name`, '');
    set(newData, `${path}.nameFile`, '');
    setValue(`${path}`, '');
    setImages(newData);
  }, []);

  const handleChange = () => {
    const values = getValues();
  };

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <RootStyle>
        <Grid item xs={12} md={12}>
          <ControlledTextField
            className="field"
            label="Full Name as ID Card"
            name="kyc.fullName"
            control={control}
            rules={{
              required: 'Required',
            }}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <ControlledDatePicker
            control={control}
            name="kyc.dob"
            label={`${t(translations.bankManagement.dateOfBirth)}`}
            className="field"
            disableFuture
            rules={{
              required: 'Required',
            }}
            onChange={event => {
              if (
                event &&
                event.toString() !== 'Invalid Date' &&
                !moment(event).isAfter(new Date())
              ) {
                clearErrors('kyc.dob');
                setValue('kyc.dob', event);
              } else {
                setValue('kyc.dob', event, { shouldValidate: true });
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <ControlledTextField
            className="field"
            label="Phone Number"
            name="kyc.phone"
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
            label="ID Card Number"
            name="kyc.nik"
            control={control}
            rules={{
              required: 'Required',
            }}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <Row>
            <Key>{'Photo of ID Card'}</Key>
            {images?.fileKtp?.url ? (
              <Controller
                control={control}
                name="fileKtp"
                render={({ field }) => {
                  return (
                    <ViewAndDownImage
                      accept="image/*"
                      onDrop={onDrop}
                      onRemove={onRemove}
                      maxFile={1}
                      path="fileKtp"
                      image={images?.fileKtp?.url}
                      edit={true}
                      remove={true}
                      field={field}
                    />
                  );
                }}
              />
            ) : (
              <GeneralImageDetail
                images={images}
                setImages={setImages}
                grid={2}
                name="fileKtp"
                path="fileKtp"
                label={'TDP'}
                isUploadDevelop
              />
            )}
          </Row>
        </Grid>
        <Grid item xs={12} md={12} mt={2}>
          <Row>
            <Key>{'Photo of ID Card'}</Key>
            <Controller
              control={control}
              name="fileSignature"
              render={({ field }) => {
                return (
                  <ViewAndDownImage
                    accept="image/*"
                    onDrop={onDrop}
                    onRemove={onRemove}
                    maxFile={1}
                    path="fileSignature"
                    image={images?.fileSignature?.url}
                    field={field}
                  />
                );
              }}
            />
          </Row>
        </Grid>
      </RootStyle>
    </Container>
  );
};

export default KycInfomation;
