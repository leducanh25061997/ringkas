import { Collapse } from '@mui/material';
import {
  DataSource,
  DataType,
} from 'app/pages/ManageUsers/CustomerAccount/ScoringReady/slice/types';
import arrowDownIcon from 'assets/icons/arrow-down-v2.svg';
import classNames from 'classnames';
import { useState } from 'react';
import { TABLE_COLUMN_WIDTHS } from '..';
import { AssessmentRowProps } from '../type';

interface Props extends AssessmentRowProps {
  children: React.ReactNode | React.ReactNode[];
}

function SpecialCollapseRow({
  children,
  parameter,
  dataSource,
  dataType,
  value,
}: Props) {
  const [openRow, setOpenRow] = useState(true);
  const handleToggleExpandRow = () => setOpenRow(prev => !prev);

  return (
    <>
      <div className="flex mt-8">
        <div style={{ width: TABLE_COLUMN_WIDTHS[0] }}>
          <div
            className="flex cursor-pointer w-fit"
            onClick={handleToggleExpandRow}
          >
            <img
              src={arrowDownIcon}
              width={20}
              height={20}
              className={classNames({ 'rotate-[-90deg]': !openRow }, 'mr-1')}
              alt=""
            />
            <p className="font-medium">{parameter}</p>
          </div>
        </div>
        <p className="font-medium" style={{ width: TABLE_COLUMN_WIDTHS[1] }}>
          {dataSource ? DataSource[dataSource] : undefined}
        </p>
        <p className="font-medium" style={{ width: TABLE_COLUMN_WIDTHS[2] }}>
          {dataType ? DataType[dataType] : undefined}
        </p>
        <p
          className="font-medium text-[#202A42]"
          style={{ width: TABLE_COLUMN_WIDTHS[3] }}
        >
          {value ?? '-'}
        </p>
      </div>
      <Collapse in={openRow}>
        <div className="w-full pl-[9px]">
          <div className="w-full border-l-2 border-l-[#D7E2EE] pt-6 pl-5">
            {children}
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default SpecialCollapseRow;
