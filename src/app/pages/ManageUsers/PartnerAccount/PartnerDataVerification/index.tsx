import path from 'app/routes/path';
import backIcon from 'assets/icons/back-blue.svg';
import { translations } from 'locales/translations';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import DataSummary from './components/DataSummary';
import Header from './components/Header';
import Table from './components/Table';
import { usePartnerInformationSlice } from './slice';

function PartnerDataVerification() {
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation();
  const { id } = params;
  const { actions } = usePartnerInformationSlice();
  const dispatch = useDispatch();
  const methods = useForm({ mode: 'onChange' });
  const [isLoading, setIsLoading] = useState(true);

  const handleClickBack = () => {
    navigate(path.partnerAccountList);
  };

  React.useEffect(() => {
    if (!id) return;
    dispatch(actions.getKycVerificationData(id, setIsLoading));
    dispatch(actions.getPartnerInformation(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="w-full px-6 py-4 bg-[#f0f4f9]">
      <div className="mb-6 flex items-center">
        <div
          className="py-[10px] px-6 text-[#005FC5] leading-7 cursor-pointer bg-white rounded-lg flex items-center mr-6"
          onClick={handleClickBack}
        >
          <img src={backIcon} width={16} height={16} className="mr-2" alt="" />
          <p className="font-semibold">{t(translations.common.back)}</p>
        </div>
        <Header />
      </div>
      <DataSummary />
      <FormProvider {...methods}>
        <form className="w-full">
          <Table isLoading={isLoading} />
        </form>
      </FormProvider>
    </div>
  );
}

export default PartnerDataVerification;
