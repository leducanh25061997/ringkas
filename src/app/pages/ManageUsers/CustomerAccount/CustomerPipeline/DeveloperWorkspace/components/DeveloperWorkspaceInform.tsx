import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, styled, Tab } from '@mui/material';
import { translations } from 'locales/translations';
import React, { memo } from 'react';
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DeveloperTask } from './DeveloperTask';
import { KprSummary } from './KprSummary';

const CustomTab = styled('div')(({ theme }) => ({
  width: '100%',
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
  '& .MuiTabs-flexContainer': {
    width: '400px',
    paddingLeft: '2rem',
  },
}));

interface Props {
  setValueTab: (value: string) => void;
  valueTab: string;
  formMethod: UseFormReturn<FieldValues, any>;
  isError: boolean;
}
export const DeveloperWorkspaceInform = memo((props: Props) => {
  const { setValueTab, valueTab, formMethod, isError } = props;
  const { t } = useTranslation();
  const [isDisable, setIsDisable] = React.useState<boolean>(true);
  const [isDisableTab, setIsDisableTab] = React.useState<boolean>(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };
  const validateForm = yup.object().shape({});

  const method1 = useForm<any>({
    resolver: yupResolver(validateForm),
  });

  const onSubmitStep2 = () => {};
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          margin: '24px 0px 24px 0px',
          borderRadius: '12px',
          pt: 2,
          width: '100%',
        }}
      >
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
                  label={t(translations.customerList.kprSummary)}
                  disabled={isDisableTab}
                  value={'1'}
                  sx={{ color: '#FFCC04' }}
                  className={'tab'}
                />
                <Tab
                  label={t(translations.developerWorkspace.developerTask)}
                  disabled={isDisableTab}
                  value={'2'}
                  className={'tab'}
                />
              </TabList>
            </Box>
            <TabPanel value={'1'} sx={{ padding: '0' }}>
              <FormProvider {...formMethod}>
                <form style={{ width: '100%' }}>
                  <KprSummary isError={isError} />
                </form>
              </FormProvider>
            </TabPanel>
            <TabPanel value={'2'} sx={{ padding: '0' }}>
              <FormProvider {...method1}>
                <form
                  style={{ width: '100%' }}
                  onSubmit={method1.handleSubmit(onSubmitStep2)}
                >
                  <DeveloperTask />
                </form>
              </FormProvider>
            </TabPanel>
          </TabContext>
        </CustomTab>
      </Box>
      {/* {valueTab === '2' && (
        <div>
          <AssessmentSummary />
          <Property />
        </div>
      )} */}
    </div>
  );
});
