import classNames from 'classnames';
import React from 'react';

interface Props {
  pageActive: string;
  className?: string;
  onChange: (nextPage: string) => void;
  tabList: string[];
  tabWidth?: number;
}

function Tabs({
  pageActive,
  className,
  onChange,
  tabList,
  tabWidth = 180,
}: Props) {
  return (
    <div className={classNames('leading-8 flex', className)}>
      {tabList.map((item, idx) => (
        <div
          key={idx}
          style={{ width: `${tabWidth}px` }}
          className={classNames(
            'text-center font-bold border-b-[6px] cursor-pointer',
            {
              'text-[#005FC5] border-[#005FC5]': pageActive === item,
              'text-[#6B7A99] border-[#D7E2EE]': pageActive !== item,
            },
          )}
          onClick={() => onChange(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
