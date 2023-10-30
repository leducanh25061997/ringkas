import React from 'react';
import { Box, styled, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const CustomTab = styled('div')(({ theme }) => ({
  '& .tab_list': {
    '& .MuiButtonBase-root.Mui-selected': {
      color: '#FFCC04 !important',
      borderBottom: '2px solid #C6D7E0',
    },
    '& .MuiButtonBase-root': {
      color: '#C6D7E0 !important',
      borderBottom: '2px solid #C6D7E0',
    },
  },
  '& .MuiTabs-indicator': {
    background: '#005FC5',
  },
}));

interface Props {
  labels: string[];
  children: any;
}

const TabsRegister = React.memo((props: Props) => {
  const { labels, children } = props;
  const [valueTab, setValueTab] = React.useState<string>('1');

  const handeChangeTab = (value: string) => {
    const _value = parseInt(value) + 1;
    setValueTab(_value.toString());
  };

  return (
    <CustomTab>
      <TabContext value={valueTab}>
        <Box>
          <TabList
            aria-label="lab API tabs example"
            variant="fullWidth"
            className={'tab_list'}
          >
            {labels.map((label, index) => (
              <Tab
                label={label}
                disabled={true}
                value={index + 1}
                sx={{ color: '#FFCC04' }}
                className={'tab'}
              />
            ))}
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: '0' }}>
          {children}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}></Box>
        </TabPanel>

        {/* <Box>
          <TabList aria-label="lab API tabs example" variant="fullWidth" className={"tab_list"}>
            <Tab label="PIC Data 1" disabled={true} value="1" sx={{ color: '#FFCC04' }} className={"tab"} />
            <Tab label="PIC Data 2" disabled={true} value="2" className={"tab"} />
          </TabList>
        </Box> */}
      </TabContext>
    </CustomTab>
  );
});

export default TabsRegister;
