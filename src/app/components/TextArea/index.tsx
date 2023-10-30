/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { RegisterOptions, Controller, Control } from 'react-hook-form';
import classNames from 'classnames';
import useOnClickOutside from 'app/hooks/useOnClickOutside';

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  value?: string;
  onChange?: (value?: string) => void;
  label: string;
  onBlur?: (value?: string) => void;
  required?: boolean;
  isBg?: boolean;
  disabled?: boolean;
}

export default function TextArea(props: Props) {
  const {
    className,
    error,
    label,
    name,
    errorText,
    value,
    onBlur,
    onChange,
    required,
    isBg,
    disabled,
  } = props;
  const [activeInput, setActiveInput] = useState(false);

  const [status, setStatus] = useState<'NORMAL' | 'FOCUS'>('NORMAL');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const rootContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(rootContainerRef, handleDeActiveInput);

  const handleActiveInput = () => {
    setActiveInput(true);
  };

  function handleDeActiveInput() {
    if (!inputRef.current?.value) setActiveInput(false);
  }

  const handleFocusInput = () => {
    setActiveInput(true);
    setStatus('FOCUS');
  };

  const handleBlurInput = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onBlur && onBlur(e.target.value);
    setStatus('NORMAL');
  };

  const getTextColor = () => {
    if (error) return '#FF0000';
    if (status === 'FOCUS') return '#005FC5';
  };

  const getBorderColor = () => {
    if (error) return '#FF0000';
    if (status === 'FOCUS') return '#005FC5';
    return '#C6D7E0';
  };

  useEffect(() => {
    if (value) {
      setActiveInput(true);
    }
  }, [value]);

  return (
    <div className={classNames(className)}>
      <div
        className={classNames(
          'h-[130px] border w-full relative flex items-end leading-6 rounded-lg overflow-hidden bg-white',
          { 'pt-[30px]': activeInput, ' !bg-white': isBg },
          { 'bg-[#DFE3E8]': disabled },
        )}
        onClick={handleActiveInput}
        style={{ borderColor: getBorderColor() }}
        ref={rootContainerRef}
      >
        <span
          className={classNames('absolute transition-all ml-[20px]', {
            'text-black text-[12px] leading-[18px] top-[8px]': activeInput,
            'text-[#9098a7] top-[14px]': !activeInput,
            'text-[#005FC5]': disabled,
          })}
          style={{ color: getTextColor() }}
        >
          {label}
        </span>
        <textarea
          ref={inputRef}
          value={value}
          name={name}
          className={classNames(
            'outline-none w-full text-black resize-none h-full overflow-y-auto bg-white text-[16px]',
            {
              'opacity-0': !activeInput,
              'p-[0px_20px_8px_20px]': activeInput,
              '!bg-white': isBg,
              'bg-[#DFE3E8]': disabled,
            },
          )}
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
          placeholder={label}
          onChange={e => {
            onChange && onChange(e.target.value);
          }}
          disabled={disabled}
        />
      </div>
      {error && (
        <div className="text-[14px] leading-[18px] mt-2 text-[#FF0000]">
          {errorText}
        </div>
      )}
    </div>
  );
}

type FormValues = Record<string, string>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: keyof FormValues;
  rules?: RegisterOptions;
}

export const ControlledTextarea = (props: FieldProps) => {
  const {
    control,
    name,
    rules,
    value,
    onChange,
    onBlur,
    errorText,
    error,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => (
        <TextArea
          {...rest}
          error={!!fieldState.error}
          errorText={fieldState.error?.message}
          value={value || field.value || ''}
          onBlur={(currentValue?: string) => {
            if (!currentValue) return;
            field.onChange(currentValue?.trim());
          }}
          onChange={(newValue?: string) => {
            field.onChange(newValue);
            onChange && onChange(newValue);
          }}
        />
      )}
    />
  );
};
