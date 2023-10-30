import React from 'react';
import { Box, styled, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationRequest } from 'types';
import { useForm } from 'react-hook-form';
import CustomButton from 'app/components/CustomButton';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import FirstInfomation from './Component/FirstInfomation';
import SecondInfomation from './Component/SecondInfomation';
interface Props {
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

const CompanyInfomation = (props: Props) => {
  const { handleNext, handleData, formData, setFormData } = props;
  const [valueTab, setValueTab] = React.useState('1');
  const [isDisable, setIsDisable] = React.useState<boolean>(true);
  const [isDisableConfirm, setIsDisableConfirm] = React.useState<boolean>(true);
  const [isDisableTab, setIsDisableTab] = React.useState<boolean>(true);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (
      formData.companyName !== '' &&
      formData.companyAddress !== '' &&
      formData.companyEmail !== ''
    ) {
      setIsDisable(false);
      setIsDisableTab(false);
    } else {
      setIsDisableTab(true);
      setIsDisable(true);
    }

    if (
      formData.companyPhoneNumber !== '' &&
      formData.sppkpNumber !== '' &&
      formData.npwpNumber !== ''
    ) {
      setIsDisableConfirm(false);
    } else {
      setIsDisableConfirm(true);
    }
  }, [formData]);

  let validateForm = yup.object().shape({});
  validateForm = yup.object().shape({
    company: yup.object().shape({
      email: yup.string().email(t(translations.required.invalidEmail)),
    }),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
    setError,
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
    <Box sx={{ margin: '0 178px' }}>
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
                label="Company Information 1"
                value="1"
                sx={{ color: '#FFCC04' }}
                className={'tab'}
                disabled={isDisableTab}
              />
              <Tab
                label="Company Information 2"
                value="2"
                className={'tab'}
                disabled={isDisableTab}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: '0' }}>
            <FirstInfomation
              control={control}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              clearErrors={clearErrors}
              setError={setError}
              setValue={setValue}
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
            <SecondInfomation formData={formData} setFormData={setFormData} />
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

export default CompanyInfomation;
