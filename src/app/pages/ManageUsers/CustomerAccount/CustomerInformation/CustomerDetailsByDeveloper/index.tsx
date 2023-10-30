import { Box, Grid } from '@mui/material';
import path from 'app/routes/path';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import backIcon from 'assets/icons/back-blue.svg';
import { translations } from 'locales/translations';
import Header from './components/Header';
import { DeveloperWorkspaceInform } from './components/DeveloperWorkspaceInform';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useManageCustomerSlice } from '../../slice';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f0f4f9;
  padding: 20px 31px 0 31px;
  & .MuiInputLabel-root {
    color: #919eab;
  }
`;

interface Props {}

const CustomerDetailsByDeveloper = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useManageCustomerSlice();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(`${path.customerAccountList}`);
  };
  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(actions.fetchHousePrice(id));
    dispatch(actions.fetchDeveloperTask(id));
    dispatch(actions.fetchPropertyDetail(id));
  }, []);
  return (
    <RootContainer>
      <Grid className="mb-6 flex items-center" container item md={12}>
        <div
          className="py-[10px] px-6 text-[#005FC5] leading-7 cursor-pointer bg-white rounded-lg flex items-center mr-6"
          onClick={handleClickBack}
        >
          <img src={backIcon} width={16} height={16} className="mr-2" alt="" />
          <p className="font-semibold">{t(translations.common.back)}</p>
        </div>
        <Header />
      </Grid>
      <DeveloperWorkspaceInform />
    </RootContainer>
  );
};

export default CustomerDetailsByDeveloper;
