import moment from 'moment';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Row } from './index';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { historyLogsSlice } from './slice/selectors';
import classNames from 'classnames';
import { HistoryLogsParams } from './slice/types';
import { useHistoryLogsSlice } from './slice';
import Spinner from 'app/components/Spinner';
import { VerificationStatusResponse } from '../../../PreKprVerification/types';

interface Props {
  customerInfo?: VerificationStatusResponse;
}

const HistoryPopup = ({ customerInfo }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { watch, control } = useForm();
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const historyLogsActions = useHistoryLogsSlice().actions;
  const { historyLogsByTime, isLoading } = useSelector(historyLogsSlice);

  const dateValidationError = () => {
    if (endDate && startDate && moment(startDate).isAfter(endDate, 'date')) {
      return (
        <p className="text-[#FF0000] text-[14px]">
          Start date must be before End date
        </p>
      );
    }

    if (
      startDate &&
      !(startDate instanceof Date && !isNaN(startDate.getTime()))
    ) {
      return (
        <p className="text-[#FF0000] text-[14px]">
          {t(translations.common.invalidStartDate)}
        </p>
      );
    }
    if (endDate && !(endDate instanceof Date && !isNaN(endDate.getTime()))) {
      return (
        <p className="text-[#FF0000] text-[14px] pl-4">
          {t(translations.common.invalidEndDate)}
        </p>
      );
    }
    return <div />;
  };

  const getData = (params?: HistoryLogsParams) => {
    const payload = {
      ...params,
      objectUuid:
        customerInfo &&
        customerInfo?.account &&
        customerInfo?.account?.userUuid,
      orders: 'createdDate desc',
    };
    dispatch(historyLogsActions.getHistoryLogsByTime(payload));
  };

  useEffect(() => {
    if (
      !startDate ||
      !endDate ||
      moment(startDate).isAfter(endDate, 'date') ||
      moment(endDate).isBefore(startDate, 'date') ||
      !(startDate instanceof Date && !isNaN(startDate.getTime())) ||
      !(endDate instanceof Date && !isNaN(endDate.getTime()))
    )
      return;
    const eventDateFrom = moment(startDate).startOf('day');
    const eventDateTo = moment(endDate).endOf('day');
    const params = {
      eventDateFrom: Number(eventDateFrom),
      eventDateTo: Number(eventDateTo),
    };
    getData(params);
  }, [startDate, endDate]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="px-8 border-b border-b-[#D7E2EE]">
      <div className="flex items-center">
        <div className="flex items-center">
          <p className="mr-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
            {t(translations.kprProgram.startDate).toUpperCase()}
          </p>
          <ControlledDatePicker
            name="startDate"
            label="dd/mm/yyyy"
            control={control}
            className="mr-2"
          />
        </div>

        <div className="flex items-center ">
          <div className="mr-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
            -
          </div>
          <p className="mr-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
            {t(translations.kprProgram.endDate).toUpperCase()}
          </p>
          <ControlledDatePicker
            name="endDate"
            label="dd/mm/yyyy"
            control={control}
            className="mr-2"
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        {dateValidationError()}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full py-8">
          <Spinner />
        </div>
      ) : (
        <>
          {historyLogsByTime && historyLogsByTime.length > 0 && (
            <div className="ml-[64px] mt-10 pb-8 overflow-y-auto scrollbar max-h-[400px]">
              {historyLogsByTime.map((item, idx) => (
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

          {historyLogsByTime && historyLogsByTime.length === 0 && (
            <div className="text-center text-[#6B7A99] text-[16px] leading-[20px] font-medium py-6">
              {t(translations.components.table.noDataFound)}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryPopup;
