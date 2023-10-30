import React from 'react';
import { Tab, Box, Tabs, Typography, Badge } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import Notifier from 'app/pages/Notifier';
import styled from 'styled-components';
interface Props {
  sidebar: any[];
}

const CustomTab = styled.div`
  display: flex;
  width: 100%;
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
        .MuiTypography-root {
          font-weight: inherit;
        }
      }
    }
  }
`;

const SiderbarCustomer = (props: Props) => {
  const { sidebar } = props;
  const [valueTab, setValueTab] = React.useState(0);

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        minHeight: '370px',
      }}
    >
      <CustomTab>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={valueTab}
          onChange={handleChangeTab}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {sidebar.map((item: any, index: number) => (
            <Tab
              label={item.title}
              {...a11yProps(index)}
              key={index}
              sx={{
                maxWidth: '237px',
                width: '237px',
                color: item.isShowError ? 'red !important' : 'black',
              }}
            />
          ))}
        </Tabs>
        {sidebar.map((item: any, index: number) => {
          return (
            <div
              role="tabpanel"
              hidden={valueTab !== index}
              id={`vertical-tabpanel-${index}`}
              aria-labelledby={`vertical-tab-${index}`}
              key={index}
              style={{ width: 'calc(100% - 237px)' }}
            >
              {valueTab === index && (
                <Box sx={{ padding: '20px 56px' }}>{item.component}</Box>
              )}
            </div>
          );
        })}
      </CustomTab>
    </Box>
  );
};

export default SiderbarCustomer;
