import classNames from 'classnames';
import React, { ForwardedRef } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import {
  FLOAT_NUMBER,
  INT_NUMBER,
  NUMBER_REGEX,
  PHONE_REGEX,
} from 'utils/helpers/regex';
import { formatCurrency } from '../CustomTextField';

interface Props
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    'type' | 'onChange' | 'value' | 'ref'
  > {
  error?: boolean;
  errorText?: string;
  type?:
    | 'text'
    | 'int'
    | 'float'
    | 'tel'
    | 'currency'
    | 'password'
    | 'id'
    | 'number';
  value?: string | number;
  onChange?: (newValue: string | number) => void;
}
const Input = React.forwardRef(
  (
    { value, onChange, type, className, disabled, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!onChange) return;
      const newValue = e.target.value;
      switch (type) {
        case 'int':
          if (INT_NUMBER.test(newValue)) onChange(newValue);
          break;
        case 'id':
          if (INT_NUMBER.test(newValue)) onChange(newValue);
          break;
        case 'number':
          if (NUMBER_REGEX.test(newValue) || newValue === '')
            onChange(newValue);
          break;
        case 'currency':
          const _newValue = newValue.split('.').join('');
          if (INT_NUMBER.test(_newValue)) onChange(formatCurrency(_newValue));
          break;
        case 'float':
          if (FLOAT_NUMBER.test(newValue)) onChange(newValue);
          break;
        case 'tel':
          if (PHONE_REGEX.test(newValue)) onChange(newValue);
          break;
        default:
          onChange(newValue);
          break;
      }
    };

    return (
      <input
        {...rest}
        value={value ?? ''}
        onChange={handleChange}
        ref={ref}
        disabled={disabled}
        className={classNames(
          className,
          'h-[40px] border border-[D7E2EE] rounded-lg text-[#202A42] font-medium px-3 focus:border-[#005FC5] transition-all',
          {
            'bg-[#DFE3E8]': disabled,
          },
        )}
      />
    );
  },
);

export default Input;

type FormValues = Record<string, string>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: keyof FormValues;
  rules?: RegisterOptions;
  // autoFormatOnblur?: boolean;
}
export const ControlledInput = (props: FieldProps) => {
  const {
    control,
    name,
    // autoFormatOnblur = true,
    rules,
    value,
    type,
    onChange,
    errorText,
    error,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field }) => {
        return <Input {...field} {...rest} />;
      }}
    />
  );
};
