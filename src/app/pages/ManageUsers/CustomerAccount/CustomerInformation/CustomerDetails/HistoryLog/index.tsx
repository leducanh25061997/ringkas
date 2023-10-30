import classNames from 'classnames';
import Dialog from 'app/components/Dialog';
import * as React from 'react';
import { useEffect } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import HistoryPopup from './HistoryPopup';
import { useDispatch, useSelector } from 'react-redux';
import { historyLogsSlice } from './slice/selectors';
import Spinner from 'app/components/Spinner';
import moment from 'moment';
import { useParams } from 'react-router';
import { useHistoryLogsSlice } from './slice';
import { HistoryLogsParams } from './slice/types';
import { exportFile } from 'utils/commonFunction';
import { VerificationStatusResponse } from '../../../PreKprVerification/types';
import Notifier from '../../../../../Notifier';

interface RowProps {
  className?: string;
  date: number;
  eventAction: string;
  dotBg?: string;
}

interface Props {
  customerInfo?: VerificationStatusResponse;
}

export const Row = ({ className, eventAction, date, dotBg }: RowProps) => {
  const day = moment(date).local().format('DD/MM/YYYY');
  const time = moment(date).local().format('HH:mm');

  return (
    <div className={className}>
      <div
        className={classNames(
          'w-[14px] h-[14px] rounded-[50px] mr-12 relative',
          dotBg,
        )}
      >
        <div className="w-[2px] h-[68px] bg-[#D7E2EE] absolute top-[14px] left-1/2 -translate-x-1/2" />
      </div>
      <div>
        <p className="text-[#223250] text-[16px] leading-[22px] font-bold">
          {day} | {time}
        </p>
        <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mt-2">
          {eventAction}
        </p>
      </div>
    </div>
  );
};

const HistoryLog = ({ customerInfo }: Props) => {
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;
  const [open, setOpen] = React.useState(false);
  const { historyLogs, isLoading } = useSelector(historyLogsSlice);

  const historyLogsActions = useHistoryLogsSlice().actions;
  const dispatch = useDispatch();

  const exportCsv = () => {
    const payload = {
      objectUuid:
        customerInfo &&
        customerInfo?.account &&
        customerInfo?.account?.userUuid,
      orders: 'createdDate desc',
    };

    dispatch(
      historyLogsActions.downloadCsv(
        payload,
        res => {
          exportFile(res, 'history-logs.csv');
          Notifier.addNotifySuccess({ messageId: 'success.downloadSuccess' });
        },
        () => {
          Notifier.addNotifyError({ messageId: 'error.anErrorOccurred' });
        },
      ),
    );
  };

  const getData = () => {
    const payload = {
      page: 0,
      size: 2,
      objectUuid:
        customerInfo &&
        customerInfo?.account &&
        customerInfo?.account?.userUuid,
      orders: 'createdDate desc',
    };
    dispatch(historyLogsActions.getHistoryLogs(payload));
  };

  useEffect(() => {
    if (!customerInfo?.account?.userUuid) return;
    getData();
  }, [customerInfo?.account?.userUuid]);

  return (
    <div className="bg-[#fff] rounded-[16px] h-full flex flex-col h-[224px]">
      <div className="pt-6 px-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#223250] text-[20px] leading-[24px] font-bold">
            {t(translations.common.historyLog)}
          </p>
          <p className="view-all text-center" onClick={() => setOpen(true)}>
            {t(translations.common.viewAll)}
          </p>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        ) : (
          <>
            {historyLogs && historyLogs.length > 0 && (
              <div className="ml-24 max-h-[193px] pb-6 overflow-hidden">
                {historyLogs.map((item, idx) => (
                  <Row
                    key={idx}
                    className={classNames('flex', { 'mt-8': idx !== 0 })}
                    dotBg={idx === 0 ? 'bg-[#009CE0]' : 'bg-[#D7E2EE]'}
                    date={item.eventDate}
                    eventAction={item.eventName}
                  />
                ))}
              </div>
            )}
            {historyLogs && historyLogs.length === 0 && (
              <div className="text-center text-[#6B7A99] text-[16px] leading-[20px] font-medium py-6">
                {t(translations.components.table.noDataFound)}
              </div>
            )}
          </>
        )}
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={() => {
          exportCsv();
        }}
        title={t(translations.common.historyLog)}
        submitTitle={t(translations.common.download)}
      >
        <HistoryPopup customerInfo={customerInfo} />
      </Dialog>
    </div>
  );
};

export default HistoryLog;
