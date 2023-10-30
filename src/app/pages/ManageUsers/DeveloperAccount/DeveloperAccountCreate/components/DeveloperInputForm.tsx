import { Box, Tab, Tabs } from '@mui/material';
import { TabPanel } from 'app/components/TabPanel';
import { translations } from 'locales/translations';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { AccountInformation } from './AccountInformation';
import { CompanyInformation } from './CompanyInformation';
import { DocumentQualification } from './DocumentQualification';

interface Props {
  stepDeveloper: number;
  images: any;
  setImages: (value: any) => void;
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

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
  const { stepDeveloper, setImages, images } = props;
  const { t } = useTranslation();
  const [value, setValue] = useState<any>(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        margin: '12px 24px 24px 24px',
      }}
    >
      <CustomTab>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={stepDeveloper}
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
            disabled={!(stepDeveloper === 0)}
            {...a11yProps(0)}
          />
          <Tab
            style={{ alignItems: 'flex-start' }}
            label={t(translations.developerInformation.companyInformation)}
            disabled={!(stepDeveloper === 1)}
            {...a11yProps(1)}
          />
          <Tab
            style={{ alignItems: 'flex-start' }}
            label={t(translations.developerInformation.documentQualification)}
            disabled={!(stepDeveloper === 2)}
            {...a11yProps(2)}
          />
        </Tabs>
      </CustomTab>
      <div style={{ width: '100%' }}>
        <TabPanel value={stepDeveloper} index={0}>
          <AccountInformation setImages={setImages} images={images} />
        </TabPanel>
        <TabPanel value={stepDeveloper} index={1}>
          <CompanyInformation />
        </TabPanel>
        <TabPanel value={stepDeveloper} index={2}>
          <DocumentQualification setImages={setImages} images={images} />
        </TabPanel>
      </div>
    </Box>
  );
});
