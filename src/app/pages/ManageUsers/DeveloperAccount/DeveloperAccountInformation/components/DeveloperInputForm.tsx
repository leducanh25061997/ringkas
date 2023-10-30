import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { TabPanel } from 'app/components/TabPanel';
import { translations } from 'locales/translations';
import { memo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

import { AccountInformation } from './AccountInformation';
import { CompanyInformation } from './CompanyInformation';
import { DocumentQualification } from './DocumentQualification';
import { KYC } from './KYC';
import { HistoryLog } from './HistoryLog';

interface Props {
  developerAccountInfo?: DeveloperAccountList;
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const CustomPanel = styled.div`
  width: 100%;
  #vertical-tabpanel-0: {
    width: 100% !important;
  }
`;

const CustomTab = styled.div`
  .MuiTabs-root {
    .MuiTabs-scroller {
      .MuiTabs-indicator {
        background-color: transparent !important;
      }
      .MuiTabs-flexContainer {
        .MuiButtonBase-root.Mui-selected {
          color: #005fc5;
          font-weight: 600;
        }
        .MuiButtonBase-root {
          color: #9098a7;
          font-weight: 400;
          font-size: 14px;
        }
      }
    }
  }
`;

export const DeveloperInputForm = memo((props: Props) => {
  const { developerAccountInfo } = props;
  const { t } = useTranslation();
  const [value, setValue] = useState<any>(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const validateForm = yup.object().shape({});

  const methods = useForm<any>({
    resolver: yupResolver(validateForm),
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        margin: '0px 20px 20px 20px',
      }}
    >
      <CustomTab>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          style={{
            height: '100%',
            inlineSize: 'max-content',
            padding: '0rem 1rem',
          }}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab
            style={{ alignItems: 'flex-start' }}
            label={t(translations.developerInformation.accountInformation)}
            {...a11yProps(0)}
          />
          <Tab
            style={{ alignItems: 'flex-start' }}
            label="KYC"
            {...a11yProps(1)}
          />
          <Tab
            style={{ alignItems: 'flex-start' }}
            label={t(translations.developerInformation.companyInformation)}
            {...a11yProps(2)}
          />
          <Tab
            style={{ alignItems: 'flex-start' }}
            label={t(translations.developerInformation.documentQualification)}
            {...a11yProps(3)}
          />
          <Tab
            style={{ alignItems: 'flex-start' }}
            label={t(translations.developerInformation.historyLog)}
            {...a11yProps(4)}
          />
        </Tabs>
      </CustomTab>
      <CustomPanel>
        <TabPanel value={value} index={0} css={{ width: '100%' }}>
          <AccountInformation developerAccountInfo={developerAccountInfo} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <KYC developerAccountInfo={developerAccountInfo} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CompanyInformation developerAccountInfo={developerAccountInfo} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DocumentQualification developerAccountInfo={developerAccountInfo} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <HistoryLog developerAccountInfo={developerAccountInfo} />
        </TabPanel>
      </CustomPanel>
    </Box>
  );
});
