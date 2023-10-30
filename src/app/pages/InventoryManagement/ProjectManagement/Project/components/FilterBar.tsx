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
  font-weight: 500;
  background-color: #005fc5;
  border-radius: 8px;
  color: white;
`;

const DownloadButton = styled.button`
  padding: 10px 22px;
  margin-right: 10px;
  line-height: 28px;
  font-weight: 600;
  background-color: #ffffff;
  border-radius: 8px;
`;

interface ValueFilter {
  status: string[];
  createdDate: string[];
  searchKeyTypes: string[];
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
    searchKeyTypes: [''],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [searchKey, setSearchKey] = useState<string>('Search By');
  const [labelFilter, setLabelFilter] = useState<string>('Filter');

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
                  width: 160,
                  maxWidth: '100%',
                  mt: 5,
                  fontWeight: 600,
                  left: '308px!important',
                },
              }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem
                key={'projectName'}
                component={Button}
                sx={{ color: 'text.secondary', width: '100%' }}
                onClick={() => {
                  setSearchKey('Project Name');
                  setIsOpen(false);
                  const searchKeyTypes: string[] = ['NAME'];
                  const params = {
                    ...filter,
                    searchKeyTypes,
                  };
                  handleFilterData(params);
                  setFilter({
                    ...filter,
                    searchKeyTypes,
                  });
                }}
              >
                <ListItemText
                  primary={'Project Name'}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                />
              </MenuItem>
              <MenuItem
                key={'yearBuild'}
                component={Button}
                sx={{ color: 'text.secondary', width: '100%' }}
                onClick={() => {
                  setSearchKey('Year Build');
                  setIsOpen(false);
                  const searchKeyTypes: string[] = ['BUILD_YEAR'];
                  const params = {
                    ...filter,
                    searchKeyTypes,
                  };
                  handleFilterData(params);
                  setFilter({
                    ...filter,
                    searchKeyTypes,
                  });
                }}
              >
                <ListItemText
                  primary={'Year Build'}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                />
              </MenuItem>
              <MenuItem
                key={'yearCompletion'}
                component={Button}
                sx={{ color: 'text.secondary', width: '100%' }}
                onClick={() => {
                  setSearchKey('Year Completion');
                  setIsOpen(false);
                  const searchKeyTypes: string[] = ['COMPLETION_YEAR'];
                  const params = {
                    ...filter,
                    searchKeyTypes,
                  };
                  handleFilterData(params);
                  setFilter({
                    ...filter,
                    searchKeyTypes,
                  });
                }}
              >
                <ListItemText
                  primary={'Year Completion'}
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
            <div>{labelFilter}</div>
            <img width={24} height={24} src={arrowDownIcon} alt="" />
          </div>
          <Menu
            disableAutoFocusItem
            open={isFilter}
            anchorEl={refFilter.current || null}
            onClose={() => setIsFilter(false)}
            PaperProps={{
              sx: {
                width: 90,
                maxWidth: '100%',
                mt: 5,
                left: '714px!important',
              },
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              key={'active'}
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
                setLabelFilter('Active');
                setIsFilter(false);
              }}
            >
              <ListItemText
                primary={'Active'}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 600,
                  textAlign: 'left',
                }}
              />
            </MenuItem>
            <MenuItem
              key={'inactive'}
              component={Button}
              sx={{ color: 'text.secondary', width: '100%' }}
              onClick={() => {
                const status: string[] = ['INACTIVE'];
                const params = {
                  ...filter,
                  status,
                };
                handleFilterData(params);
                setFilter({
                  ...filter,
                  status,
                });
                setLabelFilter('Inactive');
                setIsFilter(false);
              }}
            >
              <ListItemText
                primary={'Inactive'}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 600,
                  textAlign: 'left',
                }}
              />
            </MenuItem>
          </Menu>
        </Filter>
      </div>
      <div>
        <RegisterButton
          style={{ backgroundColor: allowInteraction ? '#005fc5' : '#8D96B0' }}
          onClick={() => {
            if (allowInteraction) {
              navigate(path.createProject);
            }
          }}
        >
          {t(translations.projectManagement.createNewProject)}
        </RegisterButton>
      </div>
    </RootContainer>
  );
}
