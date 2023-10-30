import classNames from 'classnames';
import React from 'react';

interface Props {
  pageActive: 'UPDATE' | 'CREATE';
  className?: string;
  // onChange: (nextPage: 'UPDATE' | 'CREATE') => void;
}
function Tabs({ pageActive, className }: Props) {
  return (
    <div className={classNames('leading-8 flex', className)}>
      <div
        className={classNames(
          'w-[180px] text-center font-bold border-b-[6px]',
          {
            'text-[#005FC5] border-[#005FC5]': pageActive === 'CREATE',
            'text-[#6B7A99] border-[#D7E2EE]': pageActive !== 'CREATE',
          },
        )}
        // onClick={() => onChange('CREATE')}
      >
        Create
      </div>
      <div
        className={classNames(
          'w-[180px] text-center font-bold border-b-[6px]',
          {
            'text-[#005FC5] border-[#005FC5]': pageActive === 'UPDATE',
            'text-[#6B7A99] border-[#D7E2EE]': pageActive !== 'UPDATE',
          },
        )}
        // onClick={() => onChange('UPDATE')}
      >
        Update
      </div>
    </div>
  );
}

export default Tabs;
