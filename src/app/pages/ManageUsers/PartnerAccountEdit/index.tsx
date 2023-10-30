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
import PartnerInformationEdit from './Component/PartnerInformationEdit';
import KYCEdit from './Component/KYCEdit';
import DocumentQualificationEdit from './Component/DocumentQualificationEdit';
import HistoryLog from '../PartnerInfomation/Component/HistoryLog';
import { FormProvider, useForm } from 'react-hook-form';
import moment from 'moment';

import Spinner from 'assets/loader/spinner.svg';
import { usePartnerInformationSlice } from '../PartnerInfomation/Component';
import { selectPartnerInformationDetail } from '../PartnerInfomation/Component/selectors';
import Notifier from '../../Notifier';
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

const PartnerAccountEdit = React.memo(() => {
  const methods = useForm({
    mode: 'onChange',
  });
  const { actions } = usePartnerInformationSlice();
  const { partnerInformation, isLoading } = useSelector(
    selectPartnerInformationDetail,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(0);
  const [disableButton, setDisabledButton] = useState<boolean>(false);

  const links = React.useMemo(
    () => [
      { title: t(translations.common.manageUsers), path: path.manageUsers },
      { title: 'Partner Information Edit', path: path.updatePartnerAccount },
      { title: partnerInformation?.kyc?.fullName },
    ],
    [partnerInformation, t],
  );

  const sidebar = React.useMemo(
    () => [
      {
        key: 0,
        title: 'Account Information',
        component: <AccountInformationEdit info={partnerInformation} />,
      },
      {
        key: 1,
        title: 'Partner Information',
        component: <PartnerInformationEdit />,
      },
      {
        key: 2,
        title: 'KYC',
        component: <KYCEdit />,
      },
      {
        key: 3,
        title: 'Document Qualification',
        component: <DocumentQualificationEdit />,
      },
      {
        key: 4,
        title: 'History Log',
        component: <HistoryLog />,
      },
    ],
    [partnerInformation],
  );

  useEffect(() => {
    if (!id) return;
    dispatch(actions.getPartnerInformation(id, () => navigate('/404')));
  }, [id]);

  useEffect(() => {
    methods.reset({
      email: partnerInformation?.email,

      companyPhone: partnerInformation?.company?.phone,
      companyName: partnerInformation?.company?.name,
      companyAddress: partnerInformation?.company?.address,
      companyEmail: partnerInformation?.company?.email,

      kycName: partnerInformation?.kyc?.fullName,
      kycPhone: partnerInformation?.kyc?.phone,
      dob: moment(partnerInformation?.kyc?.dob, 'yyyy-MM-DD').toDate(),
      nik: partnerInformation?.kyc?.nik,

      fileDeedOfCompany:
        partnerInformation?.documentQualification?.fileDeedOfCompany &&
        partnerInformation?.documentQualification?.fileDeedOfCompany[0],
      fileNIP:
        partnerInformation?.documentQualification?.fileNIP &&
        partnerInformation?.documentQualification?.fileNIP[0],
      fileNpwp:
        partnerInformation?.documentQualification?.fileNpwp &&
        partnerInformation?.documentQualification?.fileNpwp[0],
      fileSK:
        partnerInformation?.documentQualification?.fileSK &&
        partnerInformation?.documentQualification?.fileSK[0],
      fileNda:
        partnerInformation?.documentQualification?.fileNda &&
        partnerInformation?.documentQualification?.fileNda[0],
      fileMou:
        partnerInformation?.documentQualification?.fileMou &&
        partnerInformation?.documentQualification?.fileMou[0],
    });
  }, [partnerInformation]);

  React.useEffect(() => {
    const _error = Object.keys(methods.formState.errors);
    if (_error.length > 0) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [methods.formState]);

  const onCancel = () => {
    navigate('/manage-users/partner');
  };

  const onSubmit = (data: any) => {
    if (!id) return;
    const payload = {
      ...partnerInformation,
      email: partnerInformation?.email,
      kyc: {
        ...partnerInformation?.kyc,
        fullName: data?.kycName,
        phone: data?.kycPhone,
        dob: moment(data?.dob).format('yyyy-MM-DD'),
        nik: data?.nik,
      },
      company: {
        ...partnerInformation?.company,
        name: data?.companyName,
        address: data?.companyAddress,
        phone: data?.companyPhone,
        email: data?.companyEmail,
      },
      documentQualification: {
        ...partnerInformation?.documentQualification,
        fileDeedOfCompany: [data.fileDeedOfCompany],
        fileNIP: [data.fileNIP],
        fileNpwp: [data.fileNpwp],
        fileSK: [data.fileSK],
        fileNda: [data.fileNda],
        fileMou: [data.fileMou],
      },
    };
    dispatch(
      actions.updatePartnerAccountInformation(
        payload,
        () => {
          Notifier.addNotifySuccess({
            messageId: 'partnerManagement.updateSuccess',
          });
          dispatch(actions.getPartnerInformation(id));
        },
        () => {
          Notifier.addNotifyError({
            messageId: 'partnerManagement.updateFailed',
          });
        },
      ),
    );
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

export default PartnerAccountEdit;
