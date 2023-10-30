import React from 'react';
import {
  Tab,
  Box,
  Tabs,
  ListItemText,
  List,
  ListItemButton,
  Collapse,
  Grid,
} from '@mui/material';
import styled from 'styled-components';
import classNames from 'classnames';

import { TabPanel } from '../TabPanel';
import CustomButton from '../CustomButton';

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
          padding: 16px;
        }

        .MuiTypography-root {
          font-weight: inherit;
        }
      }
    }
  }
`;

const ListItemTextCustom = styled(ListItemText)`
  &.active {
    color: #005fc5;
    font-weight: 600;
  }
`;

const ListItemTextChild = styled(ListItemText)`
  &.active {
    color: #223250;
    font-weight: 600;
  }
`;

interface Sidebar {
  title: string;
  component?: React.ReactNode;
  key: number;
  path?: string;
  children?: Sidebar[];
}

interface Props {
  step: number;
  setStep: (value: number) => void;
  sidebar: Sidebar[];
}

const ActionButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  background: #fff;
  padding: 12px 32px;
`;

const CustomTabs = React.memo((props: Props) => {
  const { sidebar, step, setStep } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<number>(0);

  const handleChange = (parent: number, child?: number) => {
    if (child) {
      setActiveTab(parent);
      setStep(child);
    } else {
      setStep(parent);
      setActiveTab(0);
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
    >
      <CustomTab>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          aria-label="Vertical tabs example"
          value={step}
          style={{
            height: '100%',
            inlineSize: 'max-content',
            padding: '0rem 1rem',
          }}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {sidebar.map((item: any, index) =>
              item.children ? (
                <>
                  <ListItemButton
                    onClick={() => {
                      handleChange(item.key, item.children[0].key);
                      handleClick();
                    }}
                    key={index}
                  >
                    <ListItemTextCustom
                      primary={item.title}
                      className={classNames({
                        active: item.key === step || activeTab === item.key,
                      })}
                    />
                  </ListItemButton>
                  {item?.children &&
                    item?.children.map((itemChild: any, idx: number) => (
                      <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        key={idx}
                      >
                        <List component="div" disablePadding>
                          <ListItemButton
                            sx={{ padding: '16px', marginLeft: '1rem' }}
                            onClick={() =>
                              handleChange(item.key, itemChild.key)
                            }
                          >
                            <ListItemTextChild
                              primary={itemChild.title}
                              className={classNames({
                                active: itemChild.key === step,
                              })}
                            />
                          </ListItemButton>
                        </List>
                      </Collapse>
                    ))}
                </>
              ) : (
                <ListItemButton onClick={() => handleChange(item.key)}>
                  <ListItemTextCustom
                    primary={item.title}
                    className={classNames({
                      active: item.key === step,
                    })}
                  />
                </ListItemButton>
              ),
            )}
          </List>
        </Tabs>
      </CustomTab>
      <div style={{ width: '100%' }}>
        {sidebar.map((item, index) => (
          <>
            {item.children ? (
              item.children.map((child, index) => (
                <TabPanel value={step} index={child.key}>
                  {child.component}
                </TabPanel>
              ))
            ) : (
              <TabPanel value={step} index={item.key}>
                {item.component}
              </TabPanel>
            )}
          </>
        ))}
      </div>
    </Box>
  );
});

export default CustomTabs;
