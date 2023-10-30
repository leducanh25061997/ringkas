import path from 'app/routes/path';
import blueArrowLeft from 'assets/icons/blue-arrow-left.svg';
import PageHeader from 'app/components/PageHeader';
import { translations } from 'locales/translations';
import Tabs from 'app/components/Tabs';
import noti from 'assets/icons/noti.svg';
import KprDetails from './KprDetails';
import BankTask from './Task/BankTask';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { useBankTaskSlice } from './Task/slice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useManageCustomerSlice } from '../../CustomerAccount/slice';
import { useCustomerInformationSlice } from '../../CustomerAccountEdit/slice';
import { useScoringReadySlice } from '../../CustomerAccount/ScoringReady/slice';
import Notifier from '../../../Notifier';

const PrintButton = styled.button`
  padding-inline: 22px;
  height: 48px;
  line-height: 28px;
  border: 0.5px solid #c6d7e0;
  font-weight: 600;
  margin-right: 24px;
  border-radius: 8px;
  min-width: 120px;
`;

const DownloadButton = styled.button`
  padding-inline: 22px;
  height: 48px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
  color: white;
  min-width: 120px;
`;

const BankTasks = () => {
  const params = useParams();
  const { actions } = useBankTaskSlice();
  const manageCustomerActions = useManageCustomerSlice().actions;
  const customerInformationActions = useCustomerInformationSlice().actions;
  const scoringActions = useScoringReadySlice().actions;
  const bankActions = useBankTaskSlice().actions;

  const dispatch = useDispatch();
  const [tabSelect, setTabSelect] = useState<string>('KPR Details');
  const { id } = params;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const links = React.useMemo(
    () => [
      {
        label: `${t(translations.common.manageUsers)}`,
        link: path.customerAccountList,
      },
      {
        label: `${t(translations.developerWorkspace.customerPipeline)}`,
        link: path.customerAccountList,
      },
    ],
    [t],
  );

  useEffect(() => {
    if (!id) return;
    dispatch(actions.getBankTasks(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(manageCustomerActions.getCustomerDetails(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(manageCustomerActions.fetchDeveloperTask(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(customerInformationActions.fetchCustomerApplicationKycDetail(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(manageCustomerActions.getCustomerPreference(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(manageCustomerActions.fetchPropertyDetail(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    dispatch(scoringActions.getScoringData(id));
  }, [id]);

  return (
    <div className="py-4 px-6">
      <div className="flex items-center mb-4 cursor-pointer">
        <div
          className="flex items-center py-[10px] px-6 bg-[#fff] rounded-[8px] mr-6"
          onClick={() => navigate(path.customerAccountList)}
        >
          <img className="h-[16px] w-[16px]" src={blueArrowLeft} alt="arrow" />
          <p className="text-[#005FC5] text-[16px] leading-[28px] font-semibold ml-2">
            {t(translations.common.back)}
          </p>
        </div>
        <PageHeader
          parentItems={links}
          title={t(translations.customerAccountManagement.bankPartnerWorkspace)}
        />
      </div>

      <Tabs
        className="mb-6"
        tabList={['KPR Details', 'Bank Task', 'Payment History']}
        onChange={setTabSelect}
        pageActive={tabSelect}
      />

      {tabSelect === 'KPR Details' && (
        <div className="flex items-center justify-between py-4 px-8 bg-[#fff] rounded-2xl mb-6">
          <div className="flex items-center">
            <img src={noti} alt="notification" />
            <p className="text-[#202A42] text-[18px] leading-[20px] font-medium ml-4">
              This button to download all files in each section
            </p>
          </div>
          <div className="flex items-center">
            <PrintButton
              style={{
                backgroundColor: '#fff',
                color: 'inherit',
              }}
              onClick={() => {
                window.print();
              }}
            >
              {t(translations.common.print)}
            </PrintButton>
            <DownloadButton
              style={{
                backgroundColor: '#005fc5',
              }}
              onClick={() => {
                if (!id) return;
                const params = {
                  applicationId: id,
                };
                // @ts-ignore
                dispatch(
                  bankActions.downloadDocsByType(
                    params,
                    () => {},
                    () => {
                      Notifier.addNotifyError({
                        messageId: 'error.anErrorOccurred',
                      });
                    },
                  ),
                );
              }}
            >
              {t(translations.common.download)}
            </DownloadButton>
          </div>
        </div>
      )}

      {tabSelect === 'KPR Details' && <KprDetails />}
      {tabSelect === 'Bank Task' && <BankTask />}
    </div>
  );
};

export default BankTasks;
