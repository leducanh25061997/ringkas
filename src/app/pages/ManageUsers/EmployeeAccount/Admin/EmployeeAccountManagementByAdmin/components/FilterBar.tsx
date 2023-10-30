import React, { useRef, useState } from 'react';

import searchIcon from 'assets/icons/search.svg';
import arrowDownIcon from 'assets/icons/arrow-down.svg';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import DateIcon from 'assets/icons/date.svg';
import UserIcon from 'assets/icons/user.svg';
import { useNavigate } from 'react-router';
import path from 'app/routes/path';

const RootContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #223250;
  margin-bottom: 32px;
`;

const Search = styled.div`
  background: white;
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  padding-left: 16px;
  border: 1px solid #c6d7e0;
  height: 48px;
  transition: all 0.15s;
  :focus-within {
    outline: 2px solid #2563eb;
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
  background: white;
  margin-left: 1rem;
  border-radius: 8px;
  border: 1px solid #c6d7e0;
  padding-left: 16px;
  padding-right: 12px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  span {
    line-height: 28px;
    margin-right: 14px;
  }
  img {
    cursor: pointer;
  }
`;

const SearchKey = styled.div`
  padding-left: 16px;
  padding-right: 12px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  span {
    line-height: 28px;
    margin-right: 14px;
  }
  img {
    cursor: pointer;
    border-right: 1px solid #c6d7e0;
    padding-right: 0.3rem;
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

interface ValueFilter {
  status: string[];
  createdDate: string[];
  searchKeyType: string[];
  orders: string;
}

interface Props {
  handleFilterData: (value: ValueFilter) => void;
  onSearch: (value: string) => void;
  allowInteraction: boolean;
}

export default function FilterBar(props: Props) {
  const { handleFilterData, onSearch, allowInteraction } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref = useRef(null);
  const refFilter = useRef(null);
  const [filter, setFilter] = useState<ValueFilter>({
    orders: '',
    status: [''],
    createdDate: [''],
    searchKeyType: [''],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [searchKey, setSearchKey] = useState<string>(
    t(translations.common.searchBy),
  );

  return (
    <RootContainer>
      <div style={{ display: 'flex' }}>
        <Search className="input">
          <SearchKey>
            <div
              ref={ref}
              onClick={() => setIsOpen(true)}
              style={{ cursor: 'pointer', display: 'flex' }}
            >
              <div>{searchKey}</div>
              <img width={34} height={24} src={arrowDownIcon} alt="" />
            </div>
            <Menu
              disableAutoFocusItem
              open={isOpen}
              anchorEl={ref.current || null}
              onClose={() => setIsOpen(false)}
              PaperProps={{
                sx: {
                  width: 150,
                  maxWidth: '100%',
                  mt: 5,
                  fontWeight: 600,
                  left: '308px!important',
                  textAlign: 'center',
                },
              }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                key={'fullName'}
                component={Button}
                sx={{ color: 'text.secondary', width: '100%' }}
                onClick={() => {
                  setSearchKey(t(translations.common.fullName));
                  setIsOpen(false);
                  const searchKeyType: string[] = ['FULL_NAME'];
                  const params = {
                    ...filter,
                    searchKeyType,
                  };
                  handleFilterData(params);
                  setFilter({
                    ...filter,
                    searchKeyType,
                  });
                }}
              >
                <ListItemText
                  primary={t(translations.common.fullName)}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                />
              </MenuItem>
              <MenuItem
                key={'email'}
                component={Button}
                sx={{ color: 'text.secondary', width: '100%' }}
                onClick={() => {
                  setSearchKey(t(translations.common.email));
                  setIsOpen(false);
                  const searchKeyType: string[] = ['EMAIL'];
                  const params = {
                    ...filter,
                    searchKeyType,
                  };
                  handleFilterData(params);
                  setFilter({
                    ...filter,
                    searchKeyType,
                  });
                }}
              >
                <ListItemText
                  primary={t(translations.common.email)}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                />
              </MenuItem>
            </Menu>
          </SearchKey>
          <img
            src={searchIcon}
            width={24}
            height={24}
            alt=""
            className="ml-4"
          />
          <input
            type="text"
            placeholder="Search"
            onChange={e => {
              onSearch(e.target.value);
            }}
          />
        </Search>
        <Filter>
          <div
            ref={refFilter}
            onClick={() => setIsFilter(true)}
            style={{ cursor: 'pointer', display: 'flex' }}
          >
            <div>Filter</div>
            <img width={24} height={24} src={arrowDownIcon} alt="" />
          </div>
          <Menu
            disableAutoFocusItem
            open={isFilter}
            anchorEl={refFilter.current}
            onClose={() => setIsFilter(false)}
            PaperProps={{
              sx: { width: 200, maxWidth: '100%', mt: 5, marginLeft: '4rem' },
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              key={'registerDate'}
              component={Button}
              sx={{ color: 'text.secondary', width: '100%' }}
              onClick={() => {
                const value: string[] = ['createdDate DESC'];
                const params = {
                  ...filter,
                  createdDate: value,
                };
                handleFilterData(params);
                setFilter({
                  ...filter,
                  createdDate: value,
                });
                setIsFilter(false);
              }}
            >
              <ListItemIcon>
                <img src={DateIcon} width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={'Register Date'}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </MenuItem>
            <MenuItem
              key={'accountStatus'}
              component={Button}
              sx={{ color: 'text.secondary', width: '100%' }}
              onClick={() => {
                const status: string[] = ['ACTIVE'];
                const params = {
                  ...filter,
                  status,
                };
                handleFilterData(params);
                setFilter({
                  ...filter,
                  status,
                });
                setIsFilter(false);
              }}
            >
              <ListItemIcon>
                <img src={UserIcon} width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={'Account Status'}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </MenuItem>
          </Menu>
        </Filter>
      </div>
      <RegisterButton
        style={{ backgroundColor: allowInteraction ? '#005fc5' : '#8D96B0' }}
        onClick={() => {
          if (allowInteraction) {
            navigate(path.createEmployeeAccountByAdmin);
          }
        }}
      >
        {t(translations.employManagement.registerNewEmployee)}
      </RegisterButton>
    </RootContainer>
  );
}
