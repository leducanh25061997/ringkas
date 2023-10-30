import { ClickAwayListener } from '@mui/material';
import React, { useState } from 'react';
import arrowDownIcon from 'assets/icons/arrow-down.svg';
import styled from 'styled-components';
import classNames from 'classnames';

import { SearchKeyType } from './types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

const SearchBy = styled.div`
  padding-right: 12px;
  padding-left: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  position: relative;
  user-select: none;

  .drop-btn {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  :after {
    content: '';
    width: 1px;
    height: 28px;
    position: absolute;
    background: #c6d7e0;
    right: 0;
  }
  span {
    line-height: 28px;
    margin-right: 14px;
  }
`;

const DropItems = styled.div`
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(38, 51, 77, 0.15);
  border-radius: 15px;
  position: absolute;
  top: 49px;
  overflow: hidden;
  left: 0;
  z-index: 1;
  padding-block: 15px;
`;

const DropItem = styled.div`
  width: 100%;
  white-space: nowrap;
  cursor: pointer;
  height: 37px;
  display: flex;
  align-items: center;
  padding-inline: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #223250;
  :hover {
    background: #f8f9fa;
  }
  &.active {
    background: #f8f9fa;
  }
`;

interface Props {
  value?: SearchKeyType;
  onChange: (value: SearchKeyType) => void;
}

export default function SearchByDropdown(props: Props) {
  const { value, onChange } = props;

  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);
  const [labelSearch, setLabelSearch] = useState<string>(
    t(translations.common.searchBy),
  );

  const dropItems = [
    { label: t(translations.customerList.fullName), value: 'FULL_NAME' },
    { label: t(translations.customerList.email), value: 'EMAIL' },
    { label: t(translations.customerList.nik), value: 'NIK' },
    { label: t(translations.customerList.phoneNumber), value: 'PHONE' },
  ];

  const handleCloseDropdown = () => setOpen(false);
  const handleOpenDropdown = () => setOpen(prev => !prev);

  const handleClickDropItem = (value: SearchKeyType, label: string) => {
    setOpen(false);
    onChange(value);
    setLabelSearch(label);
  };

  return (
    <ClickAwayListener onClickAway={handleCloseDropdown}>
      <SearchBy>
        <div className="drop-btn" onClick={handleOpenDropdown}>
          <span>{labelSearch}</span>
          <img width={24} height={24} src={arrowDownIcon} alt="" />
        </div>

        {open ? (
          <DropItems>
            {dropItems.map(item => (
              <DropItem
                onClick={() =>
                  handleClickDropItem(item.value as SearchKeyType, item.label)
                }
                key={item.label}
                className={classNames({ active: item.value === value })}
              >
                {item.label}
              </DropItem>
            ))}
          </DropItems>
        ) : null}
      </SearchBy>
    </ClickAwayListener>
  );
}
