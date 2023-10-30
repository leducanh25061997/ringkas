import arrowDownIcon from 'assets/icons/arrow-down.svg';
import searchIcon from 'assets/icons/search.svg';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { SearchKeyType } from './types';
import SearchByDropdown from './SearchByDropdown';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

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
  padding-inline: 22px;
  height: 48px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
  color: white;
`;

const DownloadButton = styled.button`
  padding-inline: 22px;
  height: 48px;
  line-height: 28px;
  border: 0.5px solid #c6d7e0;
  font-weight: 600;
  margin-right: 32px;
  border-radius: 8px;
`;

interface Props {
  searchBy?: SearchKeyType;
  onChangeSearchBy: (value: SearchKeyType) => void;
  onChangeSearchInput: (keyword: string) => void;
  onClickRegister: () => void;
  allowInteraction: boolean;
}

export default function FilterBar(props: Props) {
  const {
    searchBy,
    onChangeSearchBy,
    onChangeSearchInput,
    onClickRegister,
    allowInteraction,
  } = props;

  const { t } = useTranslation();

  const timeoutId = useRef<ReturnType<typeof setTimeout>>();

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
          placeholder={t(translations.common.search)}
          onChange={handleChangeSearchInput}
        />
      </Search>
      <Filter>
        <span>{t(translations.common.filter)}</span>
        <img width={24} height={24} src={arrowDownIcon} alt="" />
      </Filter>
      <DownloadButton
        style={{
          backgroundColor: allowInteraction ? '#fff' : '#8D96B0',
          color: allowInteraction ? 'inherit' : '#fff',
        }}
      >
        {t(translations.common.downloadCsv)}
      </DownloadButton>
      <RegisterButton
        style={{ backgroundColor: allowInteraction ? '#005fc5' : '#8D96B0' }}
        onClick={_ => {
          if (allowInteraction) onClickRegister();
        }}
      >
        {t(translations.customerList.registerNewCustomer)}
      </RegisterButton>
    </RootContainer>
  );
}
