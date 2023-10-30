import * as React from 'react';
import ApprovedDetail from './ApprovedDetail';
import RejectedDetail from './RejectedDetail';
import { BankTaskItem } from '../slice/type';
import classNames from 'classnames';
import tickBlue from 'assets/icons/tick-blue.svg';
import rejected from 'assets/icons/rejected.svg';
import { capitalize } from 'lodash';
import moment from 'moment';

interface Props {
  info: BankTaskItem;
}

const BankTaskDetail = ({ info }: Props) => {
  const value = info.createdDate;
  const diff = Math.floor((new Date().getTime() - value) / 1000);
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff - hours * 3600) / 60);

  let houseStr = hours.toString();
  let minuteStr = minutes.toString();

  if (hours < 10) {
    houseStr = '0' + hours;
  }
  if (minutes < 10) {
    minuteStr = '0' + minutes;
  }

  return (
    <div className="flex justify-between px-2 py-6">
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium flex-1 max-w-[150px]">
        -
      </p>
      <div className="flex-1 max-w-[785px]">
        {info?.action === 'APPLICATION_RECEIVED' && (
          <>
            <div className="flex mb-6">
              <p className="text-[16px] text-[#223250] font-medium mr-2">
                {capitalize(info?.action)}
              </p>
              <img src={tickBlue} alt="tick blue" />
            </div>
          </>
        )}
        {info?.action === 'APPROVED' && (
          <>
            <div className="flex mb-6">
              <p className="text-[16px] text-[#223250] font-medium mr-2">
                {capitalize(info?.action)}
              </p>
              <img src={tickBlue} alt="tick blue" />
            </div>
            <ApprovedDetail info={info} />
          </>
        )}
        {info?.action === 'REJECTED' && (
          <>
            <div className="flex mb-6">
              <p className="text-[16px] text-[#223250] font-medium mr-2">
                {capitalize(info?.action)}
              </p>
              <img src={rejected} alt="rejected" />
            </div>
            <RejectedDetail info={info} />
          </>
        )}
      </div>
      <div className="text-[#223250] text-[16px] leading-[22px] font-bold flex-1 max-w-[150px]">
        <span className="font-semibold text-[#223250]">
          {`${moment(info.createdDate).format('DD/MM/YYYY')} `}
        </span>
        |
        <span
          className={classNames(
            'text-[16px] leading-[22px] font-bold flex-1 max-w-[150px]',
            { 'text-[#1DB135]': diff / 60 < 20 },
            { 'text-[#D6950E]': 20 <= diff / 60 && diff / 60 <= 40 },
            { 'text-[#FF0000]': diff / 60 > 40 },
          )}
        >
          {` ${houseStr}:${minuteStr}`}
        </span>
      </div>
    </div>
  );
};

export default BankTaskDetail;
