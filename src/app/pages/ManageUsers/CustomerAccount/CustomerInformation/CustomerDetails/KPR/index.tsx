import tickBlue from 'assets/icons/tick-blue.svg';
import * as React from 'react';
import classNames from 'classnames';

interface RowProps {
  title: string;
  description: string;
  className?: string;
}

const Row = ({ title, description, className }: RowProps) => {
  return (
    <div className={classNames('flex', className)}>
      <p className="w-6/12 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
        {title}
      </p>
      <p className="w-6/12 text-[#223250] text-[16px] leading-[20px] font-medium">
        {description}
      </p>
    </div>
  );
};

const KPR = () => {
  return (
    <div className="flex flex-col bg-[#fff] rounded-2xl h-full">
      <div className="p-8">
        <div className="mb-6 flex">
          <p className="text-[#202A42] text-[20px] leading-[24px] font-bold mr-2">
            KPR
          </p>
          <img src={tickBlue} alt="tick blue" />
        </div>
        <p className="text-[#005FC5] text-[14px] leading-[20px] font-semibold mb-6">
          PERSONAL DATA
        </p>
        <Row className="mb-6" title="Full Name" description="Jack Kim" />
        <Row className="mb-6" title="Gender" description="Male" />
        <Row className="mb-6" title="Place of Birth" description="Surabaya" />
        <Row title="Date of Birth" description="12/02/1999" />
      </div>
      <p className="view-all text-center py-4 border-t border-t-[#D7E2EE]">
        View All
      </p>
    </div>
  );
};

export default KPR;
