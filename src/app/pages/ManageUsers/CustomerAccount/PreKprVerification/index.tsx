import PageHeader from 'app/components/PageHeader';
import Spinner from 'app/components/Spinner';
import Notifier from 'app/pages/Notifier';
import path from 'app/routes/path';
import backIcon from 'assets/icons/back-blue.svg';
import { translations } from 'locales/translations';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useManageCustomerSlice } from '../slice';
import { selectManageCustomer } from '../slice/selectors';
import DataSummary from './DataSummary';
import DataVerificationSummary from './DataVerificationSummary';
import Table from './Table';
import { VerificationLastAction } from './types';

function PreKprVerification() {
  const navigate = useNavigate();

  const { actions } = useManageCustomerSlice();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const params = useParams();

  const [openDataSummary, setOpenDataSummary] = useState(false);
  const [summaryData, setSummaryData] = useState<any>();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    dataSummary: verificationStatus,
    data: { data: verificationData },
  } = useSelector(selectManageCustomer, shallowEqual).kycVerificationData;

  useEffect(() => {
    dispatch(actions.getKycVerificationData(params.id as string, setIsLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!verificationData) return;

    // reset data form
    const _data: Record<string, any> = {};
    for (let i = 0; i < verificationData.length; i++) {
      _data[`note-${i}`] = verificationData[i].actionNote;
      _data[`type-${i}`] =
        verificationData[i].status === 'REQUEST_UPDATE'
          ? {
              label: t(translations.dataVerification.requestRevision),
              value: 'REQUEST_REVISION',
            }
          : {
              label: t(translations.dataVerification.noActionNeeded),
              value: 'NO_ACTION_NEEDED',
            };
    }
    methods.reset(_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationData]);

  const methods = useForm({ mode: 'onChange' });
  const handleClickBack = () => {
    navigate(path.customerAccountList);
  };

  const handleCancelProcess = () => {
    setOpenDataSummary(false);
    setSummaryData(undefined);
  };

  const handleClickProcess = () => {
    methods.handleSubmit(values => {
      const _data = [];

      // make correct data to send to server
      for (const key of Object.keys(values)) {
        if (key.split('-')[0] !== 'type') continue;
        const index = +key.split('-')[1];

        const row = verificationData[index];
        const action: keyof typeof VerificationLastAction = values[key].value;
        _data.push({
          category: row.category,
          key: row.key,
          action,
          values:
            action === 'EDITED_BY_ADMIN'
              ? [values[`edit-${index}`]]
              : undefined,
          actionNote:
            action === 'REQUEST_REVISION' ? values[`note-${index}`] : undefined,
        });
      }

      setSummaryData(_data);
      setOpenDataSummary(true);
    })();
  };

  const handleVerifyData = () => {
    if (!summaryData || isVerifying) return;
    setIsVerifying(true);
    dispatch(
      actions.updateVerification(
        {
          applicationId: params.id as string,
          data: summaryData,
        },
        () => {
          setIsVerifying(false);
          setOpenDataSummary(false);
          Notifier.addNotifySuccess({
            message: t(translations.dataVerification.dataIsBeingProcess),
          });
          navigate(path.customerAccountList);
        },
        (message: string) => {
          setIsVerifying(false);
          Notifier.addNotifyError({ message });
        },
      ),
    );
  };

  return (
    <FormProvider {...methods}>
      <form className="w-full px-6 py-4 min-h-[calc(100vh-85px)]">
        <div className="mb-6 flex items-center">
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
            <p className="font-semibold">Back</p>
          </div>
          <PageHeader
            title={t(translations.dataVerification.pageTitle)}
            parentItems={[
              {
                label: t(translations.dataVerification.manageUser),
                link: path.customerAccountList,
              },
              {
                label: t(translations.sidebar.customerPipeline),
                link: path.customerAccountList,
              },
            ]}
          />
        </div>
        <DataSummary isLoading={isLoading} />

        <div className="mt-4 rounded-2xl bg-white flex flex-col">
          <h2 className="pt-6 pl-6 font-bold text-[#202A42] text-[18px] leading-[25px]">
            {t(translations.dataVerification.preKprDataVerification)}
          </h2>
          {isLoading && (
            <div className="w-full h-[700px] flex pt-[200px] justify-center">
              <Spinner />
            </div>
          )}
          {(verificationStatus?.applicationStatus === 'DATA_READY' ||
            verificationStatus?.applicationStatus === 'KYC_RETURNED') && (
            <Table
              data={verificationData}
              verificationStatus={verificationStatus?.applicationStatus}
            />
          )}
          {verificationStatus?.applicationStatus === 'DATA_READY' && (
            <div className="flex justify-end items-center h-[75px] px-6">
              <button
                className="w-[140px] h-[48px] text-white bg-[#005FC5] font-medium rounded-lg"
                type="button"
                onClick={handleClickProcess}
              >
                {t(translations.common.process)}
              </button>
            </div>
          )}
        </div>
      </form>
      <DataVerificationSummary
        data={summaryData}
        open={openDataSummary}
        onClose={handleCancelProcess}
        onSubmit={handleVerifyData}
      />
    </FormProvider>
  );
}

export default PreKprVerification;
