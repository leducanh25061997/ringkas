import React, { useEffect, useState } from 'react';
import { Dialog, Grid } from '@mui/material';
import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import CustomTabs from 'app/components/CustomTabs';
import styled from 'styled-components';

import AccountInformationEdit from './Component/AccountInformationEdit';
import BranchInformationEdit from './Component/BranchInformationEdit';
import KYCEdit from './Component/KYCEdit';
import HistoryLog from '../BankInformation/Component/HistoryLog';
import { useBankAccountInfoSlice } from '../BankAccount/HQBankPartnerManagement/HQBankAccountInformation/slice';
import { selectBankAccountInfo } from '../BankAccount/HQBankPartnerManagement/HQBankAccountInformation/slice/selectors';
import { FormProvider, useForm } from 'react-hook-form';
import moment from 'moment';
import { DropdownItem } from 'app/components/DropdownInput/type';

import Spinner from 'assets/loader/spinner.svg';
import { axiosClient } from '../../../../services/api/axios';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

const ActionButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  background: #fff;
  padding: 12px 32px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  line-height: 28px;
  font-weight: 600;
  background: ${props => (props.disabled ? '#f3f3f3' : 'rgba(255, 204, 4, 1)')};
  border-radius: 8px;
  color: #000;
  width: 128px;
`;

const CancelButton = styled.div`
  width: 128px;
  padding: 10px 22px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
  color: #000;
  border: 1px solid #000;
  background: #ffffff;
  margin-right: 32px;
  text-align: center;
  cursor: pointer;
`;

const BankBranchEdit = React.memo(() => {
  const methods = useForm({
    mode: 'onChange',
  });
  const { actions } = useBankAccountInfoSlice();
  const { hqBankAccountInfo, isLoading } = useSelector(selectBankAccountInfo);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [step, setStep] = useState<number>(0);
  const [disableButton, setDisabledButton] = useState<boolean>(false);
  const [options, setOptions] = useState<DropdownItem[]>([]);

  const links = React.useMemo(
    () => [
      { title: t(translations.common.manageUsers), path: path.manageUsers },
      { title: 'Bank Branch Edit', path: path.updateBankBranchAccount },
      { title: hqBankAccountInfo?.kyc?.fullName },
    ],
    [hqBankAccountInfo, t],
  );

  const sidebar = React.useMemo(
    () => [
      {
        key: 0,
        title: 'Account Information',
        component: <AccountInformationEdit info={hqBankAccountInfo} />,
      },
      {
        key: 1,
        title: 'Branch Information',
        component: <BranchInformationEdit />,
      },
      {
        key: 2,
        title: 'KYC',
        component: <KYCEdit />,
      },
      {
        key: 3,
        title: 'History Log',
        component: <HistoryLog />,
      },
    ],
    [hqBankAccountInfo],
  );

  useEffect(() => {
    if (!id) return;
    dispatch(actions.fetchBankAccountInfo(id, () => navigate('/404')));
  }, [id]);

  const findHQ = () => {
    axiosClient
      .get('/console/bank-hq-accounts')
      .then(res => {
        setOptions(
          res.data.data.map((item: any) => ({
            label: item.company.name,
            value: item.userUuid,
          })),
        );
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    findHQ();
  }, []);

  useEffect(() => {
    const hq = options.find((item: any) =>
      item.value.includes(hqBankAccountInfo?.company?.parentAccountUserUuid),
    );
    methods.reset({
      email: hqBankAccountInfo?.email,

      fullName: hqBankAccountInfo?.kyc.fullName,
      phone: hqBankAccountInfo?.kyc.phone,
      dob: moment(hqBankAccountInfo?.kyc?.dob, 'yyyy-MM-DD').toDate(),
      fileNik: hqBankAccountInfo?.kyc?.fileNik,
      fileSignature: hqBankAccountInfo?.kyc?.fileSignature,
      nik: hqBankAccountInfo?.kyc?.nik,

      name: hqBankAccountInfo?.company?.name,
      branchName: hqBankAccountInfo?.company?.branchName,
      province: {
        label: hqBankAccountInfo?.company?.province,
        value: hqBankAccountInfo?.company?.province,
      },
      city: {
        label: hqBankAccountInfo?.company?.city,
        value: hqBankAccountInfo?.company?.city,
      },
      parentAccountUserUuid: {
        label: hq?.label,
        value: hq?.value,
      },
      address: hqBankAccountInfo?.company?.address,
      nip: hqBankAccountInfo?.company?.nip,
      titleBranch: hqBankAccountInfo?.company?.titleBranch,

      bankAccountType: hqBankAccountInfo?.bankAccountType,
    });
  }, [hqBankAccountInfo, options]);

  React.useEffect(() => {
    const _error = Object.keys(methods.formState.errors);
    if (_error.length > 0) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [methods.formState]);

  const onCancel = () => {
    navigate('/manage-users/bank');
  };

  const onSubmit = (data: any) => {
    const payload = {
      ...hqBankAccountInfo,
      email: hqBankAccountInfo?.email,
      kyc: {
        ...hqBankAccountInfo?.kyc,
        fullName: data?.fullName,
        phone: data?.phone,
        dob: moment(data?.dob).format('yyyy-MM-DD'),
        fileNik: data?.fileNik,
        fileSignature: data?.fileSignature,
        nik: data?.nik,
      },
      company: {
        ...hqBankAccountInfo?.company,
        name: data?.name,
        branchName: data?.branchName,
        province: data?.province.value,
        city: data?.city.value,
        address: data?.address,
        nip: data?.nip,
        titleBranch: data?.titleBranch,
        parentAccountUserUuid: data?.parentAccountUserUuid.value,
      },
      documentQualification: {
        ...hqBankAccountInfo?.documentQualification,
      },
      bankAccountType: data?.bankAccountType,
    };
    dispatch(actions.updateBankAccountInfo(payload));
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid
            sx={{
              background: '#f3f3f3',
              padding: '20px 20px 0 20px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'calc(100vh - 85px)!important',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Grid
              sx={{
                height: '100%',
                flex: 1,
                marginBottom: '20px',
                background: '#fff',
              }}
            >
              <BreadCrumbs links={links} />
              <CustomTabs sidebar={sidebar} step={step} setStep={setStep} />
            </Grid>

            <ActionButtonWrap>
              <CancelButton onClick={onCancel}>Back</CancelButton>
              <ConfirmButton disabled={disableButton} type="submit">
                Update
              </ConfirmButton>
            </ActionButtonWrap>
          </Grid>
        </form>
      </FormProvider>
      <Dialog
        open={isLoading!}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            color: 'black',
            boxShadow: 'none',
          },
        }}
      >
        <img
          src={Spinner}
          alt={''}
          style={{ width: '100px', height: '100px' }}
        />
      </Dialog>
    </>
  );
});

export default BankBranchEdit;
