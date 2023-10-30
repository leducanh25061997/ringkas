import { Collapse } from '@mui/material';
import {
  DataSource,
  DataType,
} from 'app/pages/ManageUsers/CustomerAccount/ScoringReady/slice/types';
import arrowDownIcon from 'assets/icons/arrow-down-v2.svg';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { getAssessmentValueType } from 'utils/commonFunction';
import { TABLE_COLUMN_WIDTHS } from '..';
import { AssessmentRowProps } from '../type';
import Value from './Value';

interface Props extends AssessmentRowProps {
  child: AssessmentRowProps[];
}
function AssessmentCollapseRow(props: Props) {
  const { parameter, dataSource, dataType, value, child } = props;
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
            <p className="font-medium">{parameter ?? undefined}</p>
          </div>
        </div>
        <p className="font-medium" style={{ width: TABLE_COLUMN_WIDTHS[1] }}>
          {dataSource ? DataSource[dataSource] : undefined}
        </p>
        <p className="font-medium" style={{ width: TABLE_COLUMN_WIDTHS[2] }}>
          {dataType ? DataType[dataType] : undefined}
        </p>
        <Value value={value} valueType={getAssessmentValueType(parameter)} />
      </div>
      <Collapse in={openRow}>
        <div className="w-full">
          {child.map(item => (
            <div className="flex" key={item.parameter}>
              <div
                style={{ width: TABLE_COLUMN_WIDTHS[0] }}
                className="pl-[9px]"
              >
                <p className="font-medium border-l-2 border-l-[#D7E2EE] pt-6 pl-5 h-full">
                  {item.parameter ?? '-'}
                </p>
              </div>

              <p
                className="font-medium pt-6"
                style={{ width: TABLE_COLUMN_WIDTHS[1] }}
              >
                {item.dataSource ? DataSource[item.dataSource] : '-'}
              </p>
              <p
                className="font-medium pt-6"
                style={{ width: TABLE_COLUMN_WIDTHS[2] }}
              >
                {item.dataType ? DataType[item.dataType] : '-'}
              </p>
              <ValueField {...item} />
            </div>
          ))}
        </div>
      </Collapse>
    </>
  );
}

const ValueField = (props: AssessmentRowProps) => {
  const methods = useFormContext();

  useEffect(() => {
    if (!methods) return;
    if (!props.editable) return;
    if (!props.parameter) return;
    methods.setValue(props.parameter, props.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, props.value]);

  if (!props.editable)
    return (
      <Value
        className="pt-6"
        value={props.value}
        valueType={getAssessmentValueType(props.parameter)}
      />
    );
  return (
    <div className="pt-6" style={{ width: TABLE_COLUMN_WIDTHS[3] }}>
      <textarea
        className="p-3 text-[#223250] font-medium leading-5 resize-none border border-[#D7E2EE] rounded-lg focus:border-[#005FC5] h-[112px] w-full"
        placeholder="Input Text Here"
        {...methods.register(props.parameter || '')}
      />
    </div>
  );
};

export default AssessmentCollapseRow;
