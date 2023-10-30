import React, { useRef } from 'react';

import searchIcon from 'assets/icons/search.svg';
import arrowDownIcon from 'assets/icons/arrow-down.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import path from 'app/routes/path';
import DialogAction from 'app/components/DialogAction';

import { DropItem } from '../slice/types';

import SearchByDropdown from './SearchByDropdown';

import iconHeadQuarter from 'assets/images/icon_agent.svg';

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
  background-color: #ffdd00;
  border-radius: 8px;
`;

const DownloadButton = styled.button`
  padding: 10px 22px;
  line-height: 28px;
  border: 0.5px solid #c6d7e0;
  font-weight: 600;
  margin-right: 32px;
  background-color: #fff;
  border-radius: 8px;
`;

const CustomDescriptionDialog = styled.div``;

const Title = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const Block = styled.div`
  width: 121px;
  height: 138px;
  background: #f6f8fc;
  // border: 1.5px solid #005FC5;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const TitleBlock = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #223250;
  text-align: center;
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
  const [openPopupRegister, setOpenPopupRegister] =
    React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<string>('');

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      onChangeSearchInput(e.target.value);
    }, 300);
  };

  const handleShowPopup = () => {
    setOpenPopupRegister(true);
  };

  const handleRedirect = () => {
    if (selected === 'headquarter') {
      navigate(path.createHqBankAccount);
    } else {
      navigate(path.createBranchBankAccount);
    }
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
      <DownloadButton>Download CSV</DownloadButton>
      <RegisterButton onClick={handleShowPopup}>
        Register New Bank
      </RegisterButton>
      <DialogAction
        openDialog={openPopupRegister}
        onCloseDialog={() => setOpenPopupRegister(false)}
        title={'Business Organization'}
        description={
          <CustomDescriptionDialog>
            <Title>
              {'Select the type of business organization you want to register'}
            </Title>
            <Wrapper>
              <Block
                onClick={() => setSelected('headquarter')}
                style={{
                  border:
                    selected === 'headquarter' ? '1.5px solid #005FC5' : '',
                }}
              >
                <div>
                  <img src={iconHeadQuarter} />
                </div>
                <TitleBlock>{'Headquarter'}</TitleBlock>
              </Block>
              <Block
                onClick={() => setSelected('branch')}
                style={{
                  border: selected === 'branch' ? '1.5px solid #005FC5' : '',
                }}
              >
                <div>
                  <img src={iconHeadQuarter} />
                </div>
                <TitleBlock>{'Branch'}</TitleBlock>
              </Block>
            </Wrapper>
          </CustomDescriptionDialog>
        }
        onConfirm={handleRedirect}
        titleButtonConfirm={'Continue'}
        maxWidth={'sm'}
      />
    </RootContainer>
  );
}
