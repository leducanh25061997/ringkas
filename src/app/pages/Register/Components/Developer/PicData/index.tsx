import React from 'react';
import { Box, styled, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useForm } from 'react-hook-form';
import { RegistrationRequest } from 'types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import CustomButton from 'app/components/CustomButton';

import FirstPicData from './Component/FirstPicData';
import SecondPicData from './Component/SecondPicData';
interface Props {
  images: any;
  setImages: (value: any) => void;
  handleNext: () => void;
  handleData: (data: RegistrationRequest) => void;
  formData: any;
  setFormData: (value: any) => void;
}

const CustomTab = styled('div')(({ theme }) => ({
  '& .tab_list': {
    '& .MuiButtonBase-root.Mui-selected': {
      color: '#005FC5 !important',
      borderBottom: '6px solid #C6D7E0',
    },
    '& .MuiButtonBase-root': {
      color: '#C6D7E0 !important',
      borderBottom: '6px solid #C6D7E0',
    },
  },
  '& .MuiTabs-indicator': {
    background: '#005FC5',
    height: '6px',
  },
}));

const PicData = (props: Props) => {
  const { images, setImages, handleNext, handleData, formData, setFormData } =
    props;
  const [valueTab, setValueTab] = React.useState<any>('1');
  const [isDisable, setIsDisable] = React.useState<boolean>(true);
  const [isDisableTab, setIsDisableTab] = React.useState<boolean>(true);
  const [isDisableConfirm, setIsDisableConfirm] = React.useState<boolean>(true);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (
      formData.fullName !== '' &&
      formData.phone !== '' &&
      formData.email !== '' &&
      formData.password !== ''
    ) {
      setIsDisable(false);
      setIsDisableTab(false);
    } else {
      setIsDisableTab(true);
      setIsDisable(true);
    }
    if (
      formData.nik !== '' &&
      formData.photoKtp.url !== '' &&
      formData.dob !== ''
    ) {
      setIsDisableConfirm(false);
    } else {
      setIsDisableConfirm(true);
    }
  }, [formData]);

  const validateForm = yup.object().shape({
    email: yup.string().email(t(translations.required.invalidEmail)),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useForm({
    resolver: yupResolver(validateForm),
  });

  const handeChangeTab = (data: RegistrationRequest) => {
    handleData(data);
    const _value = parseInt(valueTab) + 1;
    // LocalStorageService.set(
    //   LocalStorageService.ACTIVE_TAB,
    //   _value.toString()
    // );
    setIsDisableTab(false);
    setValueTab(_value.toString());
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  return (
    <Box maxWidth="sm" sx={{ ml: 2, mr: 2 }}>
      <CustomTab>
        <TabContext value={valueTab}>
          <Box>
            <TabList
              aria-label="lab API tabs example"
              variant="fullWidth"
              className={'tab_list'}
              onChange={handleChange}
            >
              <Tab
                label="PIC Data 1"
                disabled={isDisableTab}
                value="1"
                sx={{ color: '#FFCC04' }}
                className={'tab'}
              />
              <Tab
                label="PIC Data 2"
                disabled={isDisableTab}
                value="2"
                className={'tab'}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: '0' }}>
            <FirstPicData
              control={control}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              getValues={getValues}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <CustomButton
                content={'Continue'}
                fullWidth={true}
                isDisable={isDisable}
                variant={isDisable ? '#F6F8FC' : 'rgba(255, 204, 4, 1)'}
                handleClick={handleSubmit(handeChangeTab)}
              />
            </Box>
          </TabPanel>
          <TabPanel value="2" sx={{ padding: '0' }}>
            <SecondPicData
              formData={formData}
              setFormData={setFormData}
              images={images}
              setImages={setImages}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <CustomButton
                content={'Continue'}
                fullWidth={true}
                isDisable={isDisableConfirm}
                variant={isDisableConfirm ? '#F6F8FC' : 'rgba(255, 204, 4, 1)'}
                handleClick={handleNext}
              />
            </Box>
          </TabPanel>
        </TabContext>
      </CustomTab>
    </Box>
  );
};

export default PicData;
