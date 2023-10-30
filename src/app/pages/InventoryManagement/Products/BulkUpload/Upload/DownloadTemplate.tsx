import React from 'react';
import xlsDownloadIcon from 'assets/icons/xls-download.svg';
import classNames from 'classnames';

interface Props {
  active: boolean;
}

function DownloadTemplate({ active }: Props) {
  return (
    <div className="border border-[#D7E2EE] rounded-lg p-6 shrink-0">
      <p className="text-[18px] font-semibold leading-[22px] mb-[34px]">
        Download Template
      </p>
      <img
        src={xlsDownloadIcon}
        alt=""
        width={144}
        height={144}
        className={classNames('mx-auto', {
          grayscale: !active,
          'cursor-pointer': active,
        })}
      />
    </div>
  );
}

export default DownloadTemplate;
