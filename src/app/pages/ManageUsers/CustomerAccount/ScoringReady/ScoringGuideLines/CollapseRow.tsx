import React, { useState } from 'react';
import arrowDownIcon from 'assets/icons/arrow-down-v2.svg';
import classNames from 'classnames';
import { Collapse } from '@mui/material';

interface ItemData {
  parameter: string;
  enough: string;
  good: string;
  veryGood: string;
}
interface Props {
  parameter: string;
  data: ItemData[];
  isLast?: boolean;
}
function CollapseRow(props: Props) {
  const { parameter, data } = props;
  const [open, setOpen] = useState(true);

  const handleExpandRow = () => setOpen(prev => !prev);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div
          className="flex cursor-pointer w-1/4 px-6 pt-6 text-[#6B7A99] border-r border-r-[#D7E2EE] "
          onClick={handleExpandRow}
        >
          <img
            src={arrowDownIcon}
            width={20}
            height={20}
            className={classNames({ 'rotate-[-90deg]': !open }, 'mr-[10px]')}
            alt=""
          />
          <p className="font-medium">{parameter}</p>
        </div>
        <div className="w-1/4 border-r border-r-[#D7E2EE] "></div>
        <div className="w-1/4 border-r border-r-[#D7E2EE] "></div>
        <div className="w-1/4"></div>
      </div>

      <Collapse className="flex" in={open}>
        {data.map(item => (
          <div key={item.parameter} className="flex">
            <div className="text-[#6B7A99] w-1/4 pr-6 border-r border-r-[#D7E2EE] pl-[33px]">
              <p className="font-medium border-l-2 border-l-[#D7E2EE] pl-4 pt-6 h-full">
                {item.parameter}
              </p>
            </div>
            <div className="text-[#202A42] font-medium w-1/4 px-6 border-r border-r-[#D7E2EE]">
              <p className="font-medium pt-6 h-full">{item.enough}</p>
            </div>
            <div className="text-[#202A42] font-medium w-1/4 px-6 border-r border-r-[#D7E2EE]">
              <p className="font-medium pt-6 h-full">{item.good}</p>
            </div>
            <div className="text-[#202A42] font-medium w-1/4 px-6">
              <p className="font-medium pt-6 h-full">{item.veryGood}</p>
            </div>
          </div>
        ))}
      </Collapse>
    </div>
  );
}

export default CollapseRow;
