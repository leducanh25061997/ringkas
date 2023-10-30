import React from 'react';

interface Props {
  label: string;
  value?: string | number;
}
function DataSummarySingleColumn({ label, value }: Props) {
  return (
    <div className="leading-5">
      <p className="text-[14px] text-[#6B7A99] font-semibold">{label}</p>
      <p className="text-[#202A4] font-medium mt-2">{value ?? '-'}</p>
    </div>
  );
}

export default DataSummarySingleColumn;
