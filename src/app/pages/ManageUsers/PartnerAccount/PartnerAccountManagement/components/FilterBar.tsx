import React, { useRef } from 'react';

import searchIcon from 'assets/icons/search.svg';
import arrowDownIcon from 'assets/icons/arrow-down.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import path from 'app/routes/path';
import ActionDialog from 'app/components/ActionDialog';

import { DropItem } from '../slice/types';

import SearchByDropdown from './SearchByDropdown';
import iconAgent from 'assets/images/icon_agent.svg';
import iconDeveloper from 'assets/images/icon_developer.svg';
import iconHeadQuarter from 'assets/images/icon_bank_hq.svg';
import iconBranch from 'assets/images/icon_bank_branch.svg';
import iconClient from 'assets/images/icon_client.svg';

import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { Box, Button, Grid, Typography } from '@mui/material';
import { isEmpty } from 'lodash';

const RootContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #223250;
  margin-bottom: 32px;
`;

const Search = styled.div`
  display: inline-flex;
  background: #fff;
  align-items: center;
  border-radius: 8px;
  padding-right: 16px;
  border: 1px solid #c6d7e0;
  height: 48px;
  .search-icon {
    margin-left: 16px;
  }
  input {
    font-size: 16px;
    padding-left: 16px;
    border: none;
    height: 100%;
    outline: none;
    border-radius: 8px;
  }
`;

const Filter = styled.div`
  padding-left: 16px;
  padding-right: 12px;
  margin-right: auto;
  margin-left: 24px;
  height: 48px;
  display: flex;
  align-items: center;
  background: #fff;
  border: 0.5px solid #c6d7e0;
  border-radius: 8px;
  span {
    line-height: 28px;
    margin-right: 14px;
  }
  img {
    cursor: pointer;
  }
`;

const RegisterButton = styled.button`
  padding: 10px 22px;
  line-height: 28px;
  font-weight: 600;
  background-color: #005fc5;
  border-radius: 8px;
  color: #ffffff;
`;

const CustomDescriptionDialog = styled.div`
  margin: 20px 0;
`;

const Title = styled.span`
  font-weight: 400;
  font-size: 14px;
  margin-top: 20px;
`;

interface Props {
  searchBy?: DropItem;
  onChangeSearchBy: (value: DropItem) => void;
  onChangeSearchInput: (keyword: string) => void;
}

export default function FilterBar(props: Props) {
  const { searchBy, onChangeSearchBy, onChangeSearchInput } = props;
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openPopupRegister, setOpenPopupRegister] =
    React.useState<boolean>(false);
  const [selectedPartner, setSelectedPartner] = React.useState<string>('');

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      onChangeSearchInput(e.target.value);
    }, 300);
  };

  const handleRegisterPartner = () => {
    setOpenPopupRegister(true);
  };

  const accounts = React.useMemo(
    () => [
      {
        id: 'agent',
        title: t(translations.registerNewPartnerPopup.agent),
        icon: iconAgent,
        path: path.registerNewPartnerAgent,
        disabled: true,
      },
      {
        id: 'developer',
        title: t(translations.registerNewPartnerPopup.developer),
        icon: iconDeveloper,
        path: path.registerNewPartnerDeveloper,
      },
      {
        id: 'bankHQ',
        title: t(translations.registerNewPartnerPopup.bankHq),
        icon: iconHeadQuarter,
        path: path.registerNewPartnerBankHq,
      },
      {
        id: 'bankBranch',
        title: t(translations.registerNewPartnerPopup.bankBranch),
        icon: iconBranch,
        path: path.createBranchBankAccount,
        disabled: true,
      },
      {
        id: 'client',
        title: t(translations.registerNewPartnerPopup.client),
        icon: iconClient,
        path: path.registerNewPartnerClient,
      },
    ],
    [t],
  );

  const handleRedirectRegisterPartner = React.useCallback(() => {
    const selectedPath = accounts.find(
      account => account.id === selectedPartner,
    )?.path;
    if (selectedPath) {
      navigate(selectedPath);
    }
  }, [accounts, navigate, selectedPartner]);

  const renderAccount = (list: any[]) => {
    return (
      <React.Fragment>
        {list.map((item, index) => (
          <Grid
            item
            key={index}
            sx={{
              width: '20%',
            }}
            onClick={() => {
              if (item.disabled) {
                // ignore
              } else {
                setSelectedPartner(item.id);
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                borderRadius: '14px',
                background: '#F6F8FC',
                padding: '14px',
                height: 'auto',
                border: selectedPartner === item.id ? '2px solid #005FC5' : '',
                transition: '200ms all ease',
                minHeight: '180px',
                alignItems: 'center',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <Box>
                {item.disabled ? (
                  <img
                    src={item.icon}
                    alt=""
                    style={{ height: '80px', filter: 'grayscale(100)' }}
                  />
                ) : (
                  <img src={item.icon} alt="" style={{ height: '80px' }} />
                )}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#223250',
                    textAlign: 'center',
                    marginTop: '1rem',
                    alignSelf: 'center',
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </React.Fragment>
    );
  };

  const renderRegisterPartnerDialogActions =
    React.useCallback((): React.ReactNode => {
      return (
        <>
          <Button
            variant="contained"
            size="large"
            disabled={isEmpty(selectedPartner)}
            onClick={handleRedirectRegisterPartner}
          >
            {t(translations.registerNewPartnerPopup.select)}
          </Button>
        </>
      );
    }, [t, selectedPartner, handleRedirectRegisterPartner]);

  const handleClosePopupRegisterPartner = React.useCallback(() => {
    setOpenPopupRegister(false);
    setSelectedPartner('');
  }, []);

  return (
    <RootContainer>
      <Search className="input">
        <SearchByDropdown value={searchBy} onChange={onChangeSearchBy} />
        <img
          src={searchIcon}
          width={24}
          height={24}
          alt=""
          className="search-icon"
        />
        <input
          type="text"
          placeholder="Search"
          onChange={handleChangeSearchInput}
        />
      </Search>
      <Filter>
        <span>Filter</span>
        <img width={24} height={24} src={arrowDownIcon} alt="" />
      </Filter>
      <RegisterButton onClick={handleRegisterPartner}>
        {t(translations.partnerManagement.registerNewPartner)}
      </RegisterButton>
      <ActionDialog
        openDialog={openPopupRegister}
        onCloseDialog={handleClosePopupRegisterPartner}
        title={t(translations.partnerManagement.registerNewPartner)}
        description={
          <CustomDescriptionDialog>
            <Title>
              {t(translations.partnerManagement.selectPartnerCategory)}
            </Title>
            <Grid
              container
              spacing={2}
              sx={{ mt: 1 }}
              justifyContent="space-between"
            >
              {renderAccount(accounts)}
            </Grid>
          </CustomDescriptionDialog>
        }
        renderAction={renderRegisterPartnerDialogActions}
        maxWidth="xl"
        sx={{
          '.MuiDialog-paperWidthXl': {
            minWidth: '50%',
          },
        }}
      />
    </RootContainer>
  );
}
