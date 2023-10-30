import { Collapse } from '@mui/material';
import arrowDown from 'assets/icons/arrow-bottom.svg';
import classNames from 'classnames';
import React, { useState } from 'react';

interface Props {
  label: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}
function InfoItem({ label, children, className }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div
      className={classNames(
        'w-[620px] rounded-[10px] border-[1.5px] border-#C6D7E0] px-8',
        className,
      )}
    >
      <div
        className="flex items-center justify-between h-[73px] py-6 mx-[-32px] px-8 cursor-pointer select-none"
        onClick={handleExpand}
      >
        <p className="font-bold text-[18px] leading-6">{label}</p>
        <img
          src={arrowDown}
          alt=""
          width={14}
          height={14}
          className={classNames('select-none', {
            'rotate-180': expanded,
          })}
        />
      </div>
      <Collapse in={expanded}>
        <div className="w-full">{children}</div>
      </Collapse>
    </div>
  );
}

export default InfoItem;
