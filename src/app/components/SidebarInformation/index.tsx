import React from 'react';
import { Tab, Box, Tabs } from '@mui/material';
import styled from 'styled-components';
interface Sidebar {
  title: string;
  component?: React.ReactNode;
  isDisable?: boolean;
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
          align-items: flex-start;
        }
        .MuiTypography-root {
          font-weight: inherit;
        }
      }
    }
  }
`;
interface Props {
  sidebar: Sidebar[];
  handleChangeTab: (event: React.SyntheticEvent, newValue: number) => void;
  valueTab: number;
}

const SidebarInformation = React.memo((props: Props) => {
  const { sidebar, handleChangeTab, valueTab } = props;

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        minHeight: '370px',
        width: '100%',
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
              disabled={item.isDisable}
              key={index}
              sx={{
                maxWidth: '237px',
                width: '237px',
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
                <Box sx={{ padding: '32px 56px' }}>{item.component}</Box>
              )}
            </div>
          );
        })}
      </CustomTab>
    </Box>
  );
});

export default SidebarInformation;
