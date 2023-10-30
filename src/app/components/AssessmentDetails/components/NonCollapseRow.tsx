import {
  DataSource,
  DataType,
} from 'app/pages/ManageUsers/CustomerAccount/ScoringReady/slice/types';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { getAssessmentValueType } from 'utils/commonFunction';
import { TABLE_COLUMN_WIDTHS } from '..';
import { AssessmentRowProps } from '../type';
import EditableValue from './EditableValue';
import Value from './Value';

function NonCollapseRow({
  parameter,
  dataSource,
  dataType,
  value,
  className,
  isChild = false,
  editable = false,
}: AssessmentRowProps & {
  className?: string;
  isChild?: boolean;
}) {
  const methods = useFormContext();

  useEffect(() => {
    if (!editable) return;
    if (!parameter) return;
    methods.setValue(parameter, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameter, value]);

  const renderValueField = () => {
    if (!editable)
      return (
        <Value value={value} valueType={getAssessmentValueType(parameter)} />
      );
    return (
      <div style={{ width: TABLE_COLUMN_WIDTHS[3] }} className="flex">
        <EditableValue parameter={parameter} value={value} />
      </div>
    );
  };
  return (
    <div
      className={classNames('flex mt-6', className, { 'ml-[-31px]': isChild })}
    >
      <p
        className={classNames('font-medium', { 'pl-[31px]': isChild })}
        style={{ width: TABLE_COLUMN_WIDTHS[0] }}
      >
        {parameter ?? '-'}
      </p>
      <p className="font-medium" style={{ width: TABLE_COLUMN_WIDTHS[1] }}>
        {dataSource ? DataSource[dataSource] : '-'}
      </p>
      <p className="font-medium" style={{ width: TABLE_COLUMN_WIDTHS[2] }}>
        {dataType ? DataType[dataType] : '-'}
      </p>
      {renderValueField()}
    </div>
  );
}

export default NonCollapseRow;
