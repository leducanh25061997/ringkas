import { BankTaskItem } from '../slice/type';
import * as React from 'react';

interface Props {
  info: BankTaskItem;
}

const RejectedDetail = ({ info }: Props) => {
  return (
    <p className="w-full text-[#223250] text-[16px] leading-[20px] font-medium p-6 rounded-xl border border-[#D7E2EE]">
      {info.note}
    </p>
  );
};

export default RejectedDetail;
