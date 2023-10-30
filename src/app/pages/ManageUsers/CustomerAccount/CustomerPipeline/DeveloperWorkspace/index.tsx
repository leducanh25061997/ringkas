import { Grid } from '@mui/material';
import path from 'app/routes/path';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import backIcon from 'assets/icons/back-blue.svg';
import { translations } from 'locales/translations';
import Header from './components/Header';
import { DeveloperWorkspaceInform } from './components/DeveloperWorkspaceInform';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useManageCustomerSlice } from '../../slice';
import CustomerSummary from '../../CustomerInformation/CustomerDetails/CustomerSummary';
import DataSummary from './components/DataSummary';
import { Footer } from './components/Footer';
import { useForm } from 'react-hook-form';
import { KPRSummaryUpdate } from 'types/DeveloperAccountManagement';
import Notifier from 'app/pages/Notifier';
import BankPreferenceDialog from './components/BankPreferenceDialog';
import { BankPreferenceFormType, BanksForm } from 'types/CustomerManagement';
import { selectManageCustomer } from '../../slice/selectors';
import { VerificationStatusResponse } from '../../PreKprVerification/types';
import { axiosClient } from 'services/api/axios';
import { useSlikDetailsSlice } from '../../CustomerInformation/SlikDetails/slice';
import { useScoringReadySlice } from '../../ScoringReady/slice';
import UpdateStatusDialog from 'app/components/UpdateStatusDialog';
import { CustomerDetails } from '../../slice/types';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f0f4f9;
  padding: 20px 31px 0 31px;
  & .MuiInputLabel-root {
    color: #919eab;
  }
  margin-bottom: 6rem;
`;

interface Props {}

const DeveloperWorkspace = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useManageCustomerSlice();
  const scoringActions = useScoringReadySlice().actions;
  const slikActions = useSlikDetailsSlice().actions;
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [valueTab, setValueTab] = useState<string>('1');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdateBank, setIsUpdateBank] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { bankPreference } = useSelector(selectManageCustomer);
  const handleClickBack = () => {
    navigate(`${path.customerAccountList}`);
  };
  const [customerInfo, setCustomerInfo] =
    React.useState<VerificationStatusResponse>();

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(actions.fetchHousePrice(id));
    dispatch(actions.fetchDeveloperTask(id));
    dispatch(actions.fetchBankPreference(id));
    dispatch(actions.fetchPropertyDetail(id));

    dispatch(slikActions.getSlikDetails(id));
    dispatch(scoringActions.getScoringData(id));

    setIsLoading(true);
    axiosClient
      .get(`/customer/application/${id}`)
      .then(res => {
        setIsLoading(false);
        setCustomerInfo(res.data);
      })
      .catch(e => {
        setIsLoading(false);
        setCustomerInfo(undefined);
      });
  }, []);

  const formMethod1 = useForm({ mode: 'onChange' });
  const handleBack = () => {
    setOpenDialog(true);
    // navigate(`${path.customerAccountList}`);
  };
  const handleSubmit = () => {
    if (valueTab === '1') {
      const formValue1 = formMethod1.getValues();
      !formValue1.projectName &&
        formMethod1.setError('projectName', {
          message: t(translations.createProductError.pleaseEnterRequiredFields),
        });
      if (formValue1.housePrice) {
        setIsError(false);
      } else {
        setIsError(true);
      }
      const data: KPRSummaryUpdate = {
        property: {
          propertyId: formValue1.propertyId,
          projectId: formValue1.projectName?.value,
          type: formValue1.projectType?.value,
          unit: formValue1.unit?.label,
          cluster: formValue1.cluster?.value,
          pricing: {
            housePrice: formValue1.housePrice,
            bookingFee: formValue1.bookingFee,
            discount: formValue1.discount,
            downPaymentPercentage: formValue1.downPayment,
          },
          id,
        },
        pricing: {
          housePrice: formValue1.housePrice,
          bookingFee: formValue1.bookingFee,
          discount: formValue1.discount,
          downPayment: formValue1.downPayment,
          id: formValue1.id,
        },
      };
      if (formValue1.projectName && formValue1.housePrice) {
        setIsLoading(true);
        dispatch(
          actions.changeNewProperty(
            data,
            () => {
              setIsLoading(false);
              bankPreference?.banks &&
                bankPreference?.banks.length < 5 &&
                setIsUpdateBank(true);
            },
            error => {
              Notifier.addNotifyError({
                messageId: 'error.anErrorOccurred',
              });
              setIsLoading(false);
            },
          ),
        );
      }
    } else {
      setIsUpdateBank(true);
    }
  };
  const handleUpdateBank = (data: BanksForm[]) => {
    const newData: BanksForm[] = [];
    data.map((bank: BanksForm, index: number) => {
      const newBank: BanksForm = {
        bankUuid: bank.bankInfo?.value?.toString(),
        priority: index + 1,
      };
      newData.push(newBank);
    });
    const body: BankPreferenceFormType = {
      id,
      banks: newData,
    };
    setIsLoading(true);
    dispatch(
      actions.updateBankPreference(
        body,
        () => {
          setIsLoading(false);
          setIsUpdateBank(false);
        },
        error => {
          Notifier.addNotifyError({
            messageId: 'error.anErrorOccurred',
          });
          setIsLoading(false);
        },
      ),
    );
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDecline = () => {
    id &&
      dispatch(
        actions.developerDeclineApplication(id, (data?: CustomerDetails) => {
          setOpenDialog(false);
          if (data) {
            Notifier.addNotifySuccess({
              messageId: 'success.declineSuccess',
            });
            navigate(`${path.customerAccountList}`);
          } else {
            Notifier.addNotifyError({
              messageId: 'error.anErrorOccurred',
            });
          }
        }),
      );
  };
  const canStartAssistKPR = (stage?: string) =>
    stage === 'KPR' || stage === 'POST_KPR';
  const isKycVerified = canStartAssistKPR;

  return (
    <div>
      <RootContainer>
        <Grid className="mb-6 flex items-center" container item md={12}>
          <div
            className="py-[10px] px-6 text-[#005FC5] leading-7 cursor-pointer bg-white rounded-lg flex items-center mr-6"
            onClick={handleClickBack}
          >
            <img
              src={backIcon}
              width={16}
              height={16}
              className="mr-2"
              alt=""
            />
            <p className="font-semibold">{t(translations.common.back)}</p>
          </div>
          <Header />
        </Grid>
        <DataSummary />
        <DeveloperWorkspaceInform
          setValueTab={setValueTab}
          valueTab={valueTab}
          formMethod={formMethod1}
          isError={isError}
        />
        <Grid item xs={12}>
          <CustomerSummary
            predefinedAssessmentValues={{
              eKYC: isKycVerified(customerInfo?.applicationState)
                ? t(translations.verificationStatus.VERIFIED)
                : t(translations.verificationStatus.UNVERIFIED),
            }}
          />
        </Grid>
      </RootContainer>
      <UpdateStatusDialog
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
        title={t(translations.common.declineApplication)}
        description={t(translations.common.areYouSureDecline)}
        onConfirm={handleDecline}
        titleButtonConfirm={'Update'}
        maxWidth={'xs'}
        cancelText={t(translations.common.cancel)}
        confirmText={t(translations.common.decline)}
      />
      <Footer
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <BankPreferenceDialog
        setOpen={setIsUpdateBank}
        open={isUpdateBank}
        onConfirm={handleUpdateBank}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DeveloperWorkspace;
