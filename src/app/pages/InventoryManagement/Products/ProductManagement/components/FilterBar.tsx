import React, { useRef } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

import searchIcon from 'assets/icons/search.svg';
import arrowDownIcon from 'assets/icons/arrow-down.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import path from 'app/routes/path';

import SearchByDropdown from './SearchByDropdown';
import { Link } from 'react-router-dom';

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
  color: #fff;
  width: 232px;
`;

const BulkUpload = styled(Link)`
  text-align: center;
  padding: 10px 22px;
  line-height: 28px;
  border: 0.5px solid #005fc5;
  font-weight: 600;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 8px;
  color: #005fc5 !important;
  width: 232px;
`;

interface Props {
  searchBy?: any;
  onChangeSearchBy: (value: any) => void;
  onChangeSearchInput: (keyword: string) => void;
  allowInteraction: boolean;
}

export default function FilterBar(props: Props) {
  const { searchBy, onChangeSearchBy, onChangeSearchInput, allowInteraction } =
    props;
  const timeoutId = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      onChangeSearchInput(e.target.value);
    }, 300);
  };
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
      <div>
        <BulkUpload
          to={allowInteraction ? path.productBulkUpload : '#'}
          style={{
            backgroundColor: allowInteraction ? '#fff' : '#8D96B0',
          }}
        >
          {t(translations.kprProgram.bulkUpload)}
        </BulkUpload>
        <RegisterButton
          style={{ backgroundColor: allowInteraction ? '#005fc5' : '#8D96B0' }}
          onClick={() => {
            if (allowInteraction) {
              navigate(path.createProduct);
            }
          }}
        >
          {t(translations.productManagement.createNewProduct)}
        </RegisterButton>
      </div>
    </RootContainer>
  );
}
