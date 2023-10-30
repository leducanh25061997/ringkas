import { formatCurrency } from 'app/components/CustomTextField';
import classNames from 'classnames';
import { TABLE_COLUMN_WIDTHS } from '..';

interface Props {
  valueType: 'rp' | 'age' | 'year' | 'percent' | 'other';
  value?: string | number;
  className?: string;
}
function Value({ valueType, value, className }: Props) {
  switch (valueType) {
    case 'rp':
      return (
        <div
          className={classNames(
            'text-[#202A42] w-[140px] flex justify-between leading-5',
            className,
          )}
        >
          {value !== undefined && <span className="font-medium">Rp&nbsp;</span>}
          <p className="font-medium">
            {value !== undefined ? formatCurrency(value) : '-'}
          </p>
        </div>
      );

    case 'age':
      return (
        <p
          className={classNames(
            'font-medium text-[#202A42] leading-5',
            className,
          )}
          style={{ width: TABLE_COLUMN_WIDTHS[3] }}
        >
          {value !== undefined ? `${value} years old` : '-'}
        </p>
      );

    case 'percent':
      return (
        <p
          className={classNames(
            'font-medium text-[#202A42] leading-5',
            className,
          )}
          style={{ width: TABLE_COLUMN_WIDTHS[3] }}
        >
          {value !== undefined ? `${value}%` : '-'}
        </p>
      );
    case 'year':
      return (
        <p
          className={classNames(
            'font-medium text-[#202A42] leading-5',
            className,
          )}
          style={{ width: TABLE_COLUMN_WIDTHS[3] }}
        >
          {value !== undefined ? `${value} years` : '-'}
        </p>
      );
    default:
      return (
        <p
          className={classNames(
            'font-medium text-[#202A42] leading-5',
            className,
          )}
          style={{ width: TABLE_COLUMN_WIDTHS[3] }}
        >
          {value ?? '-'}
        </p>
      );
  }
}

export default Value;
