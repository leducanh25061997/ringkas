import classNames from 'classnames';
import React from 'react';

interface Props {
  pageActive: 'DOWNLOAD' | 'UPLOAD';
  className?: string;
  onChange: (nextPage: 'DOWNLOAD' | 'UPLOAD') => void;
}
function Tabs({ pageActive, className, onChange }: Props) {
  return (
    <div className={classNames('leading-8 flex', className)}>
      <div
        className={classNames(
          'w-[180px] text-center font-bold border-b-[6px] cursor-pointer',
          {
            'text-[#005FC5] border-[#005FC5]': pageActive === 'DOWNLOAD',
            'text-[#6B7A99] border-[#D7E2EE]': pageActive !== 'DOWNLOAD',
          },
        )}
        onClick={() => onChange('DOWNLOAD')}
      >
        Download History
      </div>
      <div
        className={classNames(
          'w-[180px] text-center font-bold border-b-[6px] cursor-pointer',
          {
            'text-[#005FC5] border-[#005FC5]': pageActive === 'UPLOAD',
            'text-[#6B7A99] border-[#D7E2EE]': pageActive !== 'UPLOAD',
          },
        )}
        onClick={() => onChange('UPLOAD')}
      >
        Upload History
      </div>
    </div>
  );
}

export default Tabs;
